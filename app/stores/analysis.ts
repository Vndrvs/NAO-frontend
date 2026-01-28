import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// I used the setup store Pinia definition method
export const useAnalysisStore = defineStore('analysis', ()=> {

	// state (reactive)
	const holeCards = ref<number[]>([]);
	
	// getters
	const isHandFull = computed(() => {
    	return holeCards.value.length === 2;
    });

	function setHand(ids: number[]) {
		if (ids.length > 2) {
			throw new Error('Hand cannot exceed 2 cards');
		}

		holeCards.value = [...ids];
	}

    function clearHand() {
        holeCards.value = [];
    }
	
	return {
		holeCards,
		isHandFull,
		setHand,
		clearHand,
	}
})