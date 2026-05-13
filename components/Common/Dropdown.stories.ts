import type { Meta, StoryObj } from '@nuxtjs/storybook'
import { ref } from 'vue'
import Dropdown from './Dropdown.vue'

const meta = {
    title: 'Common/Dropdown',
    component: Dropdown,
    argTypes: {
        items: {
            control: 'object',
            description: '選單項目陣列 `{ label, value, disabled?, onClick?, context? }`',
        },
        placement: {
            control: 'select',
            options: [
                'top', 'top-start', 'top-end',
                'bottom', 'bottom-start', 'bottom-end',
                'left', 'left-start', 'left-end',
                'right', 'right-start', 'right-end',
            ],
            description: '選單彈出位置',
        },
        offset: {
            control: 'number',
            description: '選單與 trigger 的間距（px）',
        },
        trigger: {
            control: 'select',
            options: ['click', 'hover'],
            description: '觸發方式',
        },
        disabled: {
            control: 'boolean',
            description: '是否禁用整個 Dropdown',
        },
    },
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

// ── 基本用法 ──
export const Basic: Story = {
    args: {
        placement: 'bottom-start',
        offset: 8,
        items: [
            { label: '編輯', value: 'edit' },
            { label: '複製', value: 'copy' },
            { label: '刪除', value: 'delete' },
        ],
    },
    render: (args) => ({
        components: { Dropdown },
        setup() {
            const log = ref('')
            const items = args.items?.map((item) => ({
                ...item,
                onClick: (value: string) => { log.value = `點擊了：${value}` },
            }))
            return { args: { ...args, items }, log }
        },
        template: `
            <div class="p-10">
                <Dropdown v-bind="args">
                    <template #trigger>
                        <button class="rounded border border-gray-300 bg-white px-4 py-2 text-sm cursor-pointer">
                            選單 ▾
                        </button>
                    </template>
                </Dropdown>
                <p class="mt-4 text-sm text-gray-500">{{ log || '尚未點擊任何項目' }}</p>
            </div>
        `,
    }),
}

// ── 含 disabled 項目 ──
export const WithDisabled: Story = {
    name: '含 Disabled 項目',
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Dropdown },
        setup() {
            const log = ref('')
            const items = [
                { label: '編輯', value: 'edit', onClick: (v: string) => { log.value = `點擊了：${v}` } },
                { label: '封存（停用）', value: 'archive', disabled: true },
                { label: '刪除', value: 'delete', onClick: (v: string) => { log.value = `點擊了：${v}` } },
            ]
            return { items, log }
        },
        template: `
            <div class="p-10">
                <p class="mb-4 text-sm text-gray-500">「封存」為 disabled，無法點擊，鍵盤方向鍵也會跳過它。</p>
                <Dropdown :items="items" placement="bottom-start">
                    <template #trigger>
                        <button class="rounded border border-gray-300 bg-white px-4 py-2 text-sm cursor-pointer">
                            選單 ▾
                        </button>
                    </template>
                </Dropdown>
                <p class="mt-4 text-sm text-gray-500">{{ log || '尚未點擊任何項目' }}</p>
            </div>
        `,
    }),
}

// ── onClick 帶兩個參數：手動控制關閉時機 ──
export const ManualClose: Story = {
    name: '手動控制關閉（onClick 帶 close）',
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Dropdown },
        setup() {
            const log = ref('')
            const items = [
                {
                    label: '立即關閉',
                    value: 'instant',
                    // onClick 只有 1 個參數 → 執行後自動關閉
                    onClick: (v: string) => { log.value = `「${v}」執行後自動關閉` },
                },
                {
                    label: '延遲 1 秒關閉',
                    value: 'delay',
                    // onClick 有 2 個參數 (value, close) → 自己決定何時關閉
                    onClick: (v: string, close: () => void) => {
                        log.value = `「${v}」執行中，1 秒後關閉...`
                        setTimeout(() => {
                            close()
                            log.value = `「${v}」已完成，選單關閉`
                        }, 1000)
                    },
                },
            ]
            return { items, log }
        },
        template: `
            <div class="p-10">
                <p class="mb-4 text-sm text-gray-500">
                    onClick 只傳 1 個參數 → 執行後自動關閉。<br>
                    onClick 傳 2 個參數 (value, close) → 自己決定何時呼叫 close()。
                </p>
                <Dropdown :items="items" placement="bottom-start">
                    <template #trigger>
                        <button class="rounded border border-gray-300 bg-white px-4 py-2 text-sm cursor-pointer">
                            選單 ▾
                        </button>
                    </template>
                </Dropdown>
                <p class="mt-4 text-sm text-gray-500">{{ log || '尚未點擊任何項目' }}</p>
            </div>
        `,
    }),
}

