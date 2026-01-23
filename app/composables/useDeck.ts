export type SuitName = 'clubs' | 'diamonds' | 'hearts' | 'spades'

export const useDeck = () => {
    // simple const for ranks, browser only renders this char
    const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

    // suits have a name and the color, we compute the icon from the name through a composable
    const SUITS: { name: SuitName; color: string } [] = [
        { name: 'clubs', color: 'black' },
        { name: 'diamonds', color: 'red' },
        { name: 'hearts', color: 'red' },
        { name: 'spades', color: 'black' },
    ]
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