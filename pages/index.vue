<script setup lang="ts"></script>

<template>
  <div class="min-h-screen bg-gray-200 p-10 font-sans">
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
        <span class="sm:hidden">< sm (480px)</span>
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