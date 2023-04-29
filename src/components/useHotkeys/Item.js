import {useHotkeys} from 'react-hotkeys-hook';
import {useState} from "react";


const KeyItem = () => {
    const [count, setCount] = useState(0);

    useHotkeys('s', () => setCount(count => count + 1));

    return (
        <span>Pressed 's' key {count} times</span>
    );
};

export {KeyItem};
