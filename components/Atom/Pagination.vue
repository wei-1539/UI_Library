<script setup lang="ts">
type PageItem = number | 'ellipsis'
type Layout = 'default' | 'change'

interface AtomPaginationProps {
    currentPage?: number
    perPage?: number
    total?: number
    totalPage?: number
    siblingsCount?: number // 當前頁碼左右各顯示幾頁
    boundaryCount?: number // 開頭結尾固定顯示幾頁
    layout?: Layout        // 'change' 時左側顯示每頁筆數下拉選單
    perPageOptions?: number[]
}

const props = withDefaults(defineProps<AtomPaginationProps>(), {
    currentPage: 1,
    perPage: 10,
    total: 0,
    totalPage: undefined,
    siblingsCount: 1,
    boundaryCount: 1,
    layout: 'default',
    perPageOptions: () => [5, 10, 25, 50],
})

const emit = defineEmits<{
    'update:currentPage': [page: number]
    'update:perPage': [size: number]
}>()

const { currentPage, perPage, total, totalPage, siblingsCount, boundaryCount, layout, perPageOptions } = toRefs(props)

const isChangeLayout = computed(() => layout.value === 'change')

// 內部 perPage，讓元件即使沒綁 v-model:perPage 也能正常運作
const internalPerPage = ref(props.perPage)
watch(perPage, (val) => { internalPerPage.value = val })

// 推算總筆數：有傳 total 就用，沒有就從 totalPage × 初始 perPage 反推
const totalItems = computed(() => {
    if (total.value > 0) return total.value
    return (totalPage.value ?? 1) * perPage.value
})

const pageCount = computed(() => {
    // change 模式：一定從 totalItems / internalPerPage 即時算
    if (isChangeLayout.value) {
        return Math.ceil(totalItems.value / internalPerPage.value) || 1
    }
    // default 模式：優先用 totalPage 原值
    if (totalPage.value !== undefined) return totalPage.value
    return Math.ceil(totalItems.value / internalPerPage.value) || 1
})

function onPerPageChange() {
    emit('update:perPage', internalPerPage.value)
    emit('update:currentPage', 1)
}

// range(3, 7) → [3, 4, 5, 6, 7] 
// 取出 start 到 end ，中間的數字
function range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

/**
 * ============================
 * 頁碼顯示演算法（三步驟）
 * ============================
 *
 * 情境：pageCount=20, currentPage=10, siblingsCount=1, boundaryCount=1
 *
 * 【Step 1】收集「一定要顯示」的頁碼
 *   - 左 boundary  → [1]
 *   - 右 boundary  → [20]
 *   - siblings     → [9, 10, 11]
 *   Set 自動去重 → {1, 9, 10, 11, 20}
 *
 * 【Step 2】排序
 *   → [1, 9, 10, 11, 20]
 *
 * 【Step 3】掃描相鄰頁碼的「間距」，決定要不要插省略號
 *   1→9  差 8 → 插 '...'
 *   9→10 差 1 → 相鄰，什麼都不插
 *   10→11 差 1 → 相鄰
 *   11→20 差 9 → 插 '...'
 *
 *   最終 → [1, '...', 9, 10, 11, '...', 20]
 *
 * 特殊處理：間距剛好 = 2 時（例如 [1, 3]），
 * 直接補上中間那頁（→ [1, 2, 3]），而不是放省略號，
 * 因為 "1 ... 3" 跟 "1 2 3" 佔一樣寬，放省略號反而奇怪。
 */
const visiblePages = computed<PageItem[]>(() => {
    const total = pageCount.value
    const current = currentPage.value
    const sib = siblingsCount.value
    const bound = boundaryCount.value

    // Step 1：收集三組「一定要顯示」的頁碼
    const leftBoundary  = range(1, Math.min(bound, total))
    const rightBoundary = range(Math.max(1, total - bound + 1), total)
    const siblings      = range(Math.max(1, current - sib), Math.min(total, current + sib))

    // Step 2：合併去重 + 排序
    const sorted = [...new Set([...leftBoundary, ...rightBoundary, ...siblings])]
        .sort((a, b) => a - b)

    // Step 3：掃描間距，決定插「頁碼」還是「省略號」
    const result: PageItem[] = []

    for (let i = 0; i < sorted.length; i++) {
        if (i > 0) {
            const gap = sorted[i] - sorted[i - 1]
            if (gap === 2) result.push(sorted[i - 1] + 1)
            else if (gap > 2) result.push('ellipsis')
        }
        result.push(sorted[i])
    }

    return result
})

function goToPage(page: number) {
    if (page < 1 || page > pageCount.value || page === currentPage.value) return
    emit('update:currentPage', page)
}
</script>

<template>
    <nav aria-label="pagination" class="flex items-center" :class="isChangeLayout ? 'gap-2' : ''">
        <!-- 左側：每頁筆數下拉選單 -->
        <div v-if="isChangeLayout" class="flex items-center gap-2">
            <select
                v-model.number="internalPerPage"
                class="h-8 rounded-md border border-gray-400 bg-transparent px-2 text-sm text-txt-sup-dark cursor-pointer outline-none"
                @change="onPerPageChange"
            >
                <option
                    v-for="opt in perPageOptions"
                    :key="opt"
                    :value="opt"
                >
                    每頁 {{ opt }} 筆
                </option>
            </select>
        </div>

        <!-- 右側：頁碼 -->
        <ul class="flex items-center gap-1">
            <li>
                <AtomButton
                    prepend="arrow_back"
                    size="xs"
                    rounded="none"
                    :disabled="currentPage === 1"
                    @click="goToPage(currentPage - 1)"
                />
            </li>

            <li v-for="(item, index) in visiblePages" :key="index">
                <AtomButton
                    v-if="item === 'ellipsis'"
                    text="…"
                    size="xs"
                    rounded="none"
                    disabled
                />
                <AtomButton
                    v-else
                    :text="String(item)"
                    size="xs"
                    rounded="none"
                    :variant="item === currentPage ? 'primary' : undefined"
                    :disabled="item === currentPage"
                    @click="goToPage(item as number)"
                />
            </li>

            <li>
                <AtomButton
                    prepend="arrow_front"
                    size="xs"
                    rounded="none"
                    :disabled="currentPage === pageCount"
                    @click="goToPage(currentPage + 1)"
                />
            </li>
        </ul>
    </nav>
</template>
