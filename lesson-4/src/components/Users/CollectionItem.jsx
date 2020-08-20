import React from 'react'

let CollectionItem = ({name , userId , activeUserId , changeActiveUser}) => {
    return (
        <p className={userId === activeUserId ?  'active' : ''} onClick={changeActiveUser ?   () => changeActiveUser(userId) : null} >{name}</p>
    )
}

export {CollectionItem}