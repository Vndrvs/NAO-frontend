<script setup lang="ts">
import { RANKS, useDeck } from '@/composables/useDeck';
import { useAnalysisStore } from '~/stores/analysis';

const analysisStore = useAnalysisStore();

interface CardPair {
	id1: number,
	id2: number,
}

const { getCardDetail } = useDeck();

const getComboText = (id1: number, id2: number): string => {
	const c1 = getCardDetail(id1);
	const c2 = getCardDetail(id2);
	if (!c1 || !c2) return '';
	
	if (c1.rank === c2.rank) {
		const r = RANK_SHORT[c1.rank!];
		return `${r}${r}`;
	}
	
	const i1 = RANKS.indexOf(c1.rank!);
	const i2 = RANKS.indexOf(c2.rank!);
	
	const [high, low] = i1 > i2 ? [c1.rank, c2.rank] : [c2.rank, c1.rank];
	const suited = c1.suit === c2.suit ? 's' : 'o';
	
	return `${RANK_SHORT[high!]}${RANK_SHORT[low!]}${suited}`;
};

const grid: CardPair[][] = [];
const gridScores: number[][] = [];

for (let row = 12; row >= 0; row--) {
	const rowPairs: CardPair[] = [];
	const rowScores: number[] = [];

	for (let col = 12; col >= 0; col--) {
		const rowRankIndex = row;
		const colRankIndex = col;
		
		let id1: number, id2: number;
		
		if (row === col) {
			id1 = rowRankIndex * 4 + 3;
			id2 = rowRankIndex * 4 + 2;
		} else if (row > col) {
			const suit = 3;
			id1 = rowRankIndex * 4 + suit;
			id2 = colRankIndex * 4 + suit;
		} else {
			id1 = rowRankIndex * 4 + 3;
			id2 = colRankIndex * 4 + 2;
		}
		
		const combo: CardPair = { id1, id2 };
    	rowPairs.push(combo);
    	rowScores.push(chenScore(combo));
	}
	
	grid.push(rowPairs);
  	gridScores.push(rowScores);
}

const rgbToCss = (c: { red: number; green: number; blue: number }) =>
	`rgb(${Math.round(c.red)}, ${Math.round(c.green)}, ${Math.round(c.blue)})`;
</script>

<template>
	<div class="p-4 bg-bg border border-white/30 rounded-xl w-full shadow-2xl flex flex-col gap-6">
		<h2 class="text-text-primary text-lg font-bold flex items-center gap-2">
                Preflop Hand Rank Table
        </h2>
		<div class="grid grid-rows-13 gap-0">
			<div
				v-for="(row, rIdx) in grid"
				:key="rIdx"
				class="grid grid-cols-13 gap-0"
			>
				<div
					v-for="(pair, cIdx) in row"
					:key="cIdx"
					:style="{
						backgroundColor: rgbToCss(
						getChenColor(gridScores[rIdx][cIdx], gridScores)
						)
					}"
					class="h-10 flex flex-col items-center justify-center border border-text-secondary bg-bg text-xs font-mono"
				>
					<div class="text-black">{{ getComboText(pair.id1, pair.id2) }}</div>
					<div class="text-[10px] text-black">{{ gridScores[rIdx][cIdx] }}</div>
				</div>
		</div>
	</div>
</div>

</template>