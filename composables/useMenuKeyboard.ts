/**
 * Layer 3 - useMenuKeyboard
 *
 * 職責：把 Layer 1 + Layer 2 組合起來，再補上 menu 專屬的按鍵行為。
 * 這層不寫任何新的邏輯，只做「組合」和「補充」。
 *
 * 負責的完整行為：
 *   ArrowDown        → 焦點往下（來自 Layer 1）
 *   ArrowUp          → 焦點往上（來自 Layer 1）
 *   Home             → 焦點到第一個（來自 Layer 1）
 *   End              → 焦點到最後一個（來自 Layer 1）
 *   Escape / Tab     → 關閉 menu（這層補充）
 *   Enter / Space    → 觸發目前 focus 項目的點擊（這層補充）
 *   開啟時 auto-focus → 自動聚焦第一個 item（來自 Layer 2）
 *   關閉時還焦點      → 焦點回到 trigger 元素（來自 Layer 2）
 *
 * 使用情境：Dropdown、Select、ContextMenu
 */

import { useRovingFocus } from './useRovingFocus'
import { useFocusReturn } from './useFocusReturn'
import type { Ref, ComponentPublicInstance } from 'vue'

interface UseMenuKeyboardOptions {
    /** 每個 menu item 的 DOM ref 陣列 */
    itemRefs: Ref<HTMLElement[]>

    /** 傳入索引，回傳該項目是否 disabled */
    isDisabled?: (index: number) => boolean

    /** 控制 menu 開關的 ref（來自元件的 active / isOpen） */
    isOpen: Ref<boolean>

    /** 關閉 menu 的方法（來自元件的 close function） */
    onClose: () => void
}

export function useMenuKeyboard({
    itemRefs,
    isDisabled,
    isOpen,
    onClose,
}: UseMenuKeyboardOptions) {

    // ── 引入 Layer 1：焦點移動 ──
    const { onKeydown, setItemRef } = useRovingFocus({
        itemRefs,
        isDisabled,
        orientation: 'vertical', // menu 只用上下鍵
    })

    // ── 引入 Layer 2：開關時的焦點管理 ──
    useFocusReturn({
        isOpen,
        itemRefs,
        isDisabled,
    })

    /**
     * 給 template 的 @keydown 使用
     * 在 Layer 1 的預設行為上，補上 menu 專屬按鍵
     */
    function onMenuKeydown(e: KeyboardEvent) {
        onKeydown(e, {
            // 關閉 menu
            Escape: (e) => { e.preventDefault(); onClose() },
            Tab:    (e) => { e.preventDefault(); onClose() },

            // 觸發目前 focus 項目的點擊事件
            // document.activeElement 就是目前 focus 的 <li>
            Enter: (e) => { e.preventDefault(); (document.activeElement as HTMLElement)?.click() },
            ' ':   (e) => { e.preventDefault(); (document.activeElement as HTMLElement)?.click() },
        })
    }

    return {
        /** 給 <ul> 的 @keydown */
        onMenuKeydown,
        /** 給每個 <li> 的 :ref，用來收集 DOM refs */
        setItemRef,
    }
}
