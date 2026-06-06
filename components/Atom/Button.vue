<script setup lang="ts">
import { cva } from 'class-variance-authority';
import { NuxtLink } from '#components';

type Size = 'xs' | 'sm' | 'md' | 'lg';
type Variant = 'primary' | 'secondary' | 'success' | 'alert' | 'ad' | 'light';
type Rounded = 'sm' | 'md' | 'lg' | 'full' | 'none';

interface AtomButtonProps {
  text?: string;
  href?: string;
  target?: boolean;
  disabled?: boolean;
  prepend?: string;
  append?: string;
  size?: Size;
  variant?: Variant;
  rounded?: Rounded;
}

const props = withDefaults(defineProps<AtomButtonProps>(), {
  text: '',
  href: '',
  target: false,
  disabled: false,
  prepend: '',
  append: '',
  size: 'md',
  variant: 'primary',
  rounded: 'md',
});

const { text, href, target, disabled, prepend, append, size, variant, rounded } = toRefs(props);

// 判斷是否為連結
const component = computed(() => {
  if (href.value && !disabled.value) return NuxtLink;
  return 'button';
});

// icon 比按鈕小一階
const iconSizeMap: Record<Size, Size> = {
  xs: 'xs',
  sm: 'xs',
  md: 'xs',
  lg: 'md',
};
const iconSize = computed(() => iconSizeMap[size.value]);

const buttonClass = cva('inline-flex items-center gap-1 transition-colors duration-150', {
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
      xs: 'h-6 px-2 text-sm',
      sm: 'h-8 px-3 text-md',
      md: 'h-10 px-4 text-lg',
      lg: 'h-12 px-5 text-xl',
    },
    rounded: {
      sm: 'rounded-sm border border-gray-300',
      md: 'rounded-md border border-gray-300',
      lg: 'rounded-lg border border-gray-300',
      full: 'rounded-full border border-gray-300',
      none: 'rounded-none',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed pointer-events-none',
      false: '',
    },
  },
  compoundVariants: [
    { disabled: false, variant: 'primary', class: 'hover:bg-pr/10 active:bg-pr/20' },
    { disabled: false, variant: 'secondary', class: 'hover:bg-sec/10 active:bg-sec/20' },
    { disabled: false, variant: 'success', class: 'hover:bg-success/10 active:bg-success/20' },
    { disabled: false, variant: 'alert', class: 'hover:bg-alert/10 active:bg-alert/20' },
    { disabled: false, variant: 'ad', class: 'hover:bg-ad/10 active:bg-ad/20' },
    { disabled: false, variant: 'light', class: 'hover:bg-white/10 active:bg-white/20' },
  ],
});
</script>

<template>
  <component
    :is="component"
    :to="href || undefined"
    :href="href || undefined"
    :target="target ? '_blank' : '_self'"
    :disabled="disabled"
    :class="buttonClass({ variant, size, rounded, disabled })"
  >
    <slot name="prepend">
      <AtomIcon v-if="prepend" :name="prepend" :size="iconSize" />
    </slot>

    <slot>{{ text }}</slot>

    <slot name="append">
      <AtomIcon v-if="append" :name="append" :size="iconSize" />
    </slot>
  </component>
</template>
