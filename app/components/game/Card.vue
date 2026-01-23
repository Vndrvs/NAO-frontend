<script setup lang="ts">

    const revealOpponent = ref(false);
    
</script>

<template>
    <div class="flex flex-col items-center gap-12 p-10 min-h-screen bg-bg">
        
        <div
            class="flex flex-col items-center gap-4 cursor-pointer"
            @click="revealOpponent = !revealOpponent"
        >
        <div class="flex -space-x-6">
            <div
                v-for="i in 2"
                :key="i" 
                class="w-20 h-28 rounded-xl border-2 border-border shadow-2xl transition-all duration-700 preserve-3d"
                :class="[revealOpponent ? 'transform-[rotateY(180deg)]' : 'bg-[repeating-linear-gradient(45deg,#111,#111_10px,#222_10px,#222_20px)]']"
            >
            <div
                v-if="revealOpponent"
                class="absolute inset-0 bg-bg rounded-xl flex items-center justify-center transform-[rotateY(180deg)]"
            >
            <span class="text-2xl font-mono text-accents-4 italic">?</span>
        </div>
    </div>
</div>
<p class="text-[10px] font-mono uppercase tracking-[0.3em] text-text-secondary">Opponent</p>
</div>

<div class="flex flex-col items-center gap-4 -mt-10 z-10">
    <div class="flex -space-x-8">
        <div
            v-for="i in 2"
            :key="i" 
            class="w-24 h-36 bg-bg rounded-2xl border-2 border-border shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col items-center justify-between p-3 transform hover:-translate-y-6 transition-transform cursor-pointer"
        >
        <span class="self-start text-lg font-bold text-red-600 leading-none">A</span>
        <div class="text-4xl text-red-600">♥</div>
        <span class="self-end text-lg font-bold text-red-600 leading-none rotate-180">A</span>
    </div>
</div>
<div class="px-4 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest shadow-lg">
    Your Hand
</div>
</div>

</div>
</template>