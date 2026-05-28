<script setup lang="ts">
import { cva } from 'class-variance-authority';

interface AvatarProps {
    size?: 'xs' | 'sm' | 'md' | 'lg'| `${number}` | number;
    src?: string;
    alt?: string;   
    rounded?: 'full' | 'none'| `${number}` | number;
    loading?: 'lazy' | 'eager';
}

const props = withDefaults(defineProps<AvatarProps>(), {
    size: 'lg',
    src: undefined,
    alt: undefined,
    rounded: 'full',
    loading: 'lazy',
})

const { size, src, alt, rounded, loading } = toRefs(props)
const isMounted = ref(false)
const error = ref(false)

const isFallback = computed(() => {
    if (isMounted.value) return error.value
    return false
})

const avatarClasses = cva('', {
    variants: {
        rounded: {
            full: 'rounded-full',
            none: 'rounded-none',
            custom: 'rounded-[var(--avatar-rounded)]',
        },
        size: {
            xs: 'size-6',
            sm: 'size-8',
            md: 'size-10',
            lg: 'size-12',
            custom: 'size-[var(--avatar-size)]',
        },
    },
})

// 判斷圓角類型，是否為自定義圓角
const roundedVariant = computed(() => {
    if (rounded.value === 'full' || rounded.value === 'none') return rounded.value
    return 'custom'
})

// 自定義圓角樣式 類似使用 CSS 變數的方式來設定，代入進 cva 的 style 中
const roundedStyle = computed(() => {
    if (roundedVariant.value !== 'custom') return undefined

    return {
        '--avatar-rounded': `${Number(rounded.value)}px`,
    } as Record<string, string>
})

// 判斷圖片大小類型，是否為自定義大小
const sizeVariant = computed(() => {
    if (size.value === 'xs' || size.value === 'sm' || size.value === 'md' || size.value === 'lg') return size.value
    return 'custom'
})

// 自定義圖片大小樣式 類似使用 CSS 變數的方式來設定，代入進 cva 的 style 中
const sizeStyle = computed(() => {
    if (sizeVariant.value !== 'custom') return undefined

    return {
        '--avatar-size': `${Number(size.value)}px`,
    } as Record<string, string>
})

// 監聽圖片是否載入成功 使用 new Image() 來監聽
onMounted(() => (isMounted.value = true))

if (typeof window !== 'undefined') {
    watch(
        () => props.src,
        (value) => {
            if (!value) {
                error.value = false
                return
            }

            const img = new Image()
            img.onload = () => (error.value = false)
            img.onerror = () => (error.value = true)
            img.src = value
        },
        { immediate: true },
    )
}
</script>

<template>
    <span
        class="overflow-hidden flex items-center justify-center"
        :class="avatarClasses({ rounded: roundedVariant, size: sizeVariant })"
        :style="{ ...roundedStyle, ...sizeStyle }"
    >
        <template v-if="src">
            <template v-if="isFallback">
                <slot name="fallback">
                    <slot name="default">
                        {{ alt }}
                    </slot>
                </slot>
            </template>
            <img
                v-else
                class="object-cover w-full h-full aspect-square"
                :src="src"
                :alt="alt"
                :loading="loading"
                :height="size"
                :width="size"
            >
        </template>
        <template v-else>
            <slot name="default"/>
        </template>
    </span>
</template>