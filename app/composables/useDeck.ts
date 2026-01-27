export type SuitName = 'clubs' | 'diamonds' | 'hearts' | 'spades'

type CardDetail = {
  id: number
  rank: typeof RANKS[number]
  suit: SuitName
  color: string
} | null

export const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export const RANK_NAMES: Record<string, string> = {
    'A': 'Ace',
    'K': 'King',
    'Q': 'Queen',
    'J': 'Jack',
    '10': 'Ten',
    '9': 'Nine',
    '8': 'Eight',
    '7': 'Seven',
    '6': 'Six',
    '5': 'Five',
    '4': 'Four',
    '3': 'Three',
    '2': 'Two',
};

// suits have a name and the color, we compute the icon from the name through a composable
export const SUITS: { name: SuitName; color: string } [] = [
    { name: 'clubs', color: 'black' },
    { name: 'diamonds', color: 'red' },
    { name: 'hearts', color: 'red' },
    { name: 'spades', color: 'black' },
]

export const useDeck = () => {
    
    const getCardDetail = (id: number) => {
        // there are only 52 cards in a valid deck
        if (id < 0 || id > 51) return null

        const rankIndex = Math.floor(id / 4) // in our deck logic, the cards are in groups of 4 (each suit) for each rank
        const suitIndex = id % 4 // inside the group, which position does the card sit in?

        return {
            id,
            rank: RANKS[rankIndex],
            suit: SUITS[suitIndex]?.name,
            color: SUITS[suitIndex]?.color,
        }
    }

    return { getCardDetail }
}