<script setup lang="ts">
    // stage: 0 = idle, 1 = preflop, 2 = flop, 3 = turn, 4 = river
    const stage = ref(0);
    const isDealing = ref(false);
    
    const myHand = ref<number[]>([]);
    const opponentHand = ref<number[]>([]);
    const boardCards = ref<number[]>([]);

    const dealHand = async () => {
        if (stage.value !== 0 || isDealing.value) return;
        
        isDealing.value = true;
        stage.value = 1;
        
        const fullMyHand = [0, 4]; 
        const fullOpponentHand = [50, 51]; 

        for (let i = 0; i < 2; i++) {
            myHand.value.push(fullMyHand[i]!);
            await new Promise(r => setTimeout(r, 600)); 
            opponentHand.value.push(fullOpponentHand[i]!);
            await new Promise(r => setTimeout(r, 600));
        }
        
        isDealing.value = false;
    };

    const nextStage = async () => {
        if (isDealing.value) return;

        const fullBoard = [12, 24, 36, 1, 13];
        
        if (stage.value === 1) {
            isDealing.value = true;
            stage.value = 2;

			const flopCards = fullBoard.slice(0, 3);
            
            for (const card of flopCards) {
                boardCards.value.push(card);
                await new Promise(r => setTimeout(r, 600));
            }
            
            isDealing.value = false;

        } else if (stage.value < 4) {
            stage.value++;
            boardCards.value.push(fullBoard[stage.value === 3 ? 3 : 4]!);
        }
    };

    const reset = () => {
        if (isDealing.value) return;
        stage.value = 0;
        myHand.value = [];
        opponentHand.value = [];
        boardCards.value = [];
    };
</script>

<template>
	<div class="h-fit bg-bg flex flex-col items-center justify-center p-4">
		<GameTable
			:stage="stage"
			:my-hand="myHand"
			:opponent-hand="opponentHand"
			:board="boardCards"
		/>

		<div class="mt-10 flex flex-wrap justify-center gap-3 w-full max-w-85">
			<button
				v-if="stage === 0"
				class="w-full py-3 bg-blue-600 rounded-xl font-bold uppercase text-white shadow-lg active:scale-95 transition-transform"
				:disabled="isDealing" 
            	:class="{ 'opacity-50 cursor-not-allowed': isDealing }"
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
					:disabled="isDealing" 
            		:class="{ 'opacity-50 cursor-not-allowed': isDealing }"
					@click="reset"
				>
					Fold
				</button>
				<button
					v-if="stage === 4"
					class="w-full mt-2 py-3 bg-green-600 rounded-xl font-bold uppercase text-white"
					:disabled="isDealing" 
            		:class="{ 'opacity-50 cursor-not-allowed': isDealing }"
					@click="reset"
				>
					Next Hand
				</button>
			</template>
		</div>
	</div>
</template>