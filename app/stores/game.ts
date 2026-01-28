import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// I used the setup store Pinia definition method
export const useAnalysisStore = defineStore('analysis', ()=> {

	// state (reactive)
	const selfHoleCards = ref<number[]>([]);
	const villainHoleCards = ref<number[]>([]);
	
	// getters
	const isSelfHandFull = computed(() => {
		return selfHoleCards.value.length === 2;
	});

	const isVillainHandFull = computed(() => {
		return villainHoleCards.value.length === 2;
	});

	const allUsedCards = computed(() => {
		return [...selfHoleCards.value, ...villainHoleCards.value];
	});

	// actions
	function assertCardsAreFree(ids: number[]) {
		for (const id of ids) {
			if (allUsedCards.value.includes(id)) {
				throw new Error(`Card ${id} already in use - broken deck`);
			}
		}
	}

	function setSelfHand(ids: number[]) {
		if (ids.length > 2) {
			throw new Error('Hand cannot exceed 2 cards');
		}

		const alreadyUsed = villainHoleCards.value;

		for (const id of ids) {
			if (alreadyUsed.includes(id)) {
				throw new Error(`Card ${id} already exists in villain hand`);
			}
		}

		selfHoleCards.value = [...ids];
	}

	function setVillainHand(ids: number[]) {
		if (ids.length !== 2) {
			throw new Error('Valid hand must consist of 2 cards');
		}

		const alreadyUsed = selfHoleCards.value;

		for (const id of ids) {
			if (alreadyUsed.includes(id)) {
				throw new Error(`Card ${id} already exists in self hand`);
			}
		}

		villainHoleCards.value = [...ids];
	}

	function clearSelfHand() {
		selfHoleCards.value = [];
	}

	function clearVillainHand() {
		villainHoleCards.value = [];
	}
	
	return {
		selfHoleCards,
		villainHoleCards,
		isSelfHandFull,
		isVillainHandFull,
		allUsedCards,
		assertCardsAreFree,
		setSelfHand,
		setVillainHand,
		clearSelfHand,
		clearVillainHand,
	}
})