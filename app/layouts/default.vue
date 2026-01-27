<template>
  <div class="bg-bg">
    <LayoutHeader />
    <div class="container mx-auto lg:grid lg:grid-cols-12 lg:gap-10 px-4">
      
      <LayoutSidebar class="sticky top-16 hidden h-[calc(100vh-65px)] lg:col-span-3 lg:block" />

      <main class="py-5 lg:col-span-9">
        <slot />
      </main>
    </div>
  </div>
</template>