// ── 自訂 menuitem slot ──
export const CustomMenuItem: Story = {
    name: '自訂 MenuItem 樣式（slot）',
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Dropdown },
        setup() {
            const items = [
                { label: '編輯', value: 'edit', context: { icon: '✏️' } },
                { label: '分享', value: 'share', context: { icon: '🔗' } },
                { label: '刪除', value: 'delete', context: { icon: '🗑️' }, disabled: true },
            ]
            return { items }
        },
        template: `
            <div class="p-10">
                <p class="mb-4 text-sm text-gray-500">透過 #menuitem slot 自訂每個選項的內容。</p>
                <Dropdown :items="items" placement="bottom-start">
                    <template #trigger>
                        <button class="rounded border border-gray-300 bg-white px-4 py-2 text-sm cursor-pointer">
                            選單 ▾
                        </button>
                    </template>
                    <template #menuitem="{ label, context, disabled }">
                        <span class="flex items-center gap-2" :class="disabled ? 'opacity-40' : ''">
                            <span>{{ context?.icon }}</span>
                            <span>{{ label }}</span>
                        </span>
                    </template>
                </Dropdown>
            </div>
        `,
    }),
}

// ── Hover 觸發 ──
export const HoverTrigger: Story = {
    name: 'Hover 觸發',
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Dropdown },
        setup() {
            const items = [
                { label: '個人資料', value: 'profile' },
                { label: '設定', value: 'settings' },
                { label: '登出', value: 'logout' },
            ]
            return { items }
        },
        template: `
            <div class="p-10">
                <p class="mb-4 text-sm text-gray-500">滑鼠移入 trigger 時自動展開。</p>
                <Dropdown :items="items" trigger="hover" placement="bottom-start">
                    <template #trigger>
                        <button class="rounded border border-gray-300 bg-white px-4 py-2 text-sm cursor-pointer">
                            Hover 我 ▾
                        </button>
                    </template>
                </Dropdown>
            </div>
        `,
    }),
}

// ── 整個 Dropdown 停用 ──
export const EntirelyDisabled: Story = {
    name: '整個 Dropdown 停用',
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Dropdown },
        setup() {
            const items = [
                { label: '編輯', value: 'edit' },
                { label: '刪除', value: 'delete' },
            ]
            return { items }
        },
        template: `
            <div class="p-10">
                <p class="mb-4 text-sm text-gray-500">disabled=true 時，點擊 trigger 不會開啟選單。</p>
                <Dropdown :items="items" :disabled="true" placement="bottom-start">
                    <template #trigger>
                        <button class="rounded border border-gray-300 bg-white px-4 py-2 text-sm cursor-not-allowed opacity-50">
                            停用的選單 ▾
                        </button>
                    </template>
                </Dropdown>
            </div>
        `,
    }),
}

// ── 鍵盤操作 Demo（展示 useMenuKeyboard 的行為）──
export const KeyboardDemo: Story = {
    name: '鍵盤操作（useMenuKeyboard）',
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Dropdown },
        setup() {
            const log = ref<string[]>([])
            const items = [
                { label: '選項 A', value: 'a', onClick: (v: string) => { log.value.unshift(`點擊：${v}`) } },
                { label: '選項 B（停用）', value: 'b', disabled: true },
                { label: '選項 C', value: 'c', onClick: (v: string) => { log.value.unshift(`點擊：${v}`) } },
                { label: '選項 D', value: 'd', onClick: (v: string) => { log.value.unshift(`點擊：${v}`) } },
            ]
            return { items, log }
        },
        template: `
            <div class="p-10">
                <p class="mb-2 text-sm font-semibold">鍵盤操作說明（來自 useMenuKeyboard composable）</p>
                <ul class="mb-4 text-sm text-gray-600 list-disc list-inside space-y-1">
                    <li>Tab 鍵 focus 到按鈕後，按 Enter 開啟選單</li>
                    <li>開啟後自動 focus 第一個非停用項目</li>
                    <li>↓ / ↑ 移動焦點，停用項目會被跳過</li>
                    <li>Home ← 第一個；End → 最後一個 <br/> mac 使用者請使用 Home: fn+ ← / END: fn + →</li>
                    <li>Enter / Space → 執行該項目</li>
                    <li>Escape / Tab → 關閉，焦點回到 trigger 按鈕</li>
                </ul>
                <Dropdown :items="items" placement="bottom-start">
                    <template #trigger>
                        <button class="rounded border border-gray-300 bg-white px-4 py-2 text-sm cursor-pointer">
                            開啟選單 ▾
                        </button>
                    </template>
                </Dropdown>
                <div class="mt-4">
                    <p class="text-sm font-semibold mb-1">操作紀錄：</p>
                    <ul class="text-sm text-gray-500 space-y-0.5">
                        <li v-for="(entry, i) in log" :key="i">{{ entry }}</li>
                        <li v-if="!log.length">尚未操作</li>
                    </ul>
                </div>
            </div>
        `,
    }),
}
