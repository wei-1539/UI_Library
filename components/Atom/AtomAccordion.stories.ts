import type { Meta, StoryObj } from '@nuxtjs/storybook'
import { ref } from 'vue'
import AtomAccordion from './AtomAccordion.vue'
import AtomAccordionItem from './AtomAccordionItem.vue'

const meta = {
    title: 'Atom/Accordion',
    component: AtomAccordion,
    argTypes: {
        modelValue: {
            control: 'text',
            description: '目前展開的 item value。單選傳 `string | number`，多選傳陣列。不傳則為非受控模式。',
        },
        multiple: {
            control: 'boolean',
            description: '是否允許同時展開多個 item，預設 `false`（單選）',
        },
    },
} satisfies Meta<typeof AtomAccordion>

export default meta
type Story = StoryObj<typeof meta>

// ── Base（可操作 controls） ──
export const Base: Story = {
    name: 'Base',
    args: {
        multiple: false,
    },
    render: (args) => ({
        components: { AtomAccordion, AtomAccordionItem },
        setup() {
            const open = ref<string | string[]>(args.multiple ? [] : '')
            // multiple 切換時重置 open 型別
            const syncOpen = (val: string | string[]) => { open.value = val }
            return { args, open, syncOpen }
        },
        template: `
            <div class="p-10 max-w-xl">
                <p class="mb-3 text-sm text-gray-500">
                    目前開啟：<strong>{{ Array.isArray(open) ? (open.length ? open.join('、') : '（無）') : (open || '（無）') }}</strong>
                </p>
                <AtomAccordion v-bind="args" v-model="open">
                    <AtomAccordionItem value="item-1" title="項目一：基本說明">
                        這是第一個 accordion item 的內容。切換右側 Controls 的 multiple 可以改變單選 / 多選模式。
                    </AtomAccordionItem>
                    <AtomAccordionItem value="item-2" title="項目二：更多細節">
                        這是第二個 accordion item 的內容。
                    </AtomAccordionItem>
                    <AtomAccordionItem value="item-3" title="項目三：補充資訊">
                        這是第三個 accordion item 的內容。
                    </AtomAccordionItem>
                </AtomAccordion>
            </div>
        `,
    }),
}

// ── 單一收合（預設） ──
export const SingleSelect: Story = {
    name: '單一收合（預設）',
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { AtomAccordion, AtomAccordionItem },
        setup() {
            const open = ref('')
            return { open }
        },
        template: `
            <div class="p-10 max-w-xl">
                <p class="mb-3 text-sm text-gray-500">點開一個，上一個自動收起。目前開啟：<strong>{{ open || '（無）' }}</strong></p>
                <AtomAccordion v-model="open">
                    <AtomAccordionItem value="item-1" title="什麼是 Vue 3？">
                        Vue 3 是一個漸進式 JavaScript 框架，核心設計圍繞著 Composition API 與更好的 TypeScript 整合。
                    </AtomAccordionItem>
                    <AtomAccordionItem value="item-2" title="Composition API 跟 Options API 差在哪？">
                        Composition API 讓你用函式組織邏輯，更容易抽取與重用；Options API 則用物件分類（data、methods 等）。
                    </AtomAccordionItem>
                    <AtomAccordionItem value="item-3" title="什麼是 provide / inject？">
                        provide / inject 是 Vue 的跨層級資料傳遞機制，不需要一層層 props 傳遞。
                    </AtomAccordionItem>
                </AtomAccordion>
            </div>
        `,
    }),
}

