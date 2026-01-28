<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { type SuitName, RANKS, RANK_NAMES, useDeck } from '@/composables/useDeck';
import { useAnalysisStore } from '~/stores/analysis';

const { getCardDetail } = useDeck();
const analysisStore = useAnalysisStore();

const SUITS: { char: string; name: SuitName; color: string }[] = [
	{ char: 'h', name: 'hearts', color: 'text-red-500' },
	{ char: 'c', name: 'clubs', color: 'text-text-primary' },
    { char: 'd', name: 'diamonds', color: 'text-red-500' },
    { char: 's', name: 'spades', color: 'text-text-primary' },
];

const SUIT_INDEX: Record<string, number> = {
    'c': 0, 'd': 1, 'h': 2, 's': 3
};

// STATE, has the cards selected for analysis and their corresponding details
// using these for preventive UX behaviour
const addedCards = computed(() => analysisStore.holeCards);
const selectedRank = ref<string | null>(null);
const selectedSuit = ref<string | null>(null);

const isCardTaken = (rank: string, suitChar: string): boolean => {
    const rIdx = RANKS.indexOf(rank);
    const sIdx = SUIT_INDEX[suitChar];
    if (rIdx === -1 || sIdx === undefined) return false;
    
    const id = (rIdx * 4) + sIdx;
    return addedCards.value.includes(id);
};

// PREVENTIVE UX constants and helpers
const isFull = computed(() => analysisStore.isHandFull);

const isRankDisabled = (rank: string) => {
    if (isFull.value) return true;
    // if a suit is selected, disable this rank if the combo is taken
    if (selectedSuit.value) {
        return isCardTaken(rank, selectedSuit.value);
    }
    return false;
};

const isSuitDisabled = (suitChar: string) => {
    if (isFull.value) return true;
    // if a rank is selected, disable this suit if the combo is taken
    if (selectedRank.value) {
        return isCardTaken(selectedRank.value, suitChar);
    }
    return false;
};

const addCard = () => {
    if (selectedRank.value && selectedSuit.value) {
        const rankIdx = RANKS.indexOf(selectedRank.value);
        const suitIdx = SUIT_INDEX[selectedSuit.value];

        if (rankIdx !== -1 && suitIdx !== undefined) {
            const id = (rankIdx * 4) + suitIdx;
            
            // Push to a temporary array because your store action 
            // setSelfHand expects exactly 2 cards
            const currentCards = [...analysisStore.holeCards, id];
            
            if (currentCards.length <= 2) {
                // If it's the first card, we might need a push action 
                // OR update setSelfHand to handle 1-2 cards.
                analysisStore.holeCards.push(id);
            }
        }
        selectedRank.value = null;
        selectedSuit.value = null;
    }
};

const clear = () => {
	selectedRank.value = null;
	selectedSuit.value = null;
	analysisStore.clearHand();
};

const handText = computed(() => {
    if (addedCards.value.length === 0) return "";
    
    return addedCards.value.map(id => {
        const card = getCardDetail(id);
        if (!card) return "";

        const fullRank = RANK_NAMES[card.rank!]
        const fullSuit = card.suit!.charAt(0).toUpperCase() + card.suit!.slice(1);

        return `${fullRank} of ${fullSuit}`;
    }).join(', ');
});

onMounted(() => {
	analysisStore.clearHand();
});
</script>

