import type { Meta, StoryObj } from '@nuxtjs/storybook'
import Avatar from './Avatar.vue'
import AvatarGroup from './AvatarGroup.vue'

const avatars = [
  { src: 'https://i.pravatar.cc/160?img=3', alt: 'Amy' },
  { src: 'https://i.pravatar.cc/160?img=5', alt: 'Ben' },
  { src: 'https://i.pravatar.cc/160?img=8', alt: 'Chris' },
  { src: 'https://i.pravatar.cc/160?img=10', alt: 'Dora' },
  { src: 'https://i.pravatar.cc/160?img=12', alt: 'Evan' },
  { src: 'https://i.pravatar.cc/160?img=15', alt: 'Faye' },
]

const meta = {
  title: 'Atom/AvatarGroup',
  component: AvatarGroup,
  argTypes: {
    max: {
      control: 'number',
      description: '最多顯示幾個 Avatar，超過會顯示 +N',
      table: { type: { summary: 'number' } },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 56],
      description: '套用到群組內所有 Avatar 的尺寸',
      table: { type: { summary: "'xs' | 'sm' | 'md' | 'lg' | number" } },
    },
    rounded: {
      control: 'select',
      options: ['full', 'none', 12],
      description: '套用到群組內所有 Avatar 的圓角',
      table: { type: { summary: "'full' | 'none' | number" } },
    },
  },
} satisfies Meta<typeof AvatarGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    max: 4,
    size: 'lg',
    rounded: 'full',
  },
  render: (args) => ({
    components: { AvatarGroup, Avatar },
    setup: () => ({ args, avatars }),
    template: `
      <AvatarGroup v-bind="args">
        <Avatar
          v-for="person in avatars"
          :key="person.alt"
          :src="person.src"
          :alt="person.alt"
        />
      </AvatarGroup>
    `,
  }),
}

export const MaxVariants: Story = {
  name: '不同 max',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { AvatarGroup, Avatar },
    setup: () => ({ avatars }),
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <AvatarGroup :max="2">
          <Avatar v-for="person in avatars" :key="'m2-' + person.alt" :src="person.src" :alt="person.alt" />
        </AvatarGroup>
        <AvatarGroup :max="4">
          <Avatar v-for="person in avatars" :key="'m4-' + person.alt" :src="person.src" :alt="person.alt" />
        </AvatarGroup>
        <AvatarGroup :max="6">
          <Avatar v-for="person in avatars" :key="'m6-' + person.alt" :src="person.src" :alt="person.alt" />
        </AvatarGroup>
      </div>
    `,
  }),
}

export const SizeAndRounded: Story = {
  name: '尺寸與圓角',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { AvatarGroup, Avatar },
    setup: () => ({ avatars }),
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <AvatarGroup size="sm" rounded="full">
          <Avatar v-for="person in avatars" :key="'sm-' + person.alt" :src="person.src" :alt="person.alt" />
        </AvatarGroup>
        <AvatarGroup size="lg" rounded="none">
          <Avatar v-for="person in avatars" :key="'none-' + person.alt" :src="person.src" :alt="person.alt" />
        </AvatarGroup>
        <AvatarGroup :size="56" :rounded="12">
          <Avatar v-for="person in avatars" :key="'custom-' + person.alt" :src="person.src" :alt="person.alt" />
        </AvatarGroup>
      </div>
    `,
  }),
}
