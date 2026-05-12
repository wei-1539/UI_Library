import type { Meta, StoryObj } from '@nuxtjs/storybook'
import { ref } from 'vue'
import Poppover from './Poppover.vue'

const meta = {
    title: 'Atom/Poppover',
    component: Poppover,
    argTypes: {
        modelValue: { control: 'boolean', description: '受控模式開關（v-model）' },
        trigger: {
            control: 'select',
            options: ['click', 'hover', 'focus', 'touch'],
            description: '觸發方式',
        },
        placement: {
            control: 'select',
            options: ['top', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end'],
            description: '彈出位置',
        },
        offset: {
            control: 'object',
            description: '位移。可傳數字，或 `{ mainAxis, crossAxis }`',
        },
        'update:modelValue':{
            action: 'update:modelValue',
            description: '開關狀態變更時觸發，回傳 `boolean`，搭配 `v-model` 使用。',
        },
        reference:{
            description: '可以放入自定義的觸發元素（例如按鈕、icon）。',
        },
        default:{
            description: '內容區塊。',
        }
    },
} satisfies Meta<typeof Poppover>

export default meta
type Story = StoryObj<typeof meta>

export const Uncontrolled: Story = {
    name: '非受控（預設）',
    args: {
        trigger: 'click',
        placement: 'bottom-end',
        offset: { mainAxis: 8, crossAxis: 0 },
    },
    render: (args) => ({
        components: { Poppover },
        setup() {
            return { args }
        },
        template: `
            <div class="p-6">
                <p class="mb-3 text-sm text-gray-500">沒有綁 v-model，開關由元件內部自己管理。</p>
                <Poppover v-bind="args">
                    <template #reference>
                        <button type="button" class="rounded border border-gray-300 px-2 py-1 text-sm">⋯</button>
                    </template>
                    <div class="min-w-[140px] space-y-1 bg-gray-100 rounded-lg p-2">
                        <button type="button" class="block w-full rounded px-3 py-1 text-left text-sm hover:bg-gray-100">編輯資料</button>
                        <button type="button" class="block w-full rounded px-3 py-1 text-left text-sm hover:bg-gray-100">分享連結</button>
                        <button type="button" class="block w-full rounded px-3 py-1 text-left text-sm text-red-600 hover:bg-gray-100">刪除帳號</button>
                    </div>
                </Poppover>
            </div>
        `,
    }),
}

export const Controlled: Story = {
    name: '受控（v-model）',
    parameters: { controls: { disable: true } },
    args: {
        modelValue: false,
        trigger: 'click',
        placement: 'bottom-end',
        offset: { mainAxis: 8, crossAxis: 0 },
    },
    render: (args) => ({
        components: { Poppover },
        setup() {
            const open = ref(args.modelValue ?? false)
            return { open, args }
        },
        template: `
            <div class="p-6">
                <p class="mb-3 text-sm text-gray-500">有綁 v-model，可用外部按鈕強制控制。</p>
                <div class="mb-3 flex gap-2">
                    <button type="button" class="rounded border border-gray-300 bg-white px-3 py-1 text-sm" @click="open = true">
                        外部打開
                    </button>
                    <button type="button" class="rounded border border-gray-300 bg-white px-3 py-1 text-sm" @click="open = false">
                        外部關閉
                    </button>
                </div>
                <Poppover v-bind="args" v-model="open">
                    <template #reference>
                        <button type="button" class="rounded border border-gray-300 px-2 py-1 text-sm">⋯</button>
                    </template>
                    <div class="min-w-[140px] space-y-1 bg-gray-100 rounded-lg p-2">
                        <button type="button" class="block w-full rounded px-3 py-1 text-left text-sm hover:bg-gray-100">編輯資料</button>
                        <button type="button" class="block w-full rounded px-3 py-1 text-left text-sm hover:bg-gray-100">分享連結</button>
                        <button type="button" class="block w-full rounded px-3 py-1 text-left text-sm text-red-600 hover:bg-gray-100">刪除帳號</button>
                    </div>
                </Poppover>
                <p class="mt-3 text-sm text-gray-500">外部狀態：{{ open ? '開啟' : '關閉' }}</p>
            </div>
        `,
    }),
}

export const HoverTrigger: Story = {
    name: 'Hover 觸發',
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Poppover },
        template: `
            <div class="p-6">
                <p class="mb-3 text-sm text-gray-500">滑鼠移入 reference 開啟，移出關閉。</p>
                <Poppover trigger="hover" placement="right" :offset="8">
                    <template #reference>
                        <button type="button" class="rounded border border-gray-300 px-3 py-1 text-sm">
                            Hover 我
                        </button>
                    </template>
                    <div class="text-sm">這是一個 hover popover</div>
                </Poppover>
            </div>
        `,
    }),
}
export const ControlledVsUncontrolled: Story = {
    name: '受控 vs 非受控',
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Poppover },
        data() {
            return {
                controlledOpen: false,
            }
        },
        template: `
            <div class="mb-3 flex  gap-2">
                    <button
                        type="button"
                        class="rounded border border-gray-300 bg-white px-3 py-1 text-sm"
                        @click="controlledOpen = true"
                    >
                        外部打開受控選單
                    </button>
                    <button
                        type="button"
                        class="rounded border border-gray-300 bg-white px-3 py-1 text-sm"
                        @click="controlledOpen = false"
                    >
                        外部關閉受控選單
                    </button>
            </div>
            <div class="grid gap-6 md:grid-cols-2 p-6">
                <div class="rounded-lg border border-gray-200 bg-white p-4">
                    <p class="mb-2 text-dt-zh-body-2 font-semibold">受控（有 v-model）</p>
                    <div class="mb-3 flex items-start justify-between">
                        <div>
                            <p class="text-dt-zh-body-1 font-semibold">Wei Chen</p>
                            <p class="text-dt-zh-body-2 text-txt-light">@wei0713</p>
                        </div>
                        <Poppover v-model="controlledOpen" placement="bottom-end" :offset="8">
                            <template #reference>
                                <button type="button" class="rounded border border-gray-300 px-2 py-1 text-sm">⋯</button>
                            </template>
                            <div class="min-w-[140px] space-y-1 bg-gray-100 rounded-lg p-2">
                                <button type="button" class="block w-full rounded px-3 py-1 text-left text-sm hover:bg-gray-100">編輯資料</button>
                                <button type="button" class="block w-full rounded px-3 py-1 text-left text-sm hover:bg-gray-100">分享連結</button>
                                <button type="button" class="block w-full rounded px-3 py-1 text-left text-sm text-red-600 hover:bg-gray-100">刪除帳號</button>
                            </div>
                        </Poppover>
                    </div>

                    <p class="text-dt-zh-body-2 text-txt-light">外部狀態：{{ controlledOpen ? '開啟' : '關閉' }}</p>
                </div>
                <div class="rounded-lg border border-gray-200 bg-white p-4">
                    <p class="mb-2 text-dt-zh-body-2 font-semibold">非受控（沒有 v-model）</p>
                    <div class="mb-3 flex items-start justify-between">
                        <div>
                            <p class="text-dt-zh-body-1 font-semibold">Dylan Lan</p>
                            <p class="text-dt-zh-body-2 text-txt-light">@dylan</p>
                        </div>
                        <Poppover placement="bottom-end" :offset="8">
                            <template #reference>
                                <button type="button" class="rounded border border-gray-300 px-2 py-1 text-sm">⋯</button>
                            </template>
                            <div class="min-w-[140px] space-y-1 bg-gray-100 rounded-lg p-2">
                                <button type="button" class="block w-full rounded px-3 py-1 text-left text-sm hover:bg-gray-100">編輯資料</button>
                                <button type="button" class="block w-full rounded px-3 py-1 text-left text-sm hover:bg-gray-100">分享連結</button>
                                <button type="button" class="block w-full rounded px-3 py-1 text-left text-sm text-red-600 hover:bg-gray-100">刪除帳號</button>
                            </div>
                        </Poppover>
                    </div>
                    <p class="text-dt-zh-body-2 text-txt-light">非受控 Poppover，只會根據元件自己觸發與關閉</p>
                </div>
            </div>
        `,
    }),
}

