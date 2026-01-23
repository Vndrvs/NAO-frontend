<script setup lang="ts">
defineProps<{
    item: {
        name: string
        to: string
        icon?: string
        children?: { name: string; to: string }[]
    }
}>();
</script>

<template>
    <div class="flex flex-col">
        <NuxtLink 
            v-if="!item.children"
            :to="item.to"
            class="inline-flex items-center gap-4 px-4 py-3 text-left text-text-secondary" 
        >
            <Icon 
                v-if="item.icon"
                :name="item.icon" 
                class="w-5 h-5 text-text-secondary"
            />
            <span class="truncate">{{ item.name }}</span>
        </NuxtLink>
        <HDisclosure 
            v-else 
            v-slot="{ open }"
            as="div"
            class="w-full"
        >
            <HDisclosureButton class="inline-flex items-center gap-4 px-4 py-3 text-left text-text-secondary cursor-pointer" >
                <div class="flex items-center gap-4">
                    <Icon 
                        v-if="item.icon"
                        :name="item.icon" 
                        class="w-5 h-5 text-text-secondary"
                    />
                    <span class="truncate text-text-secondary"> {{ item.name }} </span>
                </div>
                    <Icon 
                        name="lucide:chevron-down" 
                        :class="[open && 'rotate-180']"
                        class="h-5 w-5 text-text-secondary transition"
                    />
            </HDisclosureButton>

            <HDisclosurePanel class="mx-6 flex flex-col border-l px-3 border-text-secondary">
                <NuxtLink 
                    v-for="subItem in item.children"
                    :key="subItem.to"
                    :to="subItem.to"
                    class="rounded-md px-3 py-1.5 text-sm hover:bg-muted text-text-secondary" 
                >
                    {{ subItem.name }}
                </NuxtLink>
            </HDisclosurePanel>
        </HDisclosure>
    </div>
</template>

