<script setup lang="ts">
import { cva } from 'class-variance-authority'

type Size = 'xs' | 'sm' | 'md' | 'lg';
type Variant = 'primary' | 'secondary' | 'success' | 'alert' | 'ad' | 'light';

interface AtomIconProps {
  name?: string;
  size?: Size;
  variant?: Variant;
}

const props = withDefaults(defineProps<AtomIconProps>(), {
  name: undefined,
  size: 'sm',
  variant: undefined,
})

const { name, size, variant } = toRefs(props);

const svgName = computed(() => {
  if (!name.value) return ''
  return name.value.includes('/') ? `#${name.value}` : `#/${name.value}`
})

const iconClasses = cva('inline-block', {
  variants: {
    variant: {
      primary: 'text-pr',
      secondary: 'text-sec',
      success: 'text-success',
      alert: 'text-alert',
      ad: 'text-ad',
      light: 'text-white',
    },
    size: {
      xs: 'size-6',
      sm: 'size-8',
      md: 'size-10',
      lg: 'size-12',
    },
  },
})
</script>

<template>
  <svg class="icon" :class="iconClasses({ size, ...(variant && { variant }) })">
    <use :href="svgName" fill="currentColor" />
  </svg>
</template>