<script setup lang="ts">
	// stage: 0=idle, 1=preflop, 2=flop, 3=turn, 4=river
	const stage = ref(0);
	
	// Reactive arrays that start empty to trigger sequential transitions
	const myHand = ref<number[]>([]);
	const oppHand = ref<number[]>([]);
	const boardCards = ref<number[]>([]);

	const dealHand = async () => {
		if (stage.value !== 0) return;
		stage.value = 1;
		
		const fullMyHand = [0, 4]; // Ac, 2c
		const fullOppHand = [50, 51]; // Kh, As

		// Sequential Deal: 1 to Player, 1 to Opponent, 1 to Player, 1 to Opponent
		for (let i = 0; i < 2; i++) {
			myHand.value.push(fullMyHand[i]);
			await new Promise(r => setTimeout(r, 600)); // Visible delay
			oppHand.value.push(fullOppHand[i]);
			await new Promise(r => setTimeout(r, 600));
		}
	};

	const nextStage = () => {
		const fullBoard = [12, 24, 36, 1, 13];
		if (stage.value === 1) { // Deal Flop
			boardCards.value = fullBoard.slice(0, 3);
			stage.value = 2;
		} else if (stage.value < 4) {
			stage.value++;
			boardCards.value.push(fullBoard[stage.value === 3 ? 3 : 4]);
		}
	};

	const reset = () => {
		stage.value = 0;
		myHand.value = [];
		oppHand.value = [];
		boardCards.value = [];
	};
</script>

<template>
	<div class="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
		<GameTable
			:stage="stage"
			:my-hand="myHand"
			:opp-hand="oppHand"
			:board="boardCards"
		/>

		<div class="mt-10 flex flex-wrap justify-center gap-3 w-full max-w-[340px]">
			<button
				v-if="stage === 0"
				class="w-full py-3 bg-blue-600 rounded-xl font-bold uppercase text-white shadow-lg active:scale-95 transition-transform"
				@click="dealHand"
			>
				Deal Hand
			</button>
			<template v-else>
				<button
					class="flex-1 py-2 bg-zinc-800 text-white rounded-lg text-xs font-bold uppercase border border-white/10"
					@click="nextStage"
				>
					{{ stage < 4 ? 'Call / Check' : 'Showdown' }}
				</button>
				<button
					class="flex-1 py-2 bg-red-900/40 text-red-500 rounded-lg text-xs font-bold uppercase border border-red-500/20"
					@click="reset"
				>
					Fold
				</button>
				<button
					v-if="stage === 4"
					class="w-full mt-2 py-3 bg-green-600 rounded-xl font-bold uppercase text-white"
					@click="reset"
				>
					Next Hand
				</button>
			</template>
		</div>
	</div>
</template>