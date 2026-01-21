<script lang="ts" setup>

const navigation = getNavigation()

</script>

<template>
  <div class="mx-auto my-2 flex w-full items-center justify-center">
    <header class="rounded-full">
      <SpotlightButton
        rounded
        transparent
        :animate="false"
        class="border border-white/10"
      >
        <nav class="z-10 flex h-[12.5] justify-around gap-2 p-1 transition-all duration-300 ease-in-out sm:h-[11.25] sm:hover:gap-4">
          <NuxtLink
            v-for="item in navigation"
            :id="item.name.toLowerCase()"
            :key="item.to"
            :aria-label="item.name + ' navigation link'"
            class="flex items-center rounded-full border border-transparent px-4 py-1 transition-all duration-300 ease-in-out hover:border-white/5 hover:bg-zinc-900/50 hover:backdrop-blur-3xl sm:px-6"
          >
            <UIcon
              :name="item.icon"
              class="size-7 font-light sm:size-6"
            />
          </NuxtLink>
        </nav>
      </SpotlightButton>
    </header>
  </div>
</template>