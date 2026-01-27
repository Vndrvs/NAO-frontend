// The Chen formula.
// Score your highest card only. Do not add any points for your lower card.
// A = 10 points.
// K = 8 points.
// Q = 7 points.
// J = 6 points.
// 10 to 2 = 1/2 of card value. (e.g. a 6 would be worth 3 points)
// Multiply pairs by 2 of one card’s value. However, minimum score for a pair is 5.
// (e.g. KK = 16 points, 77 = 7 points, 22 = 5 points)
// Add 2 points if cards are suited.
// Subtract points if their is a gap between the two cards.
// No gap = -0 points.
// 1 card gap = -1 points.
// 2 card gap = -2 points.
// 3 card gap = -4 points.
// 4 card gap or more = -5 points. (Aces are high this step, so hands like A2, A3 etc. have a 4+ gap.)
// Add 1 point if there is a 0 or 1 card gap and both cards are lower than a Q. (e.g. JT, 75, 32 etc, this bonus point does not apply to pocket pairs)
// Round half point scores up. (e.g. 7.5 rounds up to 8)

import { RANKS, useDeck } from '@/composables/useDeck';

const { getCardDetail } = useDeck();

// specific Chen scores for lettered ranks
export const CHEN_SCORE: Record<string, number> = {
	'A': 10,
	'K': 8,
	'Q': 7,
	'J': 6,
}

// one preflop hand object
interface CardPair {
  id1: number,
  id2: number,
}

// info object about this hand
interface ComboAnalysis {
    isPair: boolean;
    isSuited: boolean;
    isValid: boolean;
}

export const getComboInfo = (combo: CardPair): ComboAnalysis => {
	const c1 = getCardDetail(combo.id1);
	const c2 = getCardDetail(combo.id2);

	// 1. validate
	if (!c1 || !c2) {
		return { isPair: false, isSuited: false, isValid: false }
	}

	// 2. check for pairs
	const isPair = c1.rank === c2.rank;

	// 3. check for suits
	const isSuited = c1.suit === c2.suit;

	return {
		isPair,
		isSuited,
		isValid: true,
	}
}

// Chen's gap means how many cards are between, so we have to deduct one from their difference
export const gapScorer = (index1: number, index2: number): number => {
  const gap = Math.abs(index1 - index2) - 1;

  if (gap <= 0) return 0;
  if (gap === 1) return 1;
  if (gap === 2) return 2;
  if (gap === 3) return 4;

  return 5;
}

// Step 1: Scoring higher card
export const chenScore = (combo: CardPair): number => {
	const c1 = getCardDetail(combo.id1);
	const c2 = getCardDetail(combo.id2);

	const comboInfo = getComboInfo(combo);

	// we search for the index of the cards
	const index1 = RANKS.indexOf(c1!.rank!)
	const index2 = RANKS.indexOf(c2!.rank!)

	// we calculate their "Chen gap" for further arithmetics
	const gapPenalty = gapScorer(index1, index2);

	// we choose the higher index and determine which card it is
	const higherIndex = Math.max(index1, index2)
	const rankCharacter = RANKS[higherIndex]!

	// we score it - A to J is given by the algorithm rules
	// lower ranks have a score of their numerical value divided by 2
	let score;

	if (rankCharacter in CHEN_SCORE) {
		score = CHEN_SCORE[rankCharacter]
	} else {
		score = parseInt(rankCharacter) / 2;
	}

	if (comboInfo.isPair) {
		score = Math.max(5, score! * 2);
	} else if(comboInfo.isSuited) {
		score! += 2;
	}

	score! -= gapPenalty;

	if (
		!comboInfo.isPair &&
		gapPenalty <= 1 &&
		index1 < 10 &&
		index2 < 10
	) {
		score! +=1;
	}

	return Math.ceil(score!);
}