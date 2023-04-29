import {List} from "./components/useCallBack/List";


function App() {
    const items = [
        {id: 1, name: "Item 1"},
        {id: 2, name: "Item 2"},
        {id: 3, name: "Item 3"},
        {id: 4, name: "Item 4"},
        {id: 5, name: "Item 5"},
        {id: 6, name: "Item 6"}
    ];

    return <List items={items}/>;
}

export default App;
