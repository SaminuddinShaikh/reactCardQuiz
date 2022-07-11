import React from 'react'
import Flashcard from './Flashcard'

export default function FlashCardList({ flashCards }) {
    return (
        <div className="card-grid">
            {flashCards.map(flashCard => {
                return (
                    <Flashcard
                        key={flashCard.id}
                        flashCard={flashCard}
                    />
                )
            }
            )}
        </div>
    )
}
