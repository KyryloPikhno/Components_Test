import MyComponent from './useMemo';
import React from "react";


function App() {
    const [showComponent, setShowComponent] = React.useState(true);

    const handleClick = () => {
        setShowComponent((prev) => !prev);
    };

    return (
        <div>
            <button onClick={handleClick}>{showComponent ? 'Hide' : 'Show'}</button>
            {showComponent && <MyComponent />}
        </div>
    );
}


export default App;
