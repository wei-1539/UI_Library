import type { Meta, StoryObj } from '@nuxtjs/storybook'
import Icon from './Icon.vue'

//抓取路徑上的所有 svg 檔案，回傳一個物件，key 為檔案路徑，value 為檔案內容
const svgModules = import.meta.glob('../../assets/icons/*.svg')
// 路徑洗成乾淨的名稱，並回傳一個陣列
const iconNames = Object.keys(svgModules).map((p) =>
  p.replace('../../assets/icons/', '').replace('.svg', ''),
)

const meta = {
  title: 'Atom/Icon',
  component: Icon,
  argTypes: {
    name: { control: 'text', description: 'Icon 名稱' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Icon 大小',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'alert', 'ad','light'],
      description: '顏色變體',
    },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

// export const Basic: Story = {
//   args: {
//     name: 'add',
//     size: 'md',
//     variant: 'primary',
//   },
// }

export const Gallery: Story = {
  name: 'Icon Overview',
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    components: { Icon },
    setup() {
      // 搜尋
      const search = ref('')
      // 複製
      const copied = ref('')
      // 過濾
      const filtered = computed(() =>
        iconNames.filter((n) => n.includes(search.value.toLowerCase())),
      )
      // 複製
      function copy(name: string) {
        navigator.clipboard.writeText(name)
        copied.value = name
        setTimeout(() => {
          copied.value = ''
        }, 1500)
      }

      return { search, copied, filtered, copy }
    },
    template: `
      <div >
        <input
          v-model="search"
          placeholder="Search icons by name"
          class="w-100 max-w-[400px] px-2 py-3 mb-4 border border-gray-500"
        />
        <p v-if="filtered.length === 0" class="text-gray-500 text-center py-10">
          No icons found for "{{ search }}"
        </p>
        <div
          v-else
          class="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4"
        >
          <div
            v-for="name in filtered"
            :key="name"
            @click="copy(name)"
            class="flex flex-col items-center justify-center gap-2.5 p-4 cursor-pointer border border-gray-500  "
          >
            <Icon :name="name" size="sm" variant="primary" />
            <span class="text-xs text-gray-700 text-center word-break-break-all line-height-1.4">
              {{ copied === name ? '✓ copied!' : name }}
            </span>
          </div>
        </div>
      </div>
    `,
  }),
}
