<script setup lang="ts">
import AtomPoppover from '@/components/Atom/Poppover.vue'
import { useMenuKeyboard } from '@/composables/useMenuKeyboard'
type AtomicPopoverProps = ComponentPublicInstance<typeof AtomPoppover>

interface AtomDropdownItem {
    label: string
    value: string
    onClick?(value: string, close: () => void): void
    disabled?: boolean
    context?: any
}

interface AtomDropdownProps {
    items?: AtomDropdownItem[]
    placement?: AtomicPopoverProps['placement']
    offset?: AtomicPopoverProps['offset']
    trigger?: 'click' | 'hover'
    disabled?: boolean
}

const props = withDefaults(defineProps<AtomDropdownProps>(), {
    items: () => [],
    placement: 'bottom-start',
    offset: 8,
})

const active = ref(false)
const close = () => { active.value = false }
const noop = () => {}

// 每個 menu item 的 DOM ref 陣列，交給 useMenuKeyboard 管理
const menuItemRefs = ref<HTMLElement[]>([])

// ── 引入 Layer 3，一行搞定所有鍵盤行為 ──
const { onMenuKeydown, setItemRef } = useMenuKeyboard({
    itemRefs:   menuItemRefs,
    isDisabled: (i) => !!props.items?.[i]?.disabled,
    isOpen:     active,
    onClose:    close,
})

const itemConpose = computed(() => {
    return props.items?.map((item) => {
        const onClick = () => {
            if (item.disabled) return
            if (!item.onClick) { close(); return }

            if (item.onClick.length <= 1) {
                item.onClick(item.value, noop)
                close()
            } else {
                item.onClick(item.value, close)
            }
        }
        return { ...item, onClick }
    })
})
</script>

<template>
    <AtomPoppover
        v-model="active"
        :trigger="trigger"
        :disabled="disabled"
        :placement="placement"
        :offset="offset"
    >
        <template #reference>
            <slot name="trigger" />
        </template>

        <ul
            class="list-none m-0 py-1 min-w-40 bg-white border border-gray-200 rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
            role="menu"
            @keydown="onMenuKeydown"
        >
            <li
                v-for="(item, index) in itemConpose"
                :key="item.value"
                :ref="(el) => setItemRef(el, index)"
                class="px-4 py-2 text-sm text-gray-900 cursor-pointer select-none transition-colors duration-150 outline-none"
                :class="item.disabled ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100 focus:bg-gray-100'"
                role="menuitem"
                :tabindex="item.disabled ? -1 : 0"
                :aria-disabled="item.disabled"
                @click="item.onClick"
            >
                <slot name="menuitem" :context="item.context" :disabled="item.disabled" :label="item.label" :value="item.value">
                    {{ item.label }}
                </slot>
            </li>
        </ul>
    </AtomPoppover>
</template>

