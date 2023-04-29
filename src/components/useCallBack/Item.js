import {useCallback, memo} from "react";

const MemoItem = memo(function Item({item, onDelete}) {
    console.log(`Rendering Item with id=${item.id}`);

    const handleDelete = useCallback(() => {
        onDelete(item.id);
    }, [onDelete, item.id]);

    return (
        <div>
            <span>{item.name}</span>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
})

export {MemoItem};





