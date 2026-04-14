<script setup lang="ts" >
import {cva} from 'class-variance-authority'

interface AtomIconProps {
    name?: string;
    size?: string;
    variant?: string;
}

const props = withDefaults(defineProps<AtomIconProps>(), {
    name: undefined,
    size: 'sm',
    variant: 'primary',
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
        }
    }
})
</script>

<template>
  <svg class="icon" :class="iconClasses({ size: size as 'xs' | 'sm' | 'md' | 'lg', variant: variant as 'primary' | 'secondary' | 'success' | 'alert' | 'ad' })">
    <use :href="svgName" fill="currentColor" />
  </svg>
</template>