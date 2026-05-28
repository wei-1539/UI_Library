<script setup lang="ts">

import { AccordionKey } from './atomAccordionContext'

interface Props {
    /**
     * 目前展開的 item value。
     * - 單選時傳 string | number
     * - 多選時傳 (string | number)[]
     * - 不傳 → 非受控模式，元件自己管狀態
     */
    modelValue?: string | number | (string | number)[]
    /** 是否允許同時展開多個 item，預設 false（單選） */
    multiple?: boolean
}

interface Emits {
    (event: 'update:modelValue', value: string | number | (string | number)[]): void
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: undefined,
    multiple: false,
})

const emit = defineEmits<Emits>()

/**
 * 統一把外部傳進來的 modelValue 轉成陣列格式，方便內部統一用陣列處理。
 * 單選傳 'a'       → ['a']
 * 多選傳 ['a','b'] → ['a','b']
 * 沒傳             → []
 */
const toArray = (val: string | number | Array<string | number> | undefined): Array<string | number> => {
    if (val === undefined || val === null) return []
    // 如果 val 是陣列，則返回 val
    // 如果 val 不是陣列，則返回 [val] Ex:單一值
    return Array.isArray(val) ? val : [val]
}

/**
 * 受控模式判斷：外部有沒有傳 modelValue。
 * - 有傳 → 受控（controlled）：狀態由外部決定，toggle 只負責 emit
 * - 沒傳 → 非受控（uncontrolled）：狀態由 active 這個 ref 自己管
 */
const isControlled = computed(() => props.modelValue !== undefined)

/** 內部維護的展開清單，初始值從 modelValue 來 */
const active = ref<Array<string | number>>(toArray(props.modelValue))

/**
 * 受控模式下，外部更新 modelValue 時（例如父層改了 v-model 綁的變數），
 * 這裡把最新值同步進 active，讓 provide 出去的資料也跟著更新。
 */
watch(
    () => props.modelValue,
    (val) => {
        active.value = toArray(val)
    },
)

/**
 * 子元件（AccordionItem）點擊時會呼叫這個函式，傳入自己的 value。
 *
 * 多選：value 不在清單 → 加入；已在清單 → 移除
 * 單選：value 不在清單 → 設為唯一開啟；已在清單 → 全部收起（toggle off）
 */
const toggle = (value: string | number) => {
    const index = active.value.indexOf(value)
    let next: Array<string | number>

    if (props.multiple) {
        next = [...active.value]
        if (index === -1) next.push(value)
        else next.splice(index, 1)
    } else {
        next = index === -1 ? [value] : []
    }

    /**
     * 非受控：直接更新 active，畫面立刻反應。
     * 受控：不動 active，只 emit。等父層更新 modelValue 後，
     *       上面的 watch 才會把新值同步進來。
     *       這樣可以確保「唯一的狀態來源」是父層的變數，不是這個 ref。
     */
    if (!isControlled.value) {
        active.value = next
    }

    // 單選 emit 單一值（或 '' 代表全收），多選 emit 陣列
    emit('update:modelValue', props.multiple ? next : next[0] ?? '')
}

/**
 * 把 active 跟 toggle 透過 provide 往下傳，
 * 所有子孫層的 AccordionItem 都能 inject 到，不需要逐層 props 傳遞。
 */
provide(AccordionKey, { active, toggle })
</script>

<template>
    <section class="atom-accordion">
        <slot />
    </section>
</template>
