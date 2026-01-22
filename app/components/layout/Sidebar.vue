<script lang="ts" setup>

const navigation = getSidebarNavigation()

</script>

<template>
    <aside class="sticky top-16.25 h-[calc(100vh-65px)] py-5">
        <div class="flex h-full w-full flex-col overflow-y-auto rounded-md border bg-bg pb-5">
            <NuxtLink
                v-for="item in navigation"
                :id="item.name.toLowerCase()"
                :key="item.to"
                :to="item.to"
                :aria-label="item.name + ' navigation link'"
                class="flex items-center rounded-full border border-transparent px-4 py-1 transition-all duration-300 ease-in-out text-text-secondary hover:border-white/5 hover:bg-zinc-900/50 hover:backdrop-blur-3xl sm:px-6"
            >
            <Icon
                :name="item.icon"
                class="size-7 font-light sm:size-6"
            />
          </NuxtLink>
        </div>
    </aside>
</template>