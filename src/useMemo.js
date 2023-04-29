import React, { useState, useEffect } from 'react';
import {useMemoOne} from "use-memo-one";

function MyComponent() {
    const [number, setNumber] = useState(0);
    const [visible, setVisible] = useState(true);

    const factorial = useMemoOne(() => {
        let result = 1;
        for (let i = 2; i <= number; i++) {
            result *= i;
        }

        return result;
    }, [number]);

    useEffect(() => {
        console.log('Component mounted');

        return () => {
            console.log('Component unmounted');
        };
    }, []);

    const handleNumberChange = (e) => {
        setNumber(e.target.value);
    };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    console.log(factorial);

    return (
        <div>
            <button onClick={toggleVisibility}>{visible ? 'Hide' : 'Show'}</button>
            {visible && (
                <div>
                    <label>
                        Enter a number:
                        <input type="number" value={number} onChange={handleNumberChange} />
                    </label>
                    <p>{`Factorial of ${number} is ${factorial}`}</p>
                </div>
            )}
        </div>
    );
}

export {MyComponent};
