<script setup lang="ts">

interface AtomMarqueeProps {
    text?: string
    speed?: number
    direction?: 'left' | 'right'
    fullWidth?: boolean
}
const props = withDefaults(defineProps<AtomMarqueeProps>(), {
    text: '',
    speed: 50,
    direction: 'left',
    fullWidth: false,
})
const { text, speed, direction, fullWidth } = toRefs(props)
const { $gsap } = useNuxtApp()

const containerRef = ref<HTMLDivElement>()
const copy1Ref = ref<HTMLDivElement>()
const copy2Ref = ref<HTMLDivElement>()
const repeatCount = ref(1)

let tl: gsap.core.Timeline | null = null

const buildAnimation = () => {
    const container = containerRef.value
    const copy1 = copy1Ref.value
    const copy2 = copy2Ref.value
    if (!container || !copy1 || !copy2) return

    // 清掉舊動畫
    if (tl) { tl.kill(); tl = null }

    const containerWidth = container.offsetWidth
    const singleTextWidth = copy1.offsetWidth
    const isLeft = direction.value === 'left'

    if (fullWidth.value) {
        repeatCount.value = Math.max(1, Math.ceil(containerWidth / singleTextWidth))
    } else {
        repeatCount.value = 1
    }

    nextTick(() => {
        const groupWidth = copy1.offsetWidth
        const offset = isLeft ? groupWidth : -groupWidth
        const dur = groupWidth / speed.value

        $gsap.set(copy1, { x: 0 })
        $gsap.set(copy2, { x: offset })

        tl = $gsap.timeline({ repeat: -1 })
        tl.to(copy1, { x: -offset, duration: dur, ease: 'none' }, 0)
          .to(copy2, { x: 0, duration: dur, ease: 'none' }, 0)
    })
}

let ro: ResizeObserver | null = null

onMounted(() => {
    buildAnimation()

    ro = new ResizeObserver(buildAnimation)
    if (containerRef.value) ro.observe(containerRef.value)
})

onUnmounted(() => {
    if (tl) tl.kill()
    if (ro) ro.disconnect()
})
</script>

<template>
    <section
        ref="containerRef"
        class="overflow-hidden relative whitespace-nowrap"
        :class="fullWidth ? 'w-full' : 'max-w-full w-fit'"
        aria-label="跑馬燈"
    >
        <p ref="copy1Ref" class="inline-block" aria-hidden="true">
            <span v-for="i in repeatCount" :key="i">{{ text }}&nbsp;</span>
        </p>
        <p ref="copy2Ref" class="absolute top-0 left-0 inline-block" aria-hidden="true">
            <span v-for="i in repeatCount" :key="i">{{ text }}&nbsp;</span>
        </p>
        <span class="sr-only">{{ text }}</span>
    </section>
</template>