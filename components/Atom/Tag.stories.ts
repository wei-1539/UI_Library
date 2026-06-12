import type { Meta, StoryObj } from '@nuxtjs/storybook'
import Tag from './Tag.vue'

const meta = {
  title: 'Atom/Tag',
  component: Tag,
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outline', 'text'],
      description: '外觀樣式',
      table: {
        type: { summary: "'contained' | 'outline' | 'text'" },
        defaultValue: { summary: 'contained' },
      },
    },
    color: {
      control: 'text',
      description: '預設色系關鍵字，或任意 CSS 色值（如 `#ff6600`、`rgb(0,128,0)`）',
      table: {
        type: { summary: "'primary' | 'secondary' | 'success' | 'alert' | 'ad' | string" },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '尺寸',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' },
      },
    },
    deletable: {
      control: 'boolean',
      description: '是否顯示右側刪除圖示，點擊後觸發 `delete` event',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    onDelete: {
      action: 'delete',
      description: '點擊刪除圖示時觸發',
      table: { type: { summary: '(event: Event) => void' } },
    },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'md',
    deletable: false,
  },
  render: (args) => ({
    components: { Tag },
    setup: () => ({ args }),
    template: `<Tag v-bind="args">標籤文字</Tag>`,
  }),
}

export const Variants: Story = {
  name: '外觀樣式',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Tag },
    template: `
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Tag variant="contained" color="primary">contained</Tag>
          <span style="font-size:12px;color:#64748b;">contained（預設）</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Tag variant="outline" color="primary">outline</Tag>
          <span style="font-size:12px;color:#64748b;">outline</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Tag variant="text" color="primary">text</Tag>
          <span style="font-size:12px;color:#64748b;">text</span>
        </div>
      </div>
    `,
  }),
}

export const Colors: Story = {
  name: '預設色系',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Tag },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <Tag color="primary">primary</Tag>
          <Tag color="secondary">secondary</Tag>
          <Tag color="success">success</Tag>
          <Tag color="alert">alert</Tag>
          <Tag color="ad">ad</Tag>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <Tag variant="outline" color="primary">primary</Tag>
          <Tag variant="outline" color="secondary">secondary</Tag>
          <Tag variant="outline" color="success">success</Tag>
          <Tag variant="outline" color="alert">alert</Tag>
          <Tag variant="outline" color="ad">ad</Tag>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <Tag variant="text" color="primary">primary</Tag>
          <Tag variant="text" color="secondary">secondary</Tag>
          <Tag variant="text" color="success">success</Tag>
          <Tag variant="text" color="alert">alert</Tag>
          <Tag variant="text" color="ad">ad</Tag>
        </div>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  name: '尺寸',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Tag },
    template: `
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Tag size="sm" color="primary">sm</Tag>
          <span style="font-size:12px;color:#64748b;">sm（h-5 / text-xs）</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Tag size="md" color="primary">md</Tag>
          <span style="font-size:12px;color:#64748b;">md（h-6 / text-sm，預設）</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Tag size="lg" color="primary">lg</Tag>
          <span style="font-size:12px;color:#64748b;">lg（h-8 / text-base）</span>
        </div>
      </div>
    `,
  }),
}

export const Deletable: Story = {
  name: '可刪除',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Tag },
    setup() {
      const tags = ref(['Vue', 'TypeScript', 'Tailwind', 'Storybook'])
      const remove = (label: string) => {
        tags.value = tags.value.filter((t) => t !== label)
      }
      return { tags, remove }
    },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap;min-height:40px;">
        <Tag
          v-for="tag in tags"
          :key="tag"
          color="primary"
          :deletable="true"
          @delete="remove(tag)"
        >{{ tag }}</Tag>
        <span v-if="tags.length === 0" style="font-size:13px;color:#94a3b8;">所有標籤都已刪除</span>
      </div>
    `,
  }),
}

export const CustomColor: Story = {
  name: '自定義顏色',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Tag },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <Tag color="#7c3aed">contained #7c3aed</Tag>
          <Tag color="#0ea5e9">contained #0ea5e9</Tag>
          <Tag color="#f59e0b">contained #f59e0b</Tag>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <Tag variant="outline" color="#7c3aed">outline #7c3aed</Tag>
          <Tag variant="outline" color="#0ea5e9">outline #0ea5e9</Tag>
          <Tag variant="outline" color="#f59e0b">outline #f59e0b</Tag>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <Tag variant="text" color="#7c3aed">text #7c3aed</Tag>
          <Tag variant="text" color="#0ea5e9">text #0ea5e9</Tag>
          <Tag variant="text" color="#f59e0b">text #f59e0b</Tag>
        </div>
      </div>
    `,
  }),
}

export const DeletableCustomColor: Story = {
  name: '自定義顏色 + 刪除',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Tag },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <Tag color="#7c3aed" :deletable="true">紫色</Tag>
        <Tag color="#0ea5e9" :deletable="true">天藍</Tag>
        <Tag variant="outline" color="#f59e0b" :deletable="true">琥珀</Tag>
      </div>
    `,
  }),
}
