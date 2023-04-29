import {useState, useEffect, memo} from 'react';
import {useMemoOne} from "use-memo-one";


function MyComponent() {
    const [number, setNumber] = useState(0);

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

    return (
        <div>
            {console.log('Rendered')}
            <label>
                Enter a number:
                <input type="number" value={number} onChange={handleNumberChange}/>
            </label>
            <p>{`Factorial of ${number} is ${factorial}`}</p>
        </div>
    );
}

export default memo( MyComponent);
