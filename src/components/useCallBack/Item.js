import {useCallbackOne} from "use-memo-one";
import {memo} from "react";

const MemoItem = memo(function Item({item, onDelete}) {
    console.log(`Rendering Item with id=${item.id}`);

    const handleDelete = useCallbackOne(() => {
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





