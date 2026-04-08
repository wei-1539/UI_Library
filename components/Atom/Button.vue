<script setup lang="ts">
import { NuxtLink } from '#components';

interface AtomButtonProps {
  text?: string;
  href?: string;
  target?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<AtomButtonProps>(), {
  text: 'Button',
  href: '',
  target: false,
  disabled: false,
});

const  { text, href, target, disabled } = toRefs(props);

const component = computed(() => {
    if(href.value && !disabled.value) {
        return NuxtLink;
    }
    return 'button';
})
</script>

<template>
  <component 
  :is="component"
  :to="href"
  :href="href"
  :target="target ? '_blank' : '_self'"
  :disabled="disabled"
  >
    <slot>{{ text }}</slot>
  </component>
</template>