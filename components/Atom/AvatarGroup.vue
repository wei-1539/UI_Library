<script setup lang="ts">
import { cloneVNode, computed, Fragment, h, type Slot, type VNode } from 'vue'
import AtomAvatar from './Avatar.vue'

interface AtomAvatarGroupProps {
    max?: number;
    size?: 'xs' | 'sm' | 'md' | 'lg'| `${number}` | number;
    rounded?: 'full' | 'none'| `${number}` | number;
}

interface AtomAvatarGroupSlots {
  default?: () => ReturnType<Slot>;
}

const props = withDefaults(defineProps<AtomAvatarGroupProps>(), {
    max: 4,
    size: 'lg',
    rounded: 'full',
})

const slots = defineSlots<AtomAvatarGroupSlots>();

const resolveSlotChildren = (nodes: VNode[] | undefined) => {
  // slot 可能為空，直接返回
  if (!nodes) return null;

  return nodes
    .map(node => {
      // Fragment 是無實體 DOM 的容器，先把裡面的 children 拆出來
      if (node.type === Fragment) return node.children;
      // 忽略註解、文字與原生標籤，只保留元件節點（這裡主要是 Avatar）
      if (
        node.type === Comment ||
        node.type === Text ||
        node.type === 'svg' ||
        typeof node.type === 'string'
      )
        return;

      return node;
    })
    .flat()
    .filter(Boolean) as VNode[];
}

const children = computed(() => resolveSlotChildren(slots.default?.()));

const DefaultVNode = computed(() => {
  const nodes = children.value;
  if (!nodes) return;

  const length = nodes.length;
  const sharedProps = { size: props.size, rounded: props.rounded };

  let max = Number(props.max);
  if (Number.isNaN(max) || max < 1) max = 1;

  const visibleNodes = nodes.slice(0, max);
  // cloneVNode: 以原本 Avatar 節點為基礎，補上群組共用樣式與層級
  const cloned = visibleNodes
    .map((node, index) =>
      cloneVNode(node, {
        ...sharedProps,
        class: 'relative border-2 border-white -mr-3 first:mr-0',
        style: { zIndex: visibleNodes.length - index },
      }),
    )
    .reverse();

  if (length > max) {
    // h: 動態建立一個新的 Avatar 節點，內容顯示超出的數量（+N）
    const ellipsis = h(
      AtomAvatar,
      {
        ...sharedProps,
        class: 'relative border-2 border-white -mr-3 first:mr-0 bg-gray-200 text-gray-700',
        style: { zIndex: 0 },
      },
      () => `+${length - max}`,
    );
    cloned.unshift(ellipsis);
  }

  return h(Fragment, cloned);
});
</script>

<template>
    <div class="flex items-center flex-row-reverse justify-end">
        <component :is="DefaultVNode" />
    </div>
</template>