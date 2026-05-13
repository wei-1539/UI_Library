import type { Meta, StoryObj } from '@nuxtjs/storybook'
import { ref, defineComponent, h } from 'vue'
import { useMenuKeyboard } from './useMenuKeyboard'

const Placeholder = defineComponent({ render: () => h('div') })

const meta = {
    title: 'Composables/useMenuKeyboard',
    component: Placeholder,
    parameters: {
        controls: { disable: true },
    },
} satisfies Meta<typeof Placeholder>

export default meta
type Story = StoryObj<typeof meta>

// ── Demo：完整 menu 鍵盤行為 ──
export const Basic: Story = {
    name: '完整 Menu 鍵盤行為',
    render: () => ({
        setup() {
            const isOpen = ref(false)
            const menuItemRefs = ref<HTMLElement[]>([])
            const log = ref<string[]>([])

            const items = [
                { label: '✏️  編輯', value: 'edit', disabled: false },
                { label: '🔗  分享（停用）', value: 'share', disabled: true },
                { label: '📋  複製', value: 'copy', disabled: false },
                { label: '🗑️  刪除', value: 'delete', disabled: false },
            ]

            const close = () => { isOpen.value = false }

            const { onMenuKeydown, setItemRef } = useMenuKeyboard({
                itemRefs:   menuItemRefs,
                isDisabled: (i) => items[i].disabled,
                isOpen,
                onClose:    close,
            })

            function handleClick(item: typeof items[number]) {
                if (item.disabled) return
                log.value.unshift(`點擊：${item.label}`)
                if (log.value.length > 5) log.value.pop()
                close()
            }

            return { isOpen, items, log, onMenuKeydown, setItemRef, handleClick, close }
        },
        template: `
            <div class="p-8 max-w-sm space-y-4">
                <p class="text-sm font-semibold">操作步驟：</p>
                <ol class="text-sm text-gray-600 list-decimal list-inside space-y-1">
                    <li>Tab 鍵 focus 到「開啟選單」按鈕</li>
                    <li>按 Enter / Space 開啟，焦點自動移到第一個選項</li>
                    <li>↓ ↑ 移動；Home / End 跳到邊界；停用項目會被跳過</li>
                    <li>Enter / Space 執行選項</li>
                    <li>Escape 或 Tab 關閉，焦點回到按鈕</li>
                </ol>

                <!-- trigger -->
                <div class="relative inline-block">
                    <button
                        class="rounded border border-gray-300 bg-white px-4 py-2 text-sm cursor-pointer focus:outline focus:outline-2 focus:outline-blue-400"
                        @click="isOpen = !isOpen"
                    >
                        開啟選單 ▾
                    </button>

                    <!-- menu -->
                    <ul
                        v-if="isOpen"
                        class="absolute left-0 mt-1 list-none m-0 py-1 min-w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                        role="menu"
                        @keydown="onMenuKeydown"
                    >
                        <li
                            v-for="(item, i) in items"
                            :key="item.value"
                            :ref="(el) => setItemRef(el, i)"
                            class="px-4 py-2 text-sm outline-none transition-colors select-none"
                            :class="item.disabled
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'cursor-pointer hover:bg-gray-100 focus:bg-blue-50 focus:text-blue-700'"
                            role="menuitem"
                            :tabindex="item.disabled ? -1 : 0"
                            :aria-disabled="item.disabled"
                            @click="handleClick(item)"
                        >
                            {{ item.label }}
                        </li>
                    </ul>
                </div>

                <!-- 操作紀錄 -->
                <div>
                    <p class="text-xs font-semibold text-gray-400 mb-1">操作紀錄：</p>
                    <ul class="text-xs text-gray-500 space-y-0.5">
                        <li v-for="(entry, i) in log" :key="i">{{ entry }}</li>
                        <li v-if="!log.length">尚未操作</li>
                    </ul>
                </div>
            </div>
        `,
    }),
}
