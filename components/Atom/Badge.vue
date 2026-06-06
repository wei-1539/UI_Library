<script setup lang="ts">
import { cva } from 'class-variance-authority'

interface BadgeProps {
    content?: string
    max?: number
    color?: 'pr' | 'sec' | 'success' | 'alert' | 'ad'
    placement?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
    size?: 'md' | 'lg' | 'dot'
    showZero?: boolean
}

const props = withDefaults(defineProps<BadgeProps>(), {
    content: undefined,
    max: 99,
    color: 'alert',
    size: 'md',
    placement: 'top-right',
    showZero: false,
})

const { content, max, color, size, placement } = toRefs(props)

const isNullOrUndefined = computed(() => content.value === undefined || content.value === null)

const invisible = computed(() => !props.showZero && Number(content.value) === 0)

const badgeClasses = cva(
    'absolute inline-flex items-center justify-center text-white font-mono tabular-nums leading-none select-none pointer-events-none transition-transform',
    {
        variants: {
            color: {
                pr: 'bg-pr',
                sec: 'bg-sec',
                success: 'bg-success',
                alert: 'bg-alert',
                ad: 'bg-ad',
            },
            size: {
                dot: 'min-w-[9px] h-[9px] rounded-full p-0',
                md: 'min-w-[20px] h-[20px] rounded-[10px] px-1.5 text-xs',
                lg: 'min-w-[30px] h-[30px] rounded-[15px] px-1.5 text-sm',
            },
            // top-right → badge 右上角騎在邊界上
            // translate-x-1/2  = 往右移 50% 自身寬度（right-0 基礎）
            // -translate-y-1/2 = 往上移 50% 自身高度（top-0 基礎）
            placement: {
                'top-right':    'top-0 right-0  translate-x-1/2  -translate-y-1/2',
                'top-left':     'top-0 left-0  -translate-x-1/2  -translate-y-1/2',
                'bottom-right': 'bottom-0 right-0  translate-x-1/2   translate-y-1/2',
                'bottom-left':  'bottom-0 left-0  -translate-x-1/2   translate-y-1/2',
            },
        },
    },
)
</script>

<template>
    <span class="relative inline-flex">
        <slot />
        <span
            :class="[
                badgeClasses({ color, size, placement }),
                invisible ? 'scale-0' : 'scale-100',
            ]"
        >
            <template v-if="!isNullOrUndefined && size !== 'dot'">
                {{ Number(content) > Number(max) ? `+${max}` : content }}
            </template>
        </span>
    </span>
</template>