import type { Meta, StoryObj } from '@nuxtjs/storybook'
import { ref } from 'vue'
import Pagination from './Pagination.vue'

const meta = {
    title: 'Atom/Pagination',
    component: Pagination,
    argTypes: {
        currentPage: { control: { type: 'number', min: 1 }, description: '目前頁碼' },
        totalPage: { control: { type: 'number', min: 1 }, description: '總頁數（直接指定）' },
        total: { control: { type: 'number', min: 0 }, description: '總筆數（搭配 perPage 計算頁數）' },
        perPage: { control: { type: 'number', min: 1 }, description: '每頁幾筆' },
        siblingsCount: { control: { type: 'number', min: 0 }, description: '當前頁碼左右各顯示幾頁' },
        boundaryCount: { control: { type: 'number', min: 0 }, description: '開頭結尾固定顯示幾頁' },
        perPageOptions: { control: { type: 'object', items: { type: 'number', min: 1 } }, description: '每頁筆數選項，搭配 layout=change 時使用' },
        layout: { control: 'select', options: ['default', 'change'], description: '版型：change 會顯示每頁筆數下拉選單' },
    },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
    args: {
        currentPage: 5,
        totalPage: 20,
        siblingsCount: 1,
        boundaryCount: 1,
    },
    render: (args) => ({
        components: { Pagination },
        setup() {
            return { args }
        },
        template: `
            <Pagination
                v-bind="args"
                @update:currentPage="args.currentPage = $event"
                @update:perPage="args.perPage = $event"
            />
        `,
    }),
}

export const MoreSiblings: Story = {
    name: '當前頁碼，固定顯示前後頁碼數量',
    parameters: { controls: { disable: true } },
    args: {
        currentPage: 15,
        totalPage: 30,
        siblingsCount: 3,
        boundaryCount: 1,
    },
    render: (args) => ({
        components: { Pagination },
        setup() {
            return { args }
        },
        template: `
            <p>siblingsCount = {{ args.siblingsCount }}，『當前頁碼』顯示前後頁碼數量</p>
            <Pagination v-bind="args" />
        `,
    }),
}

export const MoreBoundary: Story = {
    name: '頁首頁尾，固定顯示數量',
    parameters: { controls: { disable: true } },
    args: {
        currentPage: 10,
        totalPage: 20,
        siblingsCount: 1,
        boundaryCount: 2,
    },
    render: (args) => ({
        components: { Pagination },
        setup() {
            return { args }
        },
        template: `
            <p>boundaryCount = {{ args.boundaryCount }}，頁首頁尾顯示數量</p>
            <Pagination v-bind="args" />
        `,
    }),
}

export const FewPages: Story = {
    name: '少量頁數（無省略號）',
    parameters: { controls: { disable: true } },
    args: {
        currentPage: 3,
        totalPage: 5,
        siblingsCount: 1,
        boundaryCount: 1,
    },
    render: (args) => ({
        components: { Pagination },
        setup() {
            return { args }
        },
        template: `
            <p>totalPage = {{ args.totalPage }}，當總頁數小於 7 頁時，則無需顯示省略號</p>
            <Pagination v-bind="args" />
        `,
    }),
}

export const FromTotal: Story = {
    name: '用 total + perPage 計算頁數',
    parameters: { controls: { disable: true } },
    args: {
        currentPage: 1,
        total: 95,
        perPage: 10,
        siblingsCount: 1,
        boundaryCount: 1,
    },
    render: (args) => ({
        components: { Pagination },
        setup() {
            return { args }
        },
        template: `
            <p>根據 total / perPage ，計算出總頁數，且無條件進位，所以 total = 95，每頁 10 筆，總頁數為 10</p>
            <p>total = 總筆數：{{ args.total }}，每頁 {{ args.perPage }} 筆 ，計算下來會是 9頁 又 5筆，所以總頁數為 10</p>
            <Pagination v-bind="args" />
        `,
    }),
}

export const ChangeLayout: Story = {
    name: '選擇每頁筆數',
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Pagination },
        setup() {
            const page = ref(1)
            const size = ref(10)
            return { page, size }
        },
        template: `
            <div>
                <p>使用 layout=change，含每頁筆數選單</p>
                <p style="margin-bottom:8px;">目前頁碼：{{ page }}，每頁：{{ size }} 筆，總筆數：200</p>
                <Pagination
                    :currentPage="page"
                    :perPage="size"
                    :total="200"
                    layout="change"
                    :siblingsCount="1"
                    :boundaryCount="1"
                    @update:currentPage="page = $event"
                    @update:perPage="size = $event"
                />
            </div>
        `,
    }),
}

export const Interactive: Story = {
    name: '互動式（可點擊切換）',
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Pagination },
        setup() {
            const page = ref(1)
            return { page }
        },
        template: `
            <div>
                <p style="margin-bottom:8px;">目前頁碼：{{ page }}</p>
                <Pagination
                    :currentPage="page"
                    :totalPage="20"
                    :siblingsCount="1"
                    :boundaryCount="1"
                    @update:currentPage="page = $event"
                />
            </div>
        `,
    }),
}
