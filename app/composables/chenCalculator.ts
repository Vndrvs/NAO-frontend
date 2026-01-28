// The Chen formula is the invention and intellectual property of Bill Chen, the author of Mathematics of Poker
// https://www.amazon.com/gp/product/1886070253?ie=UTF8&tag=thpoba-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=1886070253
// which was featured in the book 'Hold'em Excellence: From Beginner to Winner' by Lou Krieger
// https://www.amazon.com/gp/product/1886070148?ie=UTF8&tag=thpoba-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=1886070148

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

// helper to determine whether a combo is valid, suited, paired
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

	// we score it - A to J score is given by the algorithm rules
	// lower ranks have a score of their numerical value divided by 2
	let score;

	if (rankCharacter in CHEN_SCORE) {
		score = CHEN_SCORE[rankCharacter]
	} else {
		score = parseInt(rankCharacter) / 2;
	} // now we have the starter score value

	if (comboInfo.isPair) {
		score = Math.max(5, score! * 2); // if pair, we multiply it by 2
	} else if(comboInfo.isSuited) {
		score! += 2; // if suited, we add 2 to the score
	}

	// if the combo has a gap between the cards, we penalize it by deducting a certain number (handled earlier)
	score! -= gapPenalty;

	// bonus point for specific combos
	if (
		!comboInfo.isPair &&
		gapPenalty <= 1 &&
		index1 < 10 &&
		index2 < 10
	) {
		score! +=1;
	}

	// we round up the result
	return Math.ceil(score!);
}