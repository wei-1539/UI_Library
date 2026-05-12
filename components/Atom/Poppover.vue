<script setup lang="ts">
import { useFloating, autoUpdate, flip, offset as floatingOffset, shift } from '@floating-ui/vue'
type Trigger = 'click' | 'hover' | 'focus' | 'touch'
type Side = 'top' | 'bottom' | 'left' | 'right'
type Alignment = 'start' | 'end'
type Placement = `${Side}-${Alignment}` 

interface PoppoverProps {
    modelValue?: boolean | undefined,
    trigger?: Trigger | Trigger[],
    placement?: Side | Placement ,
    offset?: number | { mainAxis: number, crossAxis: number },
    
}

interface PoppoverEmits {
    (event: 'update:modelValue', value: boolean): void
}

const props = withDefaults(defineProps<PoppoverProps>(), {
    modelValue: undefined,
    trigger: 'click',
    placement: 'bottom',
    offset: 8,
})

const emit = defineEmits<PoppoverEmits>()
// 是否受控
const isControlled = computed(() => props.modelValue !== undefined)
// 是否開啟
const active = ref(props.modelValue ?? false)
// 可寫入的 modelValue
const modelValueWritable = computed({
  get: () => (isControlled.value ? props.modelValue! : active.value),
  set: (value: boolean) => {
    emit('update:modelValue', value)
    active.value = value
  },
})

// popover 定位使用 floating-ui 套件來處理
const referenceRef = ref<HTMLElement | null>(null)
const popoverRef = ref<HTMLElement | null>(null)

const { floatingStyles } = useFloating(referenceRef, popoverRef, {
  open: modelValueWritable,
  placement: () => props.placement,
  whileElementsMounted: autoUpdate,
  middleware: () => [
    floatingOffset(props.offset), 
    flip(), 
    shift()
  ],
});

// 事件處理
const triggerList = (trigger: Trigger | Trigger[]) =>
    Array.isArray(trigger) ? trigger : [trigger]

const onClick = ()=>{
    if(!triggerList(props.trigger).includes('click')) return
    modelValueWritable.value = !modelValueWritable.value
}
const onKeyDown = (event: KeyboardEvent)=>{
    if(!triggerList(props.trigger).includes('click')) return;
    if ((event.target as HTMLElement).tagName === 'BUTTON') return;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    modelValueWritable.value = !modelValueWritable.value
}

const onMouseEnter =  () =>{
    if(!triggerList(props.trigger).includes('hover')) return
    modelValueWritable.value = true
}
const onMouseLeave =  () =>{
    if(!triggerList(props.trigger).includes('hover')) return
    modelValueWritable.value = false
}

const onFocus = () =>{
    if(!triggerList(props.trigger).includes('focus')) return
    modelValueWritable.value = true
}
const onBlur = () =>{
    if(!triggerList(props.trigger).includes('focus')) return
    modelValueWritable.value = false
}

const onTouchStart = () =>{
    if(!triggerList(props.trigger).includes('touch')) return
    modelValueWritable.value = true
}
const onTouchEnd = () =>{
    if(!triggerList(props.trigger).includes('touch')) return
    modelValueWritable.value = false
}
//  點擊外側時，關閉 popover
const onPointerDownOutside = (event: PointerEvent) =>{
    if(!modelValueWritable.value) return
    //整條事件路徑包含 referenceRef 或 popoverRef 則不關閉
    const path = event.composedPath()
    if(path.includes(referenceRef.value as EventTarget) || path.includes(popoverRef.value as EventTarget)) return
    modelValueWritable.value = false
}

const onEscKeydown = (event: KeyboardEvent) =>{
    if (event.key !== 'Escape') return;
    modelValueWritable.value = false;
}

onMounted(() => {
    document.addEventListener('pointerdown', onPointerDownOutside)
    document.addEventListener('keydown', onEscKeydown)
})

onUnmounted(() => {
    document.removeEventListener('pointerdown', onPointerDownOutside)
    document.removeEventListener('keydown', onEscKeydown)
})
</script>

<template>
    <template v-if="$slots.reference">
        <span
        ref="referenceRef"
        class="atomic-popover__reference"
        role="button"
        tabindex="0"
        @click="onClick"
        @keydown="onKeyDown"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @focus="onFocus"
        @blur="onBlur"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd">
            <slot name="reference" />
        </span>
    </template>
    <template v-if="modelValueWritable">
        <Teleport to="body">
            <div ref="popoverRef" class="atomic-popover" :style="floatingStyles">
                <slot />
            </div>
        </Teleport>
    </template>
</template>
