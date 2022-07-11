import React, { useState, useEffect, useRef } from 'react'

export default function Flashcard({ flashCard }) {
    const [flip, setFlip] = useState(false)
    const [cardHeight, setCardHeight] = useState('initial');

    const frontEl = useRef();
    const backEl = useRef();

    function maxHeight() {
        const frontHeight = frontEl.current.getBoundingClientRect().height;
        const backHeight = backEl.current.getBoundingClientRect().height;
        setCardHeight(Math.max(frontHeight, backHeight, 100));
    }

    useEffect(maxHeight,
        [flashCard.question, flashCard.answer, flashCard.options]);

    useEffect(() => {
        window.addEventListener('resize', maxHeight)
        return () => window.removeEventListener('resize', maxHeight)
    }, []);

    return (
        <div
            onClick={() => setFlip(!flip)}
            style={{ height: cardHeight }}
            className={`card ${flip ? 'flip' : ''}`}
        >
            <div className="front" ref={frontEl}>
                {flashCard.question}
                <div className="flashcard-options">
                    {flashCard.options.map(option => {
                        return (
                            <div className="single-option" key={option}>{option}</div>
                        )
                    })}
                </div>
            </div>
            <div className="back" ref={backEl}>{flashCard.answer}</div>
        </div>
    )
}
