import { useState } from 'react';

export function useInput(initialValue, hasErrorFn) {
    const [enteredValue, setEnteredValue] = useState(initialValue)
    const [wasTouched, setWasTouched] = useState(false);

    const isInvalid = hasErrorFn(enteredValue);

    function valueChangeHandler(event) {
        setEnteredValue(event.target.value)
        setWasTouched(false);
    }

    function valueOnBlurHandler() {
        setWasTouched(true);
    }

    return {
        value: enteredValue,
        valueChangeHandler,
        valueOnBlurHandler,
        isInvalid: wasTouched && isInvalid
    }
}