import type { Meta, StoryObj } from '@nuxtjs/storybook'
import { ref, defineComponent, h } from 'vue'
import { useFocusReturn } from './useFocusReturn'

const Placeholder = defineComponent({ render: () => h('div') })

const meta = {
    title: 'Composables/useFocusReturn',
    component: Placeholder,
    parameters: {
        controls: { disable: true },
    },
} satisfies Meta<typeof Placeholder>

export default meta
type Story = StoryObj<typeof meta>

// ── Demo：開啟時自動 focus，關閉時焦點還回 trigger ──
export const Basic: Story = {
    name: '焦點自動管理（開啟 / 關閉）',
    render: () => ({
        setup() {
            const isOpen = ref(false)
            const itemRefs = ref<HTMLElement[]>([])
            const focusLog = ref<string[]>([])

            const items = [
                { label: '選項 A', disabled: false },
                { label: '選項 B（停用）', disabled: true },
                { label: '選項 C', disabled: false },
            ]

            useFocusReturn({
                isOpen,
                itemRefs,
                isDisabled: (i) => items[i].disabled,
            })

            function setItemRef(el: any, i: number) {
                if (!el) return
                itemRefs.value[i] = el
            }

            function trackFocus(label: string) {
                focusLog.value.unshift(`focus → ${label}`)
                if (focusLog.value.length > 5) focusLog.value.pop()
            }

            return { isOpen, items, focusLog, setItemRef, trackFocus }
        },
        template: `
            <div class="p-8 max-w-sm space-y-4">
                <p class="text-sm text-gray-500">
                    用 Tab 鍵 focus 到「開啟面板」按鈕，按 Enter 或 Space 開啟。<br>
                    觀察：開啟後焦點自動移到第一個非停用選項；關閉後焦點回到按鈕。
                </p>

                <!-- trigger 按鈕 -->
                <button
                    class="rounded border border-gray-300 bg-white px-4 py-2 text-sm cursor-pointer focus:outline focus:outline-2 focus:outline-blue-400"
                    @click="isOpen = !isOpen"
                    @focus="trackFocus('trigger 按鈕')"
                >
                    {{ isOpen ? '關閉面板' : '開啟面板' }}
                </button>

                <!-- 面板（模擬 menu 內容） -->
                <div
                    v-if="isOpen"
                    class="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                >
                    <div
                        v-for="(item, i) in items"
                        :key="item.label"
                        :ref="(el) => setItemRef(el, i)"
                        class="px-4 py-2 text-sm outline-none transition-colors"
                        :class="item.disabled
                            ? 'text-gray-300 bg-gray-50 cursor-not-allowed'
                            : 'cursor-pointer hover:bg-blue-50 focus:bg-blue-100 focus:text-blue-700'"
                        :tabindex="item.disabled ? -1 : 0"
                        @focus="trackFocus(item.label)"
                        @click="!item.disabled && (isOpen = false)"
                        @keydown.enter="!item.disabled && (isOpen = false)"
                        @keydown.escape="isOpen = false"
                    >
                        {{ item.label }}
                    </div>
                </div>

                <!-- 焦點紀錄 -->
                <div>
                    <p class="text-xs font-semibold text-gray-400 mb-1">焦點移動紀錄：</p>
                    <ul class="text-xs text-gray-500 space-y-0.5">
                        <li v-for="(log, i) in focusLog" :key="i">{{ log }}</li>
                        <li v-if="!focusLog.length">尚未操作</li>
                    </ul>
                </div>
            </div>
        `,
    }),
}
