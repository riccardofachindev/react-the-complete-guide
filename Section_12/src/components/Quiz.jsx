import { useState, useCallback } from 'react';

import QUESTIONS from '../questions'
import Question from './Question';
import Summary from './Summary'

export default function Quiz() {
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    const activeQuestionIndex = selectedAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const answerClickHandler = useCallback(function answerClickHandler(answerClicked) {
        setSelectedAnswers(prevSelectedAnswers => {
            return [...prevSelectedAnswers, answerClicked];
        })
    }, []);

    const skipAnswerHandler = useCallback(() => answerClickHandler(null), [answerClickHandler]);

    if (quizIsComplete) {
        return (
            <Summary userAnswers={selectedAnswers} />
        )
    }

    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onTimeout={skipAnswerHandler}
                onAnswerSelected={answerClickHandler}
            />
        </div>
    )
}