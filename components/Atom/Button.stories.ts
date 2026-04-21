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
    prepend: { control: 'text', description: '前方 icon 名稱' },
    append: { control: 'text', description: '後方 icon 名稱' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: '按鈕大小',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'alert', 'ad', 'light'],
      description: '顏色變體',
    },
    rounded: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full', 'none'],
      description: '圓角',
    },
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

export const Variants: Story = {
  name: '顏色變體',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <Button text="Primary" variant="primary" />
        <Button text="Secondary" variant="secondary" />
        <Button text="Success" variant="success" />
        <Button text="Alert" variant="alert" />
        <Button text="Ad" variant="ad" />
        <Button text="Light" variant="light" />
      </div>
    `,
  }),
}

export const Sizes: Story = {
  name: '尺寸',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button },
    template: `
      <div style="display:flex;gap:8px;align-items:center;">
        <Button text="XS" size="xs" />
        <Button text="SM" size="sm" />
        <Button text="MD" size="md" />
        <Button text="LG" size="lg" />
      </div>
    `,
  }),
}

export const Rounded: Story = {
  name: '圓角',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button },
    template: `
      <div style="display:flex;gap:8px;align-items:center;">
        <Button text="None" rounded="none" />
        <Button text="SM" rounded="sm" />
        <Button text="MD" rounded="md" />
        <Button text="LG" rounded="lg" />
        <Button text="Full" rounded="full" />
      </div>
    `,
  }),
}

export const WithPrependIcon: Story = {
  name: '前方 Icon',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <Button text="搜尋" prepend="search" size="md" />
        <Button text="新增" prepend="add" variant="success" size="md" />
        <Button text="下載" prepend="download" variant="alert" size="md" />
      </div>
    `,
  }),
}

export const WithAppendIcon: Story = {
  name: '後方 Icon',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <Button text="下一步" append="arrow-right" size="md" />
        <Button text="重整" append="clean" variant="secondary" size="md" />
      </div>
    `,
  }),
}

export const WithBothIcons: Story = {
  name: '前後都有 Icon',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <Button text="編輯" prepend="pin" append="arrow-right" size="md" />
        <Button text="清除" prepend="add" append="clean" variant="secondary" size="md"/>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  name: '停用狀態',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button },
    template: `
      <div style="display:flex;gap:8px;">
        <Button text="預設" />
        <Button text="停用" :disabled="true" />
        <Button text="停用+Icon" :disabled="true" prepend="close" />
      </div>
    `,
  }),
}

export const AsLink: Story = {
  name: '連結模式',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <Button text="站內連結" href="/about" />
        <Button text="開新分頁" href="https://example.com" :target="true" append="arrow-right" />
        <Button text="停用連結" href="https://example.com" :disabled="true" />
      </div>
    `,
  }),
}

export const SizeWithIcon: Story = {
  name: '不同尺寸 + Icon',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button },
    template: `
      <div style="display:flex;gap:8px;align-items:center;">
        <Button text="XS" size="xs" prepend="add" />
        <Button text="SM" size="sm" prepend="add" />
        <Button text="MD" size="md" prepend="add" />
        <Button text="LG" size="lg" prepend="add" />
      </div>
    `,
  }),
}

export const IconOnly: Story = {
  name: '純 Icon 按鈕',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button },
    template: `
      <div style="display:flex;gap:8px;align-items:center;">
        <Button prepend="search" size="sm" rounded="full" />
        <Button prepend="add" size="md" rounded="full" variant="success" />
        <Button prepend="clean" size="md" rounded="full" variant="alert" />
        <Button prepend="pin" size="lg" rounded="full" variant="secondary" />
      </div>
    `,
  }),
}
