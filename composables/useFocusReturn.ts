/**
 * Layer 2 - useFocusReturn
 *
 * 職責：管理「開啟 / 關閉」時的焦點行為。
 *   1. 開啟時 → 記住目前是哪個元素觸發的（trigger），並 auto-focus 第一個 item
 *   2. 關閉時 → 焦點還回 trigger 元素
 *
 * 為什麼要還焦點？
 *   假設用鍵盤 Tab 到「開啟選單」按鈕 → 按 Enter 開啟 → 選完關閉
 *   如果焦點沒有還回去，使用者的鍵盤位置就「消失」了，很不友善。
 *
 * 使用情境：Dropdown、Select、Dialog、ContextMenu
 */

import type { Ref } from 'vue'

interface UseFocusReturnOptions {
    /** 控制開關的 ref，watch 它的變化來決定要 focus 還是還焦點 */
    isOpen: Ref<boolean>

    /** 開啟後要 auto-focus 的元素陣列，會聚焦第一個 enabled 的 */
    itemRefs: Ref<HTMLElement[]>

    /** 哪些索引是 disabled（對應 itemRefs 的索引），用來跳過 disabled 項目 */
    isDisabled?: (index: number) => boolean
}

export function useFocusReturn({
    isOpen,
    itemRefs,
    isDisabled,
}: UseFocusReturnOptions) {

    // 記住「是誰觸發開啟的」，關閉時還焦點用
    // 例如：使用者 focus 在按鈕上按 Enter 開啟 → triggerEl = 那個按鈕
    const triggerEl = ref<HTMLElement | null>(null)

    watch(isOpen, (opened) => {
        if (opened) {
            // ── 開啟 ──
            // 先記住目前 focus 的元素（就是 trigger）
            triggerEl.value = document.activeElement as HTMLElement

            // 等 DOM 更新完（nextTick）才能 focus，
            // 因為 menu 的 li 元素可能還沒渲染出來
            nextTick(() => {
                const firstEnabled = itemRefs.value.findIndex((_, i) => !isDisabled?.(i))
                if (firstEnabled !== -1) {
                    itemRefs.value[firstEnabled]?.focus()
                }
            })
        } else {
            // ── 關閉 ──
            // 把焦點還回當初觸發的元素
            triggerEl.value?.focus()
            triggerEl.value = null
        }
    })

    return { triggerEl }
}
