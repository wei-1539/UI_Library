<script setup lang="ts">
interface AtomBreadcrumbProps {
    navList?: Array<{
        text: string;
        to?: string;
        icon?: string;
        iconOnly?: boolean;
    }>;
    separator?: string;
}

const props = withDefaults(defineProps<AtomBreadcrumbProps>(), {
    navList: () => [],
    separator: '/',
});

const { navList, separator } = toRefs(props);

</script>

<template>
<nav>
    <ol class="flex items-center">
        <li v-for="(nav, index) in navList" :key="index" class="flex items-center">
            <AtomButton
                v-if="nav.to"
                :href="nav.to"
                :text="nav.iconOnly ? '' : nav.text"
                :prepend="nav.icon"
                variant="primary"
                size="xs"
                rounded="none"
            />
            <span v-else :class="index === navList.length - 1 ? 'opacity-50 pl-2' : ''">{{ nav.text }}</span>
            <span v-if="index < navList.length - 1" class="text-dt-zh-head-5 text-txt-sup-dark">{{ separator }}</span>
        </li>
    </ol>
</nav>
</template>