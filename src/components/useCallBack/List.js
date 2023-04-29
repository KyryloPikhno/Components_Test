import {useCallback, useState} from "react";
import {MemoItem} from "./Item";

function List({ items }) {
    console.log("start");
    console.log("Rendering List");

    const [itemsState, setItemsState] = useState(items);

    const handleDelete = useCallback((id) => {
        setItemsState((prevItems) => prevItems.filter((item) => item.id !== id));
    }, []);

    console.log("stop");
    return (
        <div>
            {itemsState.map((item) => (
                <MemoItem key={item.id} item={item} onDelete={handleDelete} />
            ))}
        </div>
    );
}

export {List};
