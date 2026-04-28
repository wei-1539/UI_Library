import type { Meta, StoryObj } from '@nuxtjs/storybook'
import Breadcrumb from './Breadcrumb.vue'

const meta = {
  title: 'Atom/Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    navList: { control: 'object', description: '麵包屑陣列' },
    separator: { control: 'text', description: '分隔符號' },
  },
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    navList: [
      { text: 'Home', to: '/' },
      { text: 'About', to: '/about' },
      { text: 'Contact' },
    ],
    separator: '/',
  },
}

export const WithIcon: Story = {
  name: 'Icon 麵包屑',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Breadcrumb },
    setup() {
      const navList = [
        { text: 'Home', to: '/', icon: 'add' },
        { text: 'About', to: '/about', icon: 'add' },
        { text: 'Contact' },
      ]
      return { navList }
    },
    template: `
      <Breadcrumb :nav-list="navList" separator=">" />
    `,
  }),
}

export const WithIconOnly: Story = {
  name: 'Icon Only 麵包屑',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Breadcrumb },
    setup() {
      const navList = [
        { text: 'Home', to: '/', icon: 'add', iconOnly: true },
        { text: 'About', to: '/about', icon: 'clean', iconOnly: true },
        { text: 'Contact' },
      ]
      return { navList }
    },
    template: `
      <Breadcrumb :nav-list="navList" separator=">" />
    `,
  }),
}

export const separator: Story = {
  name: '變換分隔符號',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Breadcrumb },
    setup() {
      const navList = [
        { text: 'Home', to: '/', icon: 'add' },
        { text: 'About', to: '/about', icon: 'add' },
        { text: 'Contact' },
      ]
      return { navList }
    },
    template: `
      <Breadcrumb :nav-list="navList" separator="---" />
    `,
  }),
}