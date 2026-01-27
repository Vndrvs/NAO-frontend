<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
	stage: number;
	myHand: number[];
	opponentHand: number[];
	board: number[];
}>();

const deckEl = ref<HTMLElement | null>(null);

const beforeEnter = (el: Element) => {
};

const enter = (el: Element, done: () => void) => {
	const htmlEl = el as HTMLElement;

	if (!deckEl.value) {
		done();
		return;
	}

	const deckRect = deckEl.value.getBoundingClientRect();
	const cardRect = htmlEl.getBoundingClientRect();

	if (cardRect.left === 0 && cardRect.top === 0) {
		done();
		return;
	}

	const dX = deckRect.left - cardRect.left;
	const dY = deckRect.top - cardRect.top;

	htmlEl.style.transition = 'none';
	htmlEl.style.transform = `translate3d(${dX}px, ${dY}px, 0)`;
	
	htmlEl.style.opacity = '1';

	htmlEl.offsetHeight; 

	requestAnimationFrame(() => {
		htmlEl.style.transition = "transform 1000ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 1000ms ease-out";
		htmlEl.style.transform = "translate3d(0,0,0)";
		htmlEl.style.opacity = "1";
	});

	const onEnd = () => {
		htmlEl.style.transition = "";
		htmlEl.style.transform = "";
		done();
	};

	htmlEl.addEventListener('transitionend', onEnd, { once: true });
	setTimeout(onEnd, 1000);
};
</script>

<template>
	<div class="relative w-full max-w-85 aspect-3/5 rounded-[170px] border-8 border-[#2c1e14] shadow-2xl bg-radial from-poker-green-light to-poker-green bg-grain perspective-1000">
		
		<div class="absolute top-12 left-1/2 -translate-x-1/2 z-30">
			<div class="flex space-x-1">
				<transition-group name="deal" @before-enter="beforeEnter" @enter="enter">
					<GameCard
						v-for="id in opponentHand"
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
				class="relative w-12 h-18 bg-red-800 rounded-md border border-white/20 border-b-4 border-b-red-950 shadow-xl z-50 flex items-center justify-center overflow-hidden"
			>
				<div class="absolute inset-1 border border-white/40 rounded-xs flex items-center justify-center">
					<span class="text-[6px] font-mono text-white/50 uppercase tracking-widest">
						NAO
					</span>
				</div>
			</div>

			<div class="flex gap-1 z-20">
				<div
					v-for="i in 5"
					:key="i"
					class="w-12 h-18 rounded-md border border-white/10 bg-black/30 border-dashed flex items-center justify-center"
				>
					<transition name="deal" @before-enter="beforeEnter" @enter="enter">
						<GameCard
							v-if="board[i-1] !== undefined"
							:card-id="board[i-1]!"
							:is-flipped="true"
						/>
					</transition>
				</div>
			</div>
		</div>
		
		<div class="absolute bottom-12 left-1/2 -translate-x-1/2 z-30">
			<div class="flex flex-row space-x-1">
				<transition-group name="deal" @before-enter="beforeEnter" @enter="enter">
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
.perspective-1000 {
	perspective: 1000px;
}
</style>