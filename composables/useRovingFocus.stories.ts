import type { Meta, StoryObj } from '@nuxtjs/storybook'
import { ref, defineComponent, h } from 'vue'
import { useRovingFocus } from './useRovingFocus'

// Storybook 需要一個元件作為 meta 的 component
// 這裡用一個空的 placeholder，實際展示在各 story 的 render 裡
const Placeholder = defineComponent({ render: () => h('div') })

const meta = {
    title: 'Composables/useRovingFocus',
    component: Placeholder,
    parameters: {
        controls: { disable: true },
    },
} satisfies Meta<typeof Placeholder>

export default meta
type Story = StoryObj<typeof meta>

// ── Demo 1：垂直導航（↑ ↓） ──
export const Vertical: Story = {
    name: '垂直導航（↑ ↓）',
    render: () => ({
        setup() {
            const items = ['選項 A', '選項 B（停用）', '選項 C', '選項 D']
            const itemRefs = ref<HTMLElement[]>([])
            const focused = ref('')

            const { onKeydown, setItemRef } = useRovingFocus({
                itemRefs,
                isDisabled: (i) => i === 1,
                orientation: 'vertical',
            })

            return { items, itemRefs, focused, onKeydown, setItemRef }
        },
        template: `
            <div class="p-8 max-w-xs">
                <p class="mb-3 text-sm text-gray-500">
                    Tab 鍵 focus 到第一個選項，再用 ↑ ↓ Home End 移動。<br>
                    「選項 B」是 disabled，方向鍵會跳過它。
                </p>
                <ul
                    class="border border-gray-200 rounded-lg overflow-hidden"
                    role="listbox"
                    @keydown="onKeydown"
                >
                    <li
                        v-for="(item, i) in items"
                        :key="item"
                        :ref="(el) => setItemRef(el, i)"
                        class="px-4 py-2 text-sm outline-none transition-colors"
                        :class="[
                            i === 1
                                ? 'text-gray-300 cursor-not-allowed bg-gray-50'
                                : 'cursor-pointer hover:bg-blue-50 focus:bg-blue-100 focus:text-blue-700'
                        ]"
                        :tabindex="i === 0 ? 0 : -1"
                        :aria-disabled="i === 1"
                        @focus="focused = item"
                    >
                        {{ item }}
                    </li>
                </ul>
                <p class="mt-3 text-sm text-gray-400">
                    目前 focus：{{ focused || '無' }}
                </p>
            </div>
        `,
    }),
}

// ── Demo 2：水平導航（← →） ──
export const Horizontal: Story = {
    name: '水平導航（← →）',
    render: () => ({
        setup() {
            const items = ['首頁', '關於', '停用頁', '聯絡']
            const itemRefs = ref<HTMLElement[]>([])
            const focused = ref('')

            const { onKeydown, setItemRef } = useRovingFocus({
                itemRefs,
                isDisabled: (i) => i === 2,
                orientation: 'horizontal',
            })

            return { items, itemRefs, focused, onKeydown, setItemRef }
        },
        template: `
            <div class="p-8">
                <p class="mb-3 text-sm text-gray-500">
                    Tab 進入後，用 ← → Home End 在按鈕間移動。
                </p>
                <div
                    class="flex gap-1 border-b border-gray-200 pb-0"
                    role="tablist"
                    @keydown="onKeydown"
                >
                    <button
                        v-for="(item, i) in items"
                        :key="item"
                        :ref="(el) => setItemRef(el, i)"
                        class="px-4 py-2 text-sm rounded-t outline-none transition-colors"
                        :class="[
                            i === 2
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'cursor-pointer hover:bg-gray-100 focus:bg-blue-100 focus:text-blue-700'
                        ]"
                        :tabindex="i === 0 ? 0 : -1"
                        :disabled="i === 2"
                        @focus="focused = item"
                    >
                        {{ item }}
                    </button>
                </div>
                <p class="mt-3 text-sm text-gray-400">
                    目前 focus：{{ focused || '無' }}
                </p>
            </div>
        `,
    }),
}

// ── Demo 3：不環繞（wrap: false） ──
export const NoWrap: Story = {
    name: '不環繞（wrap: false）',
    render: () => ({
        setup() {
            const items = ['第一項', '第二項', '第三項']
            const itemRefs = ref<HTMLElement[]>([])
            const log = ref<string[]>([])

            const { onKeydown, setItemRef } = useRovingFocus({
                itemRefs,
                orientation: 'vertical',
                wrap: false,
            })

            return { items, itemRefs, log, onKeydown, setItemRef }
        },
        template: `
            <div class="p-8 max-w-xs">
                <p class="mb-3 text-sm text-gray-500">
                    wrap: false 時，到達邊界後不會跳回對面。<br>
                    在第一項按 ↑ 或在最後一項按 ↓，焦點不移動。
                </p>
                <ul
                    class="border border-gray-200 rounded-lg overflow-hidden"
                    @keydown="onKeydown"
                >
                    <li
                        v-for="(item, i) in items"
                        :key="item"
                        :ref="(el) => setItemRef(el, i)"
                        class="px-4 py-2 text-sm cursor-pointer outline-none
                               hover:bg-gray-50 focus:bg-blue-100 focus:text-blue-700
                               transition-colors"
                        :tabindex="i === 0 ? 0 : -1"
                    >
                        {{ item }}
                    </li>
                </ul>
            </div>
        `,
    }),
}