// ── 複數收合 ──
export const MultipleSelect: Story = {
    name: '複數收合（multiple）',
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { AtomAccordion, AtomAccordionItem },
        setup() {
            const open = ref<string[]>([])
            return { open }
        },
        template: `
            <div class="p-10 max-w-xl">
                <p class="mb-3 text-sm text-gray-500">可同時展開多個。目前開啟：<strong>{{ open.length ? open.join('、') : '（無）' }}</strong></p>
                <AtomAccordion v-model="open" multiple>
                    <AtomAccordionItem value="ship" title="送貨資訊">
                        全台超商取貨，3–5 個工作天送達。
                    </AtomAccordionItem>
                    <AtomAccordionItem value="return" title="退換貨政策">
                        購買後 7 天內可無條件退換，商品需保持原狀。
                    </AtomAccordionItem>
                    <AtomAccordionItem value="pay" title="付款方式">
                        支援信用卡、ATM 轉帳、超商代碼付款。
                    </AtomAccordionItem>
                </AtomAccordion>
            </div>
        `,
    }),
}

// ── 受控 ──
export const Controlled: Story = {
    name: '受控（Controlled）',
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { AtomAccordion, AtomAccordionItem },
        setup() {
            const open = ref<string>('')
            const forceOpen = (val: string) => { open.value = val }
            const forceClose = () => { open.value = '' }
            return { open, forceOpen, forceClose }
        },
        template: `
            <div class="p-10 max-w-xl">
                <p class="mb-3 text-sm text-gray-500">
                    狀態由外部 v-model 完全控制。目前開啟：<strong>{{ open || '（無）' }}</strong>
                </p>
                <div class="mb-4 flex gap-2">
                    <button
                        class="rounded border border-gray-300 bg-white px-3 py-1 text-sm cursor-pointer"
                        @click="forceOpen('faq-1')"
                    >強制開啟 FAQ 1</button>
                    <button
                        class="rounded border border-gray-300 bg-white px-3 py-1 text-sm cursor-pointer"
                        @click="forceOpen('faq-2')"
                    >強制開啟 FAQ 2</button>
                    <button
                        class="rounded border border-gray-300 bg-white px-3 py-1 text-sm cursor-pointer"
                        @click="forceClose"
                    >全部收起</button>
                </div>
                <AtomAccordion v-model="open">
                    <AtomAccordionItem value="faq-1" title="FAQ 1：受控模式是什麼？">
                        元件本身不管理開關狀態，由外部的 v-model 變數決定誰展開。
                    </AtomAccordionItem>
                    <AtomAccordionItem value="faq-2" title="FAQ 2：何時用受控？">
                        需要從外部程式控制開關時，例如「點擊其他按鈕自動展開特定區塊」。
                    </AtomAccordionItem>
                </AtomAccordion>
            </div>
        `,
    }),
}

// ── 非受控 ──
export const Uncontrolled: Story = {
    name: '非受控（Uncontrolled）',
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { AtomAccordionItem },
        template: `
            <div class="p-10 max-w-xl">
                <p class="mb-3 text-sm text-gray-500">
                    單獨使用，不需要 v-model，開關狀態由元件自己管理。
                </p>
                <AtomAccordionItem title="非受控：點我展開">
                    父層完全不知道我現在是開還是關，狀態存在元件內部的 ref。
                </AtomAccordionItem>
                <AtomAccordionItem title="非受控：另一個獨立項目">
                    這兩個 item 互不影響，因為沒有 AtomAccordion 統一管理。
                </AtomAccordionItem>
            </div>
        `,
    }),
}

// ── 停用狀態 ──
export const Disabled: Story = {
    name: '停用狀態（disabled）',
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { AtomAccordion, AtomAccordionItem },
        template: `
            <div class="p-10 max-w-xl">
                <p class="mb-3 text-sm text-gray-500">disabled 的 item 點擊無效，樣式會半透明。</p>
                <AtomAccordion>
                    <AtomAccordionItem value="a" title="正常項目 A">
                        這個可以正常開關。
                    </AtomAccordionItem>
                    <AtomAccordionItem value="b" title="停用項目 B（disabled）" disabled>
                        你看不到這段內容。
                    </AtomAccordionItem>
                    <AtomAccordionItem value="c" title="正常項目 C">
                        這個也可以正常開關。
                    </AtomAccordionItem>
                </AtomAccordion>
            </div>
        `,
    }),
}
