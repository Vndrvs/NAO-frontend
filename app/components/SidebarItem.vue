<script setup lang="ts">
    const props = defineProps<{
        links?:  any[]
    }>();
</script>

<template>
    <div class="flex flex-col">
        <template 
            v-for="(l,i) in links" 
            :key="i"
        >
        <NuxtLink 
            v-if=!l.items 
            to="/"
            class="inline-flex items-center gap-4 px-4 py-3 text-left text-text-secondary" 
        >
        <Icon 
            v-if="l.icon"
            :name="l.icon" 
            class="w-5 h-5 text-text-secondary"
        />
        <p class="truncate">{{ l.title }}</p>
    </NuxtLink>
    <HDisclosure v-else>
        <HDisclosureButton class="inline-flex items-center gap-4 px-4 py-3 text-left text-text-secondary" >
            <div class="flex items-center gap-4">
                <Icon 
                    v-if="l.icon"
                    :name="l.icon" 
                    class="w-5 h-5 text-text-secondary"
                />
                <p class="truncate">{{ l.title }}</p>
            </div>
            <div>
                <Icon 
                    name="lucide:chevron-down" 
                    class="h-5 w-5 text-text-secondary transition"/>
            </div>
        </HDisclosureButton>
    </HDisclosure>
</template>

</div>
</template>


