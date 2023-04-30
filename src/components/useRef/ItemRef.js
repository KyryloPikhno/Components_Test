import {useRef, useEffect, useState} from 'react';

function ItemRef() {
    const [count, setCount] = useState(0);

    const myRef = useRef(null);

    const handleButtonClick = () => {
        setCount(count + 1);
    };

    useEffect(() => {
        return () => {
            myRef.current = null;
        };
    }, [count]);

    return (
        <div ref={myRef}>
            <p>Count: {count}</p>
            <button onClick={handleButtonClick}>Increment Count</button>
        </div>
    );
}

export {ItemRef};
