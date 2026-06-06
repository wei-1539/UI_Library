import type { Meta, StoryObj } from '@nuxtjs/storybook'
import Badge from './Badge.vue'
import Button from './Button.vue'

const meta = {
  title: 'Atom/Badge',
  component: Badge,
  argTypes: {
    content: {
      control: 'text',
      description: '顯示的數字或文字，未傳入時只顯示小點（搭配 dot）',
      table: { type: { summary: 'string' } },
    },
    max: {
      control: 'number',
      description: '數值上限，超過顯示 `+max`',
      table: { type: { summary: 'number' }, defaultValue: { summary: '99' } },
    },
    color: {
      control: 'select',
      options: ['pr', 'sec', 'success', 'alert', 'ad'],
      description: '徽章顏色',
      table: {
        type: { summary: "'pr' | 'sec' | 'success' | 'alert' | 'ad'" },
        defaultValue: { summary: 'alert' },
      },
    },
    placement: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      description: '徽章位置',
      table: {
        type: { summary: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'" },
        defaultValue: { summary: 'top-right' },
      },
    },
    size: {
      control: 'select',
      options: ['dot', 'md', 'lg'],
      description: '徽章尺寸，dot 為純圓點（不顯示文字）',
      table: {
        type: { summary: "'dot' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' },
      },
    },
    showZero: {
      control: 'boolean',
      description: 'content 為 "0" 時是否仍顯示徽章',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

const DemoBox = `<span style="display:inline-block;width:40px;height:40px;background:#e2e8f0;border-radius:8px;"></span>`

export const Basic: Story = {
  args: {
    content: '5',
    color: 'alert',
    size: 'md',
    placement: 'top-right',
    max: 99,
    showZero: false,
  },
  render: (args) => ({
    components: { Badge },
    setup: () => ({ args }),
    template: `<Badge v-bind="args">${DemoBox}</Badge>`,
  }),
}

export const Colors: Story = {
  name: '顏色',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Badge },
    template: `
      <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Badge content="5" color="pr">${DemoBox}</Badge>
          <span style="font-size:12px;color:#64748b;">pr</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Badge content="5" color="sec">${DemoBox}</Badge>
          <span style="font-size:12px;color:#64748b;">sec</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Badge content="5" color="success">${DemoBox}</Badge>
          <span style="font-size:12px;color:#64748b;">success</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Badge content="5" color="alert">${DemoBox}</Badge>
          <span style="font-size:12px;color:#64748b;">alert</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Badge content="5" color="ad">${DemoBox}</Badge>
          <span style="font-size:12px;color:#64748b;">ad</span>
        </div>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  name: '尺寸',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Badge },
    template: `
      <div style="display:flex;gap:32px;align-items:center;flex-wrap:wrap;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Badge content="5" size="dot">${DemoBox}</Badge>
          <span style="font-size:12px;color:#64748b;">dot（純點）</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Badge content="5" size="md">${DemoBox}</Badge>
          <span style="font-size:12px;color:#64748b;">md（預設）</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Badge content="5" size="lg">${DemoBox}</Badge>
          <span style="font-size:12px;color:#64748b;">lg</span>
        </div>
      </div>
    `,
  }),
}

export const Placements: Story = {
  name: '位置',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Badge },
    template: `
      <div style="display:flex;gap:32px;align-items:center;flex-wrap:wrap;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Badge content="5" placement="top-right">${DemoBox}</Badge>
          <span style="font-size:12px;color:#64748b;">top-right</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Badge content="5" placement="top-left">${DemoBox}</Badge>
          <span style="font-size:12px;color:#64748b;">top-left</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Badge content="5" placement="bottom-right">${DemoBox}</Badge>
          <span style="font-size:12px;color:#64748b;">bottom-right</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Badge content="5" placement="bottom-left">${DemoBox}</Badge>
          <span style="font-size:12px;color:#64748b;">bottom-left</span>
        </div>
      </div>
    `,
  }),
}

export const MaxCount: Story = {
  name: '超過上限',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Badge },
    template: `
      <div style="display:flex;gap:32px;align-items:center;flex-wrap:wrap;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Badge content="50" :max="99">${DemoBox}</Badge>
          <span style="font-size:12px;color:#64748b;">50 / max 99</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Badge content="100" :max="99">${DemoBox}</Badge>
          <span style="font-size:12px;color:#64748b;">100 / max 99 → +99</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Badge content="9999" :max="999">${DemoBox}</Badge>
          <span style="font-size:12px;color:#64748b;">9999 / max 999 → +999</span>
        </div>
      </div>
    `,
  }),
}

export const ShowZero: Story = {
  name: 'showZero',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Badge },
    template: `
      <div style="display:flex;gap:32px;align-items:center;flex-wrap:wrap;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Badge content="0" :showZero="false">${DemoBox}</Badge>
          <span style="font-size:12px;color:#64748b;">content="0"，showZero=false（隱藏）</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Badge content="0" :showZero="true">${DemoBox}</Badge>
          <span style="font-size:12px;color:#64748b;">content="0"，showZero=true（顯示）</span>
        </div>
      </div>
    `,
  }),
}

export const WithButton: Story = {
  name: '搭配 Button',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Badge, Button },
    template: `
      <div style="display:flex;gap:32px;align-items:center;flex-wrap:wrap;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Badge content="3" color="alert">
            <Button text="通知" />
          </Badge>
          <span style="font-size:12px;color:#64748b;">一般數字</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Badge content="128" :max="99" color="alert">
            <Button text="訊息" variant="secondary" />
          </Badge>
          <span style="font-size:12px;color:#64748b;">超過上限 → +99</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Badge size="dot" color="success">
            <Button text="上線中" variant="success" />
          </Badge>
          <span style="font-size:12px;color:#64748b;">dot 純圓點</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Badge content="0" :showZero="false">
            <Button text="已讀" variant="primary" />
          </Badge>
          <span style="font-size:12px;color:#64748b;">content=0，隱藏</span>
        </div>
      </div>
    `,
  }),
}
