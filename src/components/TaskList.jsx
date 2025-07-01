import { useState, useEffect } from "react"

export default function TaskList() {
    const [inputValue, setInputValue] = useState("");
    const [items, setItems] = useState(() => {
        const items = localStorage.getItem('reactTodoItems')
        return items ? JSON.parse(items) : [];
    });

    useEffect(() => {
        localStorage.setItem('reactTodoItems', JSON.stringify(items))
    }, [items])

    function handleClick() {
        if (inputValue.trim() === '') return
        setItems(prev => [...prev, { text: inputValue, isDone: false }])
        setInputValue('')
        console.log('gh-pages works automatically');
        
        
    }

    function setDoneItems(index) {
        setItems(prevItems => {
            const item = prevItems[index].isDone
            if (item === true) return [...prevItems]
            const newItems = [...prevItems];
            newItems[index].isDone = true
            return newItems;
        });
    }

    function renderItems() {
        return (
            items.map(({ text, isDone }, i) => (
                <li key={i} className={`tasks__item ${isDone ? 'done' : ''}`}>
                    <p className="tasks__text">{text}</p>
                    <button onClick={() => setDoneItems(i)} className="tasks__btn tasks__btn--done">Виконано</button>
                    <button onClick={() => delItems(i)} className="tasks__btn tasks__btn--del">Видалити</button>
                </li>
            ))
        )
    }
    function delItems(index) {
        setItems(prevItems => prevItems.filter((_, i) => i !== index));
    }

    return (
        <div className='container'>
            <ul className="tasks">
                {renderItems()}
            </ul >
            <button className="add-item-btn" onClick={handleClick}>
                Додати пункт
            </button>
            <input type="text" onChange={(e) => setInputValue(e.target.value)} value={inputValue} className="add-item-input"></input>
        </div>
    )
}