/**
 * 為什麼這個檔案要獨立存在？
 *
 * AtomAccordion（父）需要 provide context，
 * AtomAccordionItem（子）需要 inject 同一個 context。
 * 兩者都需要用到同一個「injection key」跟「型別定義」。
 *
 * 理想上應該寫在 AtomAccordion.vue 裡再 export 出去，
 * 但 Vue SFC 有兩個限制互相衝突：
 *
 *   1. <script setup> 不允許 export（ESLint: vue/no-export-in-script-setup）
 *   2. 用雙 block（<script> + <script setup>）時，
 *      第二個 block 的 import 會被 ESLint 視為「在函式體中間才 import」而報錯
 *      （ESLint: import/first）
 *
 * 所以唯一乾淨的解法：把「要共享的型別 + key」抽成獨立 .ts 檔，
 * 讓 AtomAccordion 和 AtomAccordionItem 都來這裡 import。
 */

import type { InjectionKey, Ref } from 'vue'

/**
 * provide / inject 傳遞的資料結構。
 *
 * - active：目前展開中的 value 清單（陣列統一存，單選/多選都用這個）
 * - toggle：子元件點擊時呼叫，傳入自己的 value，由父層決定要加入還是移除
 */
export interface AccordionContext {
    active: Ref<(string | number)[]>
    toggle: (value: string | number) => void
}

/**
 * InjectionKey 是 Vue 提供的泛型型別，用來讓 provide 跟 inject 的型別對得上。
 *
 * 如果只用字串當 key（例如 inject('accordion')），TypeScript 無法知道拿到的值長什麼樣，
 * 用 Symbol + InjectionKey<T> 的話，inject 的回傳值會自動被推斷成 AccordionContext。
 *
 * Symbol() 確保這個 key 全域唯一，不會跟其他元件的 inject key 撞名。
 */
export const AccordionKey: InjectionKey<AccordionContext> = Symbol('accordion')
