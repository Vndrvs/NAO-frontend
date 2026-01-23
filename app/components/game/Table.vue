<script setup lang="ts">
defineProps<{
	stage: number;
	myHand: number[];
	oppHand: number[];
	board: number[];
}>();
</script>

<template>
	<div
		class="relative w-full max-w-[340px] aspect-[3/5] rounded-[170px] border-[8px] border-[#2c1e14] shadow-2xl bg-radial from-poker-green-light to-poker-green bg-grain perspective-1000"
	>
		<div class="absolute top-12 left-1/2 -translate-x-1/2 z-30">
  			<div class="flex space-x-1">
				<transition-group name="deal">
					<GameCard
						v-for="id in oppHand"
						:key="'opp'+id"
						:card-id="id"
						:is-flipped="false"
					/>
				</transition-group>
			</div>
		</div>

		<div class="absolute inset-0 flex flex-col items-center justify-center gap-6">
			<div 
				ref="deckEl"
				class="w-12 h-18 bg-red-800 rounded-md border-b-4 border-red-950 shadow-xl z-50" 
			/>

			<div class="flex gap-1 z-20">
				<div
					v-for="i in 5"
					:key="i"
					class="w-12 h-18 rounded-md border border-white/10 bg-black/30 border-dashed flex items-center justify-center"
				>
					<transition name="deal">
						<GameCard
							v-if="board[i-1] !== undefined"
							:card-id="board[i-1]"
							:is-flipped="true"
						/>
					</transition>
				</div>
			</div>
		</div>
		
		<div class="absolute bottom-12 left-1/2 -translate-x-1/2 z-30">
			<div class="flex flex-row space-x-1">
				<transition-group name="deal">
					<GameCard
						v-for="id in myHand"
						:key="'my'+id"
						:card-id="id"
						:is-flipped="true"
					/>
				</transition-group>
			</div>
			</div>
		</div>
</template>

<style scoped>
.deal-enter-active {
  transition:
    opacity 900ms ease-out,
    transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
}

.deal-enter-from {
  --ty: -120px;
  --tz: 200px;
  opacity: 0;
}

</style>