<template>
    <div class="p-6 bg-bg border border-white/10 rounded-xl w-full shadow-2xl flex flex-col gap-6">
        
        <div class="flex items-center justify-between">
            <h2 class="text-text-primary text-lg font-bold flex items-center gap-2">
                <span class="w-2 h-6 bg-blue-500 rounded-full"></span>
                Preflop Hand Analyzer
            </h2>
            <button 
                @click="clear"
				:class="
					isFull
					? 'text-xs text-blue-600 hover:text-red-400 transition-colors uppercase font-bold tracking-wider'
					: 'text-xs text-zinc-500 hover:text-red-400 transition-colors uppercase font-bold tracking-wider'"
            >
                Clear All
            </button>
        </div>

        <div class="space-y-4">
            <div>
                <label class="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2 block">Select Rank</label>
                <div class="grid grid-cols-7 gap-1">
                    <button 
                        v-for="rank in RANKS" 
                        :key="rank"
                        @click="selectedRank = rank"
						:disabled="isRankDisabled(rank)"
                        class="h-8 rounded text-sm font-mono font-bold transition-all border"
                        :class="
							isRankDisabled(rank)
								? 'bg-zinc-800/50 text-zinc-600 border-transparent cursor-not-allowed opacity-80'
								: selectedRank === rank
									? 'bg-blue-600 border-blue-400 text-white shadow-lg scale-105 z-10'
									: 'bg-zinc-800 border-white/5 text-zinc-400 hover:bg-zinc-700 hover:text-white'"
                    >
                        {{ rank }}
                    </button>
                </div>
            </div>

            <div>
                <label class="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2 block">Select Suit</label>
                <div class="grid grid-cols-4 gap-2">
                    <button 
                        v-for="suit in SUITS" 
                        :key="suit.char"
                        @click="selectedSuit = suit.char"
						:disabled="isSuitDisabled(suit.char)"
                        class="h-10 rounded flex items-center justify-center transition-all border group"
						:class="
                            isSuitDisabled(suit.char)
                                ? `bg-zinc-900/50 border-transparent cursor-not-allowed opacity-50`
                                : selectedSuit === suit.char
                                    ? `bg-blue-600 border-blue-400 shadow-inner scale-95 ring-1 ring-white/20 ${suit.color}`
                                    : `bg-zinc-800/50 border-transparent hover:bg-zinc-800 ${suit.color}`
                        "
                    >
                        <GameSuitIcon :name="suit.name" class="w-6 h-6" />
                    </button>
                </div>
            </div>

            <button 
                @click="addCard"
                :disabled="!selectedRank || !selectedSuit"
                class="w-full h-10 py-3 rounded-lg font-bold uppercase tracking-wider text-xs transition-all border border-transparent flex items-center justify-center gap-2"
                :class="selectedRank && selectedSuit 
                    ? 'bg-green-600 text-white hover:bg-green-500 shadow-lg' 
                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed border-white/5'"
            >
                Add Card 
                <span v-if="selectedRank && selectedSuit" class="font-mono bg-black/20 px-2 py-0.5 rounded">
                    {{ selectedRank }}{{ selectedSuit }}
                </span>
            </button>
        </div>

        <div class="h-32 bg-green-800 border border-white/5 rounded-lg flex items-center justify-center gap-2 relative overflow-hidden">
            <div class="absolute inset-0 bg-grain opacity-10 pointer-events-none"></div>

            <template v-if="addedCards.length > 0">
                <transition-group 
                    enter-active-class="transition-all duration-300 ease-out"
                    enter-from-class="opacity-0 translate-y-4 scale-75"
                    enter-to-class="opacity-100 translate-y-0 scale-100"
                    leave-active-class="transition-all duration-200 ease-in absolute"
                    leave-from-class="opacity-100 scale-100"
                    leave-to-class="opacity-0 scale-75"
                >
                    <GameCard 
                        v-for="(cardId, index) in addedCards" 
                        :key="`${cardId}-${index}`"
                        :card-id="cardId" 
                        :is-flipped="true"
                        class="hover:-translate-y-2 transition-transform duration-300 z-10"
                    />
                </transition-group>
            </template>
            <div v-else class="text-white text-xs font-mono uppercase tracking-widest">
                No cards added
            </div>
        </div>
		<transition
			enter-active-class="transition duration-300 ease-out delay-100"
			enter-from-class="opacity-0 translate-y-2"
			enter-to-class="opacity-100 translate-y-0"
			leave-active-class="transition duration-150 ease-in"
			leave-from-class="opacity-100 translate-y-0"
			leave-to-class="opacity-0 translate-y-2"
		>
			<div v-if="handText" class="mt-3 z-10 w-full text-center">
				<span class="inline-block px-3 py-1 bg-black/40 border border-white/10 rounded-full text-xs font-mono uppercase tracking-widest text-zinc-400 backdrop-blur-md">
					{{ handText }}
				</span>
			</div>
    	</transition>
    </div>
</template>