/**
 * Layer 1 - useRovingFocus
 *
 * 職責：在一組可 focus 的元素之間，透過鍵盤移動焦點。
 * 只負責「焦點移到哪裡」，不管元件要不要關閉、要不要選取。
 *
 * 使用情境：Tab、Dropdown、RadioGroup、Checkbox Group…
 * 任何需要用方向鍵在元素間移動的元件都可以用這層。
 */

import type { Ref, ComponentPublicInstance } from 'vue'

type Orientation = 'horizontal' | 'vertical' | 'both'

interface UseRovingFocusOptions {
    /** 每個可 focus 項目的 DOM ref 陣列 */
    itemRefs: Ref<HTMLElement[]>

    /** 傳入索引，回傳該項目是否 disabled */
    isDisabled?: (index: number) => boolean

    /**
     * 方向鍵模式
     * - horizontal：只有 ArrowLeft / ArrowRight 有作用
     * - vertical  ：只有 ArrowUp / ArrowDown 有作用
     * - both      ：四個方向鍵都有作用（預設）
     */
    orientation?: Orientation

    /** 是否環繞（最後一個再往下 → 跳回第一個），預設 true */
    wrap?: boolean
}

export function useRovingFocus({
    itemRefs,
    isDisabled,
    orientation = 'both',
    wrap = true,
}: UseRovingFocusOptions) {

    // 過濾出所有「沒有 disabled」的項目索引
    // 例如 items = [正常, disabled, 正常, 正常] → enabledIndices = [0, 2, 3]
    const enabledIndices = computed(() =>
        itemRefs.value.map((_, i) => i).filter((i) => !isDisabled?.(i)),
    )

    /**
     * 移動焦點
     * @param delta  1 = 往下/右，-1 = 往上/左，'first' = 第一個，'last' = 最後一個
     */
    function moveFocus(delta: 1 | -1 | 'first' | 'last') {
        const indices = enabledIndices.value
        if (!indices.length) return

        // 找出目前 focus 在 enabled 陣列的位置
        const currentIndex = itemRefs.value.findIndex((el) => el === document.activeElement)
        const pos = indices.indexOf(currentIndex)

        let next: number

        if (delta === 'first') {
            next = indices[0]
        } else if (delta === 'last') {
            next = indices[indices.length - 1]
        } else if (wrap) {
            // % 環繞：pos = -1（找不到）時，往下會從 0 開始，往上會從最後一個開始
            next = indices[(pos + delta + indices.length) % indices.length]
        } else {
            // 不環繞：碰到邊界就停住
            next = indices[Math.max(0, Math.min(pos + delta, indices.length - 1))]
        }

        itemRefs.value[next]?.focus()
    }

    /**
     * 鍵盤事件處理器
     *
     * 預設按鍵行為：
     *   ArrowDown / ArrowRight → 往下移動
     *   ArrowUp   / ArrowLeft  → 往上移動
     *   Home                   → 跳到第一個
     *   End                    → 跳到最後一個
     *
     * @param keyMap 可傳入額外按鍵處理，或覆蓋預設行為
     *   例如 Dropdown 需要 Escape 關閉：{ Escape: (e) => close() }
     */
    function onKeydown(e: KeyboardEvent, keyMap?: Partial<Record<string, (e: KeyboardEvent) => void>>) {

        // 根據 orientation 決定哪些方向鍵有效
        const canVertical   = orientation !== 'horizontal'
        const canHorizontal = orientation !== 'vertical'

        const defaultMap: Record<string, (e: KeyboardEvent) => void> = {
            ArrowDown:  (e) => { if (canVertical)   { e.preventDefault(); moveFocus(1) } },
            ArrowUp:    (e) => { if (canVertical)   { e.preventDefault(); moveFocus(-1) } },
            ArrowRight: (e) => { if (canHorizontal) { e.preventDefault(); moveFocus(1) } },
            ArrowLeft:  (e) => { if (canHorizontal) { e.preventDefault(); moveFocus(-1) } },
            Home:       (e) => { e.preventDefault(); moveFocus('first') },
            End:        (e) => { e.preventDefault(); moveFocus('last') },
            // 外部傳入的 keyMap 會覆蓋上面的預設
            ...keyMap,
        }

        defaultMap[e.key]?.(e)
    }

    /**
     * 綁定在 template :ref 上，用來收集每個項目的 DOM element
     *
     * 用法：
     *   <li v-for="(item, i) in items" :ref="(el) => setItemRef(el, i)">
     */
    function setItemRef(el: ComponentPublicInstance | Element | null, index: number) {
        if (!el) return
        // 如果是 Vue 元件實例，取 $el（真實 DOM）；如果已經是 DOM element 就直接用
        itemRefs.value[index] = ((el as ComponentPublicInstance)?.$el ?? el) as HTMLElement
    }

    return { moveFocus, onKeydown, setItemRef, enabledIndices }
}
