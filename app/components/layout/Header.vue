<script setup lang="ts">
    const colorMode = useColorMode();
    const toggleTheme = () => {
        colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light';
    };
    const isOpen = ref(false);
</script>

<template>
    <header class="sticky top-0 z-20 border-b backdrop-blur pl-4 pr-4 border-b-text-secondary">
        <div class="container mx-auto flex h-16 items-center justify-between">
            <div class="flex items-center gap-3">
                <button
                    aria-label="Open menu"
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-text-secondary lg:hidden"
                    @click="isOpen = true"
                >
                <span class="sr-only">Button used to open menu</span>
                <Icon 
                name="heroicons:bars-2" 
                class="text-text-secondary"
                />
                </button>
                <Icon
                    name="uil:github"
                    alt="Visual logo of the application"
                    class="h-7 w-7 object-contain text-text-primary"
                />
                <NuxtLink
                    class="text-xl font-bold text-text-primary"
                    to="/">Nao Poker Analytics
                </NuxtLink>
            </div>
            <div class="flex items-center gap-5">
                <button
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-text-secondary cursor-pointer"
                    aria-label="Toggle Theme"
                    @click="toggleTheme" 
                >
                    <Icon
                        name="lucide:sun"
                        class="h-5 w-5"
                    />
                </button>
            </div>
        </div>
        <LayoutMobileSidebar v-model="isOpen" />
    </header>
</template>