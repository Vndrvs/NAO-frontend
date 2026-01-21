<script setup lang="ts">

const colorMode = useColorMode();
const toggleTheme = () => {
    colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light';
};
</script>

<template>
    <header class="sticky top-0 z-20 border-b color-bg backdrop-blur">
        <div class="container flex h-16 items-center justify-between">
            <div class="flex items-center gap-3">
                <Icon name="uil:github" style="color: black" alt="Visual logo of the application" class="h-7 w-7 object-contain"/>
                <NuxtLink class="text-xl font-bold" to="/">Nao Poker Analytics</NuxtLink>
            </div>
            <div class="flex items-center gap-5">
                <button class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border color-bg" @lick="toggleTheme">
                    <Icon name="lucide:sun" class="h-5 w-5"/>
                </button>
            </div>
        </div>
    </header>
</template>