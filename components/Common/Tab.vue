<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import { cva } from 'class-variance-authority'
import { useRovingFocus } from '@/composables/useRovingFocus'

type Size = 'sm' | 'md' | 'lg'
type Variant = 'line' | 'pill' | 'card'

// 個別項目資料
interface TabItem {
    label: string
    value: string
    disabled?: boolean
    icon?: string
}

// 元件 props
interface AtomTabProps {
    /**
     * 當前選中的項目
     * @type {string}
     */
    current?: string
    /**
     * 項目列表
     * @type {TabItem[]}
     */
    items?: TabItem[]
 
    variant?: Variant
    size?: Size
    fullWidth?: boolean
}

const props = withDefaults(defineProps<AtomTabProps>(), {
    current: '',
    items: () => [],
    variant: 'line',
    size: 'md',
    fullWidth: false,
})

const emit = defineEmits<{
    'update:current': [value: string]
}>()

const { current, items, variant, size, fullWidth } = toRefs(props)

const tabRefs = ref<HTMLElement[]>([])

// useRovingFocus：只負責方向鍵移動焦點，Tab 用水平模式（Left/Right）
const { onKeydown, setItemRef: setTabRef } = useRovingFocus({
    itemRefs:   tabRefs,
    isDisabled: (i) => !!items.value[i]?.disabled,
    orientation: 'horizontal',
})

// 當前選中的項目索引
const activeIndex = computed(() =>
    items.value.findIndex((item) => item.value === current.value),
)

// 選擇項目
function select(item: TabItem) {
    if (item.disabled) return
    emit('update:current', item.value)
}

// Tab 與 Dropdown 不同：焦點移動的同時也要 select
// 所以在 useRovingFocus 移動焦點後，額外發出 update:current
function onTabKeydown(e: KeyboardEvent) {
    const before = document.activeElement
    onKeydown(e)
    // 等下一個 frame 確認焦點是否真的移動了
    requestAnimationFrame(() => {
        const after = document.activeElement
        if (after === before) return
        const focusedIndex = tabRefs.value.findIndex((el) => el === after)
        if (focusedIndex !== -1) select(items.value[focusedIndex])
    })
}

// ── indicator 位置追蹤（僅 line variant） ──
/*
 計算底部滑動指示條的位置和寬度
 當前選中的項目索引變更時，更新指示條的位置和寬度，並設定指示條的透明度為 1
 未選中時，指示條透明度為 0
 */
const indicatorStyle = ref<Record<string, string>>({})

function updateIndicator() {
    if (variant.value !== 'line') return
    const idx = activeIndex.value
    if (idx === -1 || !tabRefs.value[idx]) {
        indicatorStyle.value = { opacity: '0' }
        return
    }
    const el = tabRefs.value[idx]
    indicatorStyle.value = {
        width: `${el.offsetWidth}px`,
        transform: `translateX(${el.offsetLeft}px)`,
        opacity: '1',
    }
}

// 監聽當前選中的項目索引和項目列表，當變更時，更新指示條的位置和寬度
watch([activeIndex, items], () => nextTick(updateIndicator), { immediate: true })
// 掛載時，更新指示條的位置和寬度，避免初始化時，指示條位置和寬度為 0
onMounted(updateIndicator)

// ── cva 樣式 ──
const wrapperClass = cva('relative flex', {
    variants: {
        variant: {
            line: 'border-b border-gray-200 gap-0',
            pill: 'gap-1 rounded-lg bg-gray-100 p-1',
            card: 'gap-0',
        },
        fullWidth: {
            true: 'w-full',
            false: 'w-fit',
        },
    },
})

const tabClass = cva(
    'justify-center whitespace-nowrap transition-colors duration-200',
    {
        variants: {
            variant: {
                line: 'bg-transparent relative',
                pill: 'rounded-md',
                card: 'border border-gray-200 -ml-px first:ml-0 first:rounded-l-md last:rounded-r-md',
            },
            active: {
                true: '',
                false: '',
            },
            fullWidth: {
                true: 'flex-1',
                false: '',
            },
        },
        compoundVariants: [
            // line
            { variant: 'line', active: true, class: 'text-pr' },
            { variant: 'line', active: false, class: 'text-txt-light hover:text-pr' },
            // pill
            { variant: 'pill', active: true, class: 'bg-white text-pr shadow-sm' },
            { variant: 'pill', active: false, class: 'text-txt-light hover:text-txt' },
            // card
            { variant: 'card', active: true, class: 'bg-white text-pr border-b-white z-[1]' },
            { variant: 'card', active: false, class: 'bg-gray-50 text-txt-light hover:bg-gray-100' },
        ],
    },
)

const buttonSizeMap: Record<Size, 'xs' | 'sm' | 'md' | 'lg'> = { sm: 'sm', md: 'md', lg: 'lg' }
</script>

<template>
    <div
        role="tablist"
        :class="wrapperClass({ variant, fullWidth })"
    >
        <AtomButton
            v-for="(item, index) in items"
            :key="item.value"
            :ref="(el: any) => setTabRef(el, index)"
            role="tab"
            :aria-selected="item.value === current"
            :tabindex="item.value === current ? 0 : -1"
            :text="item.label"
            :prepend="item.icon"
            :size="buttonSizeMap[size]"
            rounded="none"
            :disabled="!!item.disabled"
            :class="tabClass({
                variant,
                active: item.value === current,
                fullWidth,
            })"
            @click="select(item)"
            @keydown="onTabKeydown"
        />

        <!-- line variant 底部滑動指示條 -->
        <span
            v-if="variant === 'line'"
            class="absolute bottom-0 left-0 h-0.5 bg-pr transition-all duration-300 ease-in-out"
            :style="indicatorStyle"
        />
    </div>
</template>
