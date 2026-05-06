<script setup lang="ts">

const navList = [
  { text: 'Home', to: '/' ,icon: 'add',iconOnly: true},
  { text: 'About',to: '/about' },
  { text: 'Contact',  },
]

const marqueeText = ref('Lorem ipsum dolor sit amet consectetur adipisicing elit. 1Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. 2Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. 3Quisquam, quos.')
const size = ref(10)
const activeControlled = ref(false)
</script>

<template>
  <div class="min-h-screen bg-gray-200 p-10 font-sans">
    <AtomButton text="Button" prepend="add" append="add" />
    <AtomIcon name="add" size="sm" variant="primary" />
    <AtomBreadcrumb :nav-list="navList"  />
    <AtomPagination v-model:per-page="size" :current-page="6" :total-page="100" layout="change" />
    <CommonMarquee :text="marqueeText" :speed="100" />
    <section class="mb-8 rounded-lg border border-gray-300 bg-white p-4">
      <h2 class="mb-3 text-dt-zh-head-3">Popover 實際範例：卡片更多操作</h2>
      <p class="mb-3 text-dt-zh-body-2 text-txt-light">同一個情境，左邊是受控，右邊是非受控。</p>
      <div class="mb-3 flex gap-2">
        <button
          type="button"
          class="rounded border border-gray-300 bg-white px-3 py-1 text-sm cursor-pointer"
          @click="activeControlled = true"
        >
          外部打開受控選單
        </button>
        <button
          type="button"
          class="rounded border border-gray-300 bg-white px-3 py-1 text-sm cursor-pointer"
          @click="activeControlled = false"
        >
          外部關閉受控選單
        </button>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-lg border border-gray-200 bg-white p-4">
          <p class="mb-2 text-dt-zh-body-2 font-semibold">受控（有 v-model）</p>
          <div class="mb-3 flex items-start justify-between">
            <div>
              <p class="text-dt-zh-body-1 font-semibold">Wei Chen</p>
              <p class="text-dt-zh-body-2 text-txt-light">@wei0713</p>
            </div>
            <CommonPoppover v-model="activeControlled" placement="bottom-end" :offset="8">
              <template #reference>
                <button type="button" class="rounded border border-gray-300 px-2 py-1 text-sm">⋯</button>
              </template>
              <div class="min-w-[140px] space-y-1">
                <button type="button" class="block w-full rounded px-3 py-1 text-left text-sm hover:bg-gray-100">編輯資料</button>
                <button type="button" class="block w-full rounded px-3 py-1 text-left text-sm hover:bg-gray-100">分享連結</button>
                <button type="button" class="block w-full rounded px-3 py-1 text-left text-sm text-red-600 hover:bg-gray-100">刪除帳號</button>
              </div>
            </CommonPoppover>
          </div>
          <p class="text-dt-zh-body-2 text-txt-light">外部狀態：{{ activeControlled ? '開啟' : '關閉' }}</p>
        </div>
        <div class="rounded-lg border border-gray-200 bg-white p-4">
          <p class="mb-2 text-dt-zh-body-2 font-semibold">非受控（沒有 v-model）</p>
          <div class="mb-3 flex items-start justify-between">
            <div>
              <p class="text-dt-zh-body-1 font-semibold">Dylan Lan</p>
              <p class="text-dt-zh-body-2 text-txt-light">@dylan</p>
            </div>
            <CommonPoppover placement="bottom-end" :offset="8">
              <template #reference>
                <button type="button" class="rounded border border-gray-300 px-2 py-1 text-sm">⋯</button>
              </template>
              <div class="min-w-[140px] space-y-1">
                <button type="button" class="block w-full rounded px-3 py-1 text-left text-sm hover:bg-gray-100">編輯資料</button>
                <button type="button" class="block w-full rounded px-3 py-1 text-left text-sm hover:bg-gray-100">分享連結</button>
                <button type="button" class="block w-full rounded px-3 py-1 text-left text-sm text-red-600 hover:bg-gray-100">刪除帳號</button>
              </div>
            </CommonPoppover>
          </div>
          <p class="text-dt-zh-body-2 text-txt-light">父層沒有狀態可控制，開關由元件內部處理。</p>
        </div>
      </div>
    </section>
    <!-- Colors -->
    <section class="mb-10">
      <h2 class="text-dt-zh-head-2 mb-4">Colors</h2>
      <div class="flex flex-wrap gap-3">
        <div class="rounded-lg bg-pr px-4 py-2 text-white text-dt-zh-body-2">pr</div>
        <div class="rounded-lg bg-sec px-4 py-2 text-white text-dt-zh-body-2">sec</div>
        <div class="rounded-lg bg-success px-4 py-2 text-white text-dt-zh-body-2">success</div>
        <div class="rounded-lg bg-alert px-4 py-2 text-white text-dt-zh-body-2">alert</div>
        <div class="rounded-lg bg-ad px-4 py-2 text-white text-dt-zh-body-2">ad</div>
        <div class="rounded-lg border border-gray-400 bg-bgc-paper px-4 py-2 text-dt-zh-body-2">bgc-paper</div>
      </div>
    </section>

    <!-- Typography -->
    <section class="mb-10">
      <h2 class="text-dt-zh-head-2 mb-4">Typography</h2>
      <p class="text-dt-zh-head-1 text-pr">Head 1 - 大標題</p>
      <p class="text-dt-zh-head-3 text-pr-middle">Head 3 - 小標題</p>
      <p class="text-dt-zh-body-1 text-txt">Body 1 - 內文段落</p>
      <p class="text-dt-zh-body-2 text-txt-light">Body 2 - 次要文字</p>
      <p class="font-noto text-dt-zh-body-1 text-txt">Noto Sans TC 字體</p>
    </section>

    <!-- Shadows -->
    <section class="mb-10">
      <h2 class="text-dt-zh-head-2 mb-4">Shadows</h2>
      <div class="flex flex-wrap gap-6">
        <div class="rounded-lg bg-white px-6 py-4 shadow-btn text-dt-zh-body-2">shadow-btn</div>
        <div class="rounded-lg bg-white px-6 py-4 shadow-card text-dt-zh-body-2">shadow-card</div>
        <div class="rounded-lg bg-white px-6 py-4 shadow-side text-dt-zh-body-2">shadow-side</div>
      </div>
    </section>

    <!-- Breakpoints -->
    <section class="mb-10">
      <h2 class="text-dt-zh-head-2 mb-4">Breakpoints</h2>
      <div class="rounded-lg bg-sec-light p-4 text-dt-zh-body-2">
        <span class="sm:hidden">&lt; sm (480px)</span>
        <span class="hidden sm:inline md:hidden">sm (480px)</span>
        <span class="hidden md:inline lg:hidden">md (768px)</span>
        <span class="hidden lg:inline xl:hidden">lg (1024px)</span>
        <span class="hidden xl:inline 2xl:hidden">xl (1280px)</span>
        <span class="hidden 2xl:inline 3xl:hidden">2xl (1440px)</span>
        <span class="hidden 3xl:inline">3xl (1920px)</span>
      </div>
    </section>

    <!-- Dark Mode -->
    <section>
      <h2 class="text-dt-zh-head-2 mb-4">Dark Mode</h2>
      <div class="dark rounded-lg bg-gray-900 p-6">
        <p class="text-dt-zh-body-1 text-white dark:text-sec">dark: 套用後文字變 sec 色</p>
      </div>
    </section>
  </div>
</template>