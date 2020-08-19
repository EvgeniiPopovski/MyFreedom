import React from 'react'

let User = ({name , userId , activeUserId , changeActiveUser}) => {
    return (
        <h3 className={userId === activeUserId ?  'active' : ''} onClick={() => changeActiveUser(userId)} >{name}</h3>
    )
}

export {User}