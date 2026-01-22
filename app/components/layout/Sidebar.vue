<script lang="ts" setup>
const navigation = getSidebarNavigation()
</script>

<template>
    <aside class="sticky top-16.25 h-[calc(100vh-65px)] py-5">
        <div class="flex h-full w-full flex-col overflow-y-auto rounded-md border bg-bg pb-5">
            <SidebarItem 
                v-for="item in navigation" 
                :key="item.name" 
                :item="item" 
            />
        </div>
    </aside>
</template>