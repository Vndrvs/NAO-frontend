<script setup lang="ts">
const players = ref([
  { id: 1, name: "Opponent", position: "top" },
  { id: 4, name: "Player", position: "bottom" },
]);

const selfHand = ref([
  { id: 1, name: "Opponent", position: "top" },
  { id: 4, name: "Player", position: "bottom" },
]);

const villainHand = ref([
  { id: 1, name: "Opponent", position: "top" },
  { id: 4, name: "Player", position: "bottom" },
]);

const board = ref([
  { id: 1, name: "Opponent", position: "top" },
  { id: 4, name: "Player", position: "bottom" },
]);

const getSeatClass = (pos: string) => {
  const base = "absolute transform -translate-x-1/2 -translate-y-1/2";
  const positions: Record<string, string> = {
    'top': "top-0 left-1/2",
    'bottom': "top-full left-1/2",
  };
  return `${base} ${positions[pos]}`;
};
</script>

<template>
  <div class="relative flex h-125 w-full items-center justify-center p-6 pt-10">
    <div class="relative aspect-2/4 h-full w-full max-w-90 rounded-full border-8 border-component-bg bg-bg-secondary shadow-2xl"
    >
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <span class="text-xs font-mono text-text-secondary">POT</span>
        <span class="text-xl font-bold text-text-primary">$1,250</span>
      </div>

      <div 
        v-for="player in players" 
        :key="player.id"
        :class="getSeatClass(player.position)"
      >
        <div class="flex flex-col items-center">
          <div class="size-12 rounded-full border-2 border-border bg-bg p-1 shadow-sm">
            <div class="h-full w-full rounded-full bg-component-bg" />
          </div>
          <div class="mt-1 rounded bg-black/80 px-2 py-0.5 text-[10px] text-white">
            {{ player.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>