<script setup lang="ts">
import { cva } from 'class-variance-authority'

interface TagProps {
  variant?: 'outline' | 'text' | 'contained'
  color?: 'primary' | 'secondary' | 'success' | 'alert' | 'ad' | string
  size?: 'sm' | 'md' | 'lg'
  deletable?: boolean
}

interface AtomicChipEmits {
  (event: 'delete', value: Event): void
}

const emit = defineEmits<AtomicChipEmits>()

const props = withDefaults(defineProps<TagProps>(), {
  variant: 'contained',
  color: 'primary',
  size: 'md',
  deletable: false,
})

const { variant, color, size, deletable } = toRefs(props)

// 判斷是否為預設色系，決定走 Tailwind class 還是 inline style 路徑
type PresetColor = 'primary' | 'secondary' | 'success' | 'alert' | 'ad'
const PRESET_COLORS: PresetColor[] = ['primary', 'secondary', 'success', 'alert', 'ad']

const isPreset = computed(() => PRESET_COLORS.includes(color.value as PresetColor))

// 預設色：刪除 icon hover 時對應的背景 class（Tailwind 無法動態組字，需要靜態對應表）
const deleteHoverBgClass = computed(() => {
  if (!isPreset.value) return ''
  const map: Record<PresetColor, string> = {
    primary: 'hover:bg-pr',
    secondary: 'hover:bg-sec',
    success: 'hover:bg-success',
    alert: 'hover:bg-alert',
    ad: 'hover:bg-ad',
  }
  return map[color.value as PresetColor]
})

// 自定義色：Tailwind class 無法處理任意色值，改用 JS 追蹤 hover 狀態再套 inline style
const isDeleteHovered = ref(false)
const deleteHoverStyle = computed(() => {
  if (isPreset.value || !isDeleteHovered.value) return undefined
  return { backgroundColor: color.value }
})

// 自定義色：各 variant 對應的 inline style（等同 preset 的 compoundVariants 效果）
const customStyle = computed(() => {
  if (isPreset.value) return undefined
  const c = color.value
  // color-mix 模擬 Tailwind bg-[color]/10 效果，讓背景與文字色保持一致的視覺邏輯
  if (variant.value === 'contained') return { backgroundColor: `color-mix(in srgb, ${c} 10%, transparent)`, color: c }
  if (variant.value === 'outline') return { borderColor: c, color: c }
  return { color: c }
})

const tagClass = cva(
  'inline-flex items-center gap-0.5 font-medium leading-none select-none whitespace-nowrap',
  {
    variants: {
      variant: {
        contained: '',
        outline: 'border bg-transparent',
        text: '',
      },
      color: {
        primary: '',
        secondary: '',
        success: '',
        alert: '',
        ad: '',
      },
      size: {
        sm: 'h-5 px-1.5 text-xs rounded',
        md: 'h-6 px-2 text-sm rounded-md',
        lg: 'h-8 px-3 text-base rounded-md',
      },
    },
    compoundVariants: [
      // contained
      { variant: 'contained', color: 'primary',   class: 'bg-pr/10 text-pr' },
      { variant: 'contained', color: 'secondary',  class: 'bg-sec/10 text-sec' },
      { variant: 'contained', color: 'success',    class: 'bg-success/10 text-success' },
      { variant: 'contained', color: 'alert',      class: 'bg-alert/10 text-alert' },
      { variant: 'contained', color: 'ad',         class: 'bg-ad/10 text-ad' },
      // outline
      { variant: 'outline', color: 'primary',   class: 'border-pr text-pr' },
      { variant: 'outline', color: 'secondary',  class: 'border-sec text-sec' },
      { variant: 'outline', color: 'success',    class: 'border-success text-success' },
      { variant: 'outline', color: 'alert',      class: 'border-alert text-alert' },
      { variant: 'outline', color: 'ad',         class: 'border-ad text-ad' },
      // text
      { variant: 'text', color: 'primary',   class: 'text-pr' },
      { variant: 'text', color: 'secondary',  class: 'text-sec' },
      { variant: 'text', color: 'success',    class: 'text-success' },
      { variant: 'text', color: 'alert',      class: 'text-alert' },
      { variant: 'text', color: 'ad',         class: 'text-ad' },
    ],
  },
)
</script>

<template>
  <span
    :class="tagClass({ variant, color: isPreset ? (color as PresetColor) : undefined, size })"
    :style="customStyle"
  >
    <slot />
    <AtomIcon
      v-if="deletable"
      name="close-bold"
      size="xs"
      :class="['cursor-pointer rounded-full transition-all duration-150 hover:text-white p-0.5', deleteHoverBgClass]"
      :style="deleteHoverStyle"
      @mouseenter="isDeleteHovered = true"
      @mouseleave="isDeleteHovered = false"
      @click="emit('delete', $event)"
    />
  </span>
</template>
