<script setup lang="ts">
import { computed } from 'vue';
import { RANKS, useDeck } from '@/composables/useDeck';

interface CardPair {
	id1: number,
	id2: number,
}

const combos: CardPair[] = [
{ id1: 1, id2: 2 },
{ id1: 1, id2: 3 },
{ id1: 2, id2: 3 },
]

const { getCardDetail } = useDeck();

const cardTexts = computed<string[]>(() => {
	return combos.map(({ id1, id2 }) => {
		const c1 = getCardDetail(id1);
		const c2 = getCardDetail(id2);
		if (!c1 || !c2) return '';
		
		if (c1.rank === c2.rank) return `${c1.rank}${c2.rank}`;
		
		const i1 = RANKS.indexOf(c1.rank!);
		const i2 = RANKS.indexOf(c2.rank!);
		
		const [high, low] = i1 > i2 ? [c1.rank, c2.rank] : [c2.rank, c1.rank];
		const suited = c1.suit === c2.suit ? 's' : 'o';
		
		return `${high}${low}${suited}`;
	});
});

</script>

<template>
	<div class="w-full items-center bg-bg">
		<div
		v-for="combo in combos"
		class="w-4 h-6 bg-bg-secondary"
		>
		
		
	</div>
	
	
</div>


</template>