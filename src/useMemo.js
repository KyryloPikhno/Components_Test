import React, {useMemo, useState} from 'react';

function MyComponent(props) {
    const [number, setNumber] = useState(0);

    const factorial = useMemo(() => {
        let result = 1;
        for (let i = 2; i <= number; i++) {
            result *= i;
        }
        return result;
    }, [number]);

    console.log(factorial);

    const handleNumberChange = (e) => {
        setNumber(e.target.value);
    };

    return (
        <div>
            <label>
                Enter a number:
                <input type="number" value={number} onChange={handleNumberChange} />
            </label>
            <p>{`Factorial of ${number} is ${factorial}`}</p>
        </div>
    );
}

export {MyComponent};
