<script setup lang="ts">
import { AccordionKey } from './atomAccordionContext'

interface Props {
    /**
     * 在 Accordion 內使用時必填。
     * 這個值用來告訴父層「我是哪一個 item」，
     * 父層的 active 陣列就是靠比對這個 value 來決定誰要展開。
     */
    value?: string | number
    /** 顯示在觸發列的標題文字 */
    title: string
    /** 是否停用，停用後點擊無效 */
    disabled?: boolean
    /**
     * 單獨使用（不在 Accordion 內）時的受控開關。
     * 不傳 → 非受控，元件自己管開關狀態。
     * 傳入 → 受控，開關由外部 v-model 決定。
     */
    modelValue?: boolean
}

interface Emits {
    (event: 'update:modelValue', value: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
    value: undefined,
    disabled: false,
    modelValue: undefined,
})

const emit = defineEmits<Emits>()

/**
 * 嘗試從父層取得 AccordionContext。
 * - 有找到 → 這個 item 被包在 Accordion 裡，開關狀態由父層管
 * - undefined → 獨立使用，自己決定開關邏輯
 *
 * inject 的第二個參數是找不到時的預設值（這裡給 undefined，代表「沒有父層」）
 */
const context = inject(AccordionKey, undefined)

/**
 * 「單獨使用 + 受控」的判斷：
 * 沒有 context（不在 Accordion 內）且外部有傳 modelValue。
 */
const isControlled = computed(() => !context && props.modelValue !== undefined)

/**
 * 「單獨使用 + 非受控」時的內部開關狀態。
 * 有 context 或是受控模式時，這個 ref 完全不會被用到。
 */
const internal = ref(false)

/**
 * 這個 item 是否展開，根據三種情境選擇不同的狀態來源：
 *
 * 1. 有 context（在 Accordion 內）
 *    → 看父層的 active 陣列有沒有包含自己的 value
 *
 * 2. 無 context + 有 modelValue（單獨使用・受控）
 *    → 直接讀外部傳進來的 modelValue（boolean）
 *
 * 3. 無 context + 無 modelValue（單獨使用・非受控）
 *    → 讀自己的 internal ref
 */
const isOpen = computed(() => {
    if (context && props.value !== undefined) {
        return context.active.value.includes(props.value)
    }
    if (isControlled.value) return props.modelValue!
    return internal.value
})

/**
 * 點擊觸發列時的處理，同樣對應三種情境：
 *
 * 1. 有 context → 呼叫父層的 toggle，讓父層決定要開還是關
 *
 * 2. 單獨受控 → 只 emit，不自己改狀態；
 *    父層收到 emit 後更新 v-model，才讓 isOpen 跟著變
 *
 * 3. 單獨非受控 → 直接翻轉 internal
 */
const handleClick = () => {
    if (props.disabled) return

    if (context && props.value !== undefined) {
        context.toggle(props.value)
        return
    }

    if (isControlled.value) {
        emit('update:modelValue', !isOpen.value)
        return
    }

    internal.value = !internal.value
}
</script>

<template>
    <div
        class="border-b border-gray-200 first:border-t"
        :class="{ 'opacity-50': disabled }"
    >
        <button
            type="button"
            :aria-expanded="isOpen"
            :disabled="disabled"
            class="flex w-full cursor-pointer items-center gap-2 px-4 py-4 text-left disabled:cursor-not-allowed"
            @click="handleClick"
        >
            <span class="flex-1 text-base">
                <!-- 預設顯示 title prop，也可以用 #title slot 自訂內容 -->
                <slot name="title">{{ title }}</slot>
            </span>

            <!-- arrow-down icon，開啟時旋轉 180° -->
            <AtomIcon
                name="arrow-down"
                size="xs"
                class="shrink-0 transition-transform duration-200"
                :class="{ 'rotate-180': isOpen }"
            />
        </button>
        <div
            class="grid transition-[grid-template-rows] duration-300 ease-in-out"
            :class="isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
        >
            <div class="overflow-hidden">
                <div class="px-4 pb-4">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
