<script setup lang="ts">
import { useDeck } from "@/composables/useDeck";

const { getCardDetail } = useDeck();
const card = computed(() => getCardDetail(props.cardId));

const props = defineProps<{
	cardId: number;
	isFlipped: boolean;
}>();

const flipped = ref(false);

watch(
  () => props.isFlipped,
  (v) => {
    if (!v) return;
    setTimeout(() => {
      flipped.value = true;
    }, 600);
  },
  { immediate: true }
);
</script>

<template>
	<div
		class="card-3d relative w-12 h-18"
		:class="{ flipped: flipped }"
	>
		<div
			class="absolute inset-0 bg-white rounded-md backface-hidden rotate-y-180 flex flex-col justify-between p-1 shadow-md border border-black/5"
			:class="card?.color === 'red' ? 'text-red-600' : 'text-slate-900'"
		>
			<div class="flex flex-col items-left leading-none">
				<span class="text-[10px] font-bold font-mono">{{ card?.rank }}</span>
				<GameSuitIcon
					v-if="card"
					:name="card.suit"
					class="w-2 h-2"
				/>
			</div>
			<GameSuitIcon
				v-if="card"
				:name="card.suit"
				class="w-4 h-4 self-center"
			/>
			<div class="flex flex-col items-left leading-none rotate-180">
				<span class="text-[10px] font-bold font-mono">{{ card?.rank }}</span>
				<GameSuitIcon
					v-if="card"
					:name="card.suit"
					class="w-2 h-2"
				/>
			</div>
		</div>

		<div
			class="absolute inset-0 rounded-md backface-hidden bg-red-800 border border-white/20 shadow-lg flex items-center justify-center overflow-hidden"
		>
			<div class="absolute inset-1 border border-white/10 rounded-xs flex items-center justify-center">
				<span class="text-[6px] font-mono text-white/20 uppercase tracking-widest">NAO</span>
			</div>
		</div>
	</div>
</template>