import React from 'react'

const AccountItem = ({cost , content , deleteItem , id}) => {
    return (
        <li>
            <span>Сумма затрат {cost} ,руб</span>
            <span> Статья расходов: {content} </span>
            <button onClick={() => deleteItem(id)}>Удалить</button>
        </li>
    )
}

export {AccountItem}