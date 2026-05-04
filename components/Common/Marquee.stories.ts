import type { Meta, StoryObj } from '@nuxtjs/storybook'
import Marquee from './Marquee.vue'

const meta = {
    title: 'Animation/Marquee',
    component: Marquee,
    argTypes: {
        text: {
            control: 'text',
            description: '跑馬燈文字（必填）',
            type: { name: 'string', required: true },
        },
        speed: { control: 'number', description: '跑馬燈速度' },
        direction: { control: 'select', options: ['left', 'right'], description: '跑馬燈方向' },
        fullWidth: { control: 'boolean', description: '是否撐滿容器寬度' },
    },
} satisfies Meta<typeof Marquee>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
    args: {
        text: 'Hello World',
        speed: 150,
        direction: 'left',
        fullWidth: false,
    }
}

export const SlowSpeed: Story = {
    name: '慢速 與 快速',
    args: { text: '慢速跑馬燈 🐢' },
    parameters: {controls: {disable: true}},
    render: () => ({
        components: { Marquee },
        template: `
            <div class="flex flex-col gap-4">
                <p class="text-dt-zh-body-2">使用 speed 可以調整跑馬燈的速度 <br/> 數值愈大，速度愈快</p>
                <h2 class="text-dt-zh-head-2">速度 30 的跑馬燈 🐢</h2>
                <Marquee text="慢速跑馬燈 🐢" :speed="30" direction="left" :full-width="false" />
                <h2 class="text-dt-zh-head-2">速度 200 的跑馬燈 🚀</h2>
                <Marquee text="快速跑馬燈 🚀" :speed="200" direction="left" :full-width="false" />
            </div>
        `,
    }),
}

export const DirectionRight: Story = {
    name: '切換方向',
    args: { text: '往左跑的文字 ←' },
    parameters: {controls: {disable: true}},
    render: () => ({
        components: { Marquee },
        template: `
            <div class="flex flex-col gap-4">
                <h2 class="text-dt-zh-head-2">『預設』往左跑的文字</h2>
                <Marquee text="往左跑的文字 ←" :speed="50"  :full-width="false" />
                <h2 class="text-dt-zh-head-2">往右跑的文字 →</h2>
                <p class="text-dt-zh-body-2">使用 direction="right" 可以讓文字往右跑</p>
                <Marquee text="往右跑的文字 →" :speed="50" direction="right" :full-width="false" />
            </div>
        `,
    }),
}

export const FullWidth: Story = {
    name: '撐滿寬度',
    args: { text: '撐滿寬度的跑馬燈' },
    parameters: {controls: {disable: true}},
    render: () => ({
        components: { Marquee },
        template: `
            <div class="flex flex-col gap-4">
                <p class="text-dt-zh-body-2">使用 full-width="true" 可以讓跑馬燈撐滿容器寬度</p>
                <Marquee text="撐滿寬度的跑馬燈" :speed="50" :full-width="true" />
            </div>
        `,
    }),
}

