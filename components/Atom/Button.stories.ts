import type { Meta, StoryObj } from '@nuxtjs/storybook'
import Button from './Button.vue'

const meta = {
  title: 'Atom/Button',
  component: Button,
  argTypes: {
    text: { control: 'text', description: '按鈕文字（被 slot 覆蓋時無效）' },
    href: { control: 'text', description: '傳入後自動變成 NuxtLink' },
    target: { control: 'boolean', description: '是否開新分頁（_blank）' },
    disabled: { control: 'boolean', description: '停用狀態，強制渲染成 button' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    text: 'Button',
    target: false,
    disabled: false,
  },
}

export const Example : Meta<typeof Button> = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    components: { Button },
    template: `
      <div style="display:flex;gap:8px;">
        <Button text="預設" />
        <Button text="停用" :disabled="true" />
        <Button text="連結" href="https://example.com" />
      </div>
    `,
  }),
}
