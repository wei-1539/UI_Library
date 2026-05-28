import type { Meta, StoryObj } from '@nuxtjs/storybook'
import Avatar from './Avatar.vue'

const validSrc = 'https://i.pravatar.cc/160?img=12'
const brokenSrc = 'https://example.com/avatar-not-found.png'

const meta = {
  title: 'Atom/Avatar',
  component: Avatar,
  argTypes: {
    src: {
      control: 'text',
      description: '頭像圖片網址',
      table: { type: { summary: 'string' } },
    },
    alt: {
      control: 'text',
      description: '圖片替代文字，也可作為 fallback 文字',
      table: { type: { summary: 'string' } },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 56],
      description: '頭像尺寸，可用預設尺寸或自訂數字（px）',
      table: { type: { summary: "'xs' | 'sm' | 'md' | 'lg' | number" } },
    },
    rounded: {
      control: 'select',
      options: ['full', 'none', 12],
      description: '圓角，可用 full/none 或自訂數字（px）',
      table: { type: { summary: "'full' | 'none' | number" } },
    },
    loading: {
      control: 'radio',
      options: ['lazy', 'eager'],
      description: '圖片載入策略',
      table: { type: { summary: "'lazy' | 'eager'" } },
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    src: validSrc,
    alt: 'W',
    size: 'lg',
    rounded: 'full',
    loading: 'lazy',
  },
}

export const Sizes: Story = {
  name: '尺寸',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Avatar },
    setup: () => ({ validSrc }),
    template: `
      <div style="display:flex;gap:12px;align-items:center;">
        <div style="display:flex;flex-direction:column;align-items:center;">
          <p>xs</p>
          <Avatar :src="validSrc" alt="XS" size="xs" />
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;">
          <p>sm</p>
          <Avatar :src="validSrc" alt="SM" size="sm" />
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;">
          <p>md</p>
          <Avatar :src="validSrc" alt="MD" size="md" />
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;">
          <p>lg</p>
          <Avatar :src="validSrc" alt="LG" size="lg" />
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;">
          <p>56px</p>
          <Avatar :src="validSrc" alt="56" :size="56" />
        </div>
   
      </div>
    `,
  }),
}

export const Rounded: Story = {
  name: '圓角',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Avatar },
    setup: () => ({ validSrc }),
    template: `
      <div style="display:flex;gap:12px;align-items:center;">
        <Avatar :src="validSrc" alt="Full" rounded="full" />
        <Avatar :src="validSrc" alt="None" rounded="none" />
        <Avatar :src="validSrc" alt="12" :rounded="12" />
      </div>
    `,
  }),
}

export const SlotFallback: Story = {
  name: '無 src 時使用 default slot',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Avatar },
    setup: () => ({ validSrc }),
    template: `
      <div>
      不導入 src 時，只用 alt 文字顯示
        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-size:12px;color:#64748b;">無 src -> default slot</span>
          <div style="display:flex;gap:12px;align-items:center;">
            <Avatar alt="WK">
              <span style="font-size:12px;font-weight:700;color:#334155;">WK</span>
            </Avatar>
            <Avatar alt="A" size="sm">
              <span style="font-size:12px;font-weight:700;color:#0f766e;">A</span>
            </Avatar>
          </div>
        </div>
        <div>
          使用 default slot 顯示 icon
          <Avatar :size="40" :rounded="10">
            <span style="font-size:18px;">👤</span>
          </Avatar>
        </div>
      </div>
    `,
  }),
}

export const ImageErrorFallback: Story = {
  name: '有 src 但失敗時使用 fallback slot',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Avatar },
    setup: () => ({ brokenSrc, validSrc }),
    template: `
      <div style="display:flex;gap:20px;align-items:flex-start;flex-wrap:wrap;">
        <div style="display:flex;flex-direction:column;gap:8px;align-items:center;">
          <span style="font-size:12px;color:#64748b;">正常 img（對照）</span>
          <Avatar :src="validSrc" alt="IMG" />
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-size:12px;color:#64748b;">src 失敗 -> fallback / alt</span>
          <div>
            <p>沒有提供 fallback slot</p>
            <Avatar :src="brokenSrc" alt="WEI"/>
          </div>
          <div>
            <p>提供 fallback slot</p>
            <Avatar :src="brokenSrc" alt="B" rounded="none">
              <template #fallback>
                <span style="font-size:12px;color:#be123c;">B</span>
              </template>
            </Avatar>
          </div>
        </div>
      </div>
    `,
  }),
}
