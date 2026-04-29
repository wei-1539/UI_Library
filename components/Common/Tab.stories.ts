import type { Meta, StoryObj } from '@nuxtjs/storybook'
import { ref } from 'vue'
import Tab from './Tab.vue'

const defaultItems = [
    { label: '全部', value: 'all' },
    { label: '進行中', value: 'active' },
    { label: '已完成', value: 'done' },
]

const iconItems = [
    { label: '首頁', value: 'home', icon: 'add' },
    { label: '設定', value: 'settings', icon: 'clean' },
    { label: '通知', value: 'notifications', icon: 'article' },
]

const disabledItems = [
    { label: '全部', value: 'all' },
    { label: '進行中', value: 'active' },
    { label: '已封存', value: 'archived', disabled: true },
    { label: '已完成', value: 'done' },
]

const meta = {
    title: 'Common/Tab',
    component: Tab,
    argTypes: {
        current: { control: 'text', description: '目前選中的 tab value（v-model:current）' },
        items: { control: 'object', description: 'Tab 項目陣列 `{ label, value, disabled?, icon? }`' },
        variant: { control: 'select', options: ['line', 'pill', 'card'], description: '樣式變體' },
        size: { control: 'select', options: ['sm', 'md', 'lg'], description: '尺寸' },
        fullWidth: { control: 'boolean', description: '是否撐滿容器寬度' },
    },
} satisfies Meta<typeof Tab>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
    args: {
        current: 'all',
        items: defaultItems,
        variant: 'line',
        size: 'md',
    },
}

export const Pill: Story = {
    name: 'Pill 樣式',
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Tab },
        setup() {
            const active = ref('all')
            return { active, items: defaultItems }
        },
        template: `
            <Tab v-model:current="active" :items="items" variant="pill" />
            <p class="mt-2 text-sm text-gray-500">選中：{{ active }}</p>
        `,
    }),
}

export const Card: Story = {
    name: 'Card 樣式',
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Tab },
        setup() {
            const active = ref('all')
            return { active, items: defaultItems }
        },
        template: `
            <Tab v-model:current="active" :items="items" variant="card" />
            <p class="mt-2 text-sm text-gray-500">選中：{{ active }}</p>
        `,
    }),
}

export const Sizes: Story = {
    name: '尺寸比較',
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Tab },
        setup() {
            const sm = ref('all')
            const md = ref('all')
            const lg = ref('all')
            return { sm, md, lg, items: defaultItems }
        },
        template: `
            <div class="flex flex-col gap-6">
                <div>
                    <p class="mb-1 text-sm text-gray-500">sm</p>
                    <Tab v-model:current="sm" :items="items" size="sm" />
                </div>
                <div>
                    <p class="mb-1 text-sm text-gray-500">md（預設）</p>
                    <Tab v-model:current="md" :items="items" size="md" />
                </div>
                <div>
                    <p class="mb-1 text-sm text-gray-500">lg</p>
                    <Tab v-model:current="lg" :items="items" size="lg" />
                </div>
            </div>
        `,
    }),
}

export const WithIcon: Story = {
    name: '帶 Icon',
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Tab },
        setup() {
            const active = ref('home')
            return { active, items: iconItems }
        },
        template: `
            <Tab v-model:current="active" :items="items" />
            <p class="mt-2 text-sm text-gray-500">選中：{{ active }}</p>
        `,
    }),
}

export const Disabled: Story = {
    name: '禁用個別 Tab',
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Tab },
        setup() {
            const active = ref('all')
            return { active, items: disabledItems }
        },
        template: `
            <Tab v-model:current="active" :items="items" />
            <p class="mt-2 text-sm text-gray-500">「已封存」為禁用狀態，選中：{{ active }}</p>
        `,
    }),
}

export const FullWidth: Story = {
    name: '撐滿寬度',
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Tab },
        setup() {
            const active = ref('all')
            return { active, items: defaultItems }
        },
        template: `
            <div class="w-full border border-dashed border-black p-2">
                <Tab v-model:current="active" :items="items" full-width />
            </div>
            <br>
            <p>full-width = true 時，Tab 會撐滿容器寬度</p>
            <p class="mt-2 text-sm text-gray-500">選中：{{ active }}</p>
        `,
    }),
}

export const AllVariants: Story = {
    name: '三種樣式一覽',
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Tab },
        setup() {
            const line = ref('all')
            const pill = ref('all')
            const card = ref('all')
            return { line, pill, card, items: defaultItems }
        },
        template: `
            <div class="flex flex-col gap-8">
                <div>
                    <p class="mb-1 text-sm font-semibold">Line（預設）</p>
                    <Tab v-model:current="line" :items="items" variant="line" />
                </div>
                <div>
                    <p class="mb-1 text-sm font-semibold">Pill</p>
                    <Tab v-model:current="pill" :items="items" variant="pill" />
                </div>
                <div>
                    <p class="mb-1 text-sm font-semibold">Card</p>
                    <Tab v-model:current="card" :items="items" variant="card" />
                </div>
            </div>
        `,
    }),
}
