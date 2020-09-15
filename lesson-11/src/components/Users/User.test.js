import React from 'react'
import {mount} from 'enzyme'
import {UserList} from './UserList'

it('should render users in the same order as in users array' , () => {
    const users = [ {name : '1' , id: 1 } , {name : '2' , id: 2 } ]
    const UserListWrapper = mount(<UserList  users={users}/>)    
    const UsersNodeList = UserListWrapper.find('.user-list__user')

    expect(UsersNodeList.length).toBe(2)
    for(let i = 0 ; i < users.length ; i ++ ) {
        expect(UsersNodeList.at(i).text()).toMatch(users[i].name)
    }
})

it('should render two buttons edit and delete for every user', () => {
    const users = [ {name : '1' , id: 1 } , {name : '2' , id: 2 } ]
    const UserListWrapper = mount(<UserList  users={users}/>)    
    const UsersNodeList = UserListWrapper.find('.user-list__user')
    let buttonText1 = UserListWrapper.find('button').at(0).text() 
    let buttonText2 = UserListWrapper.find('button').at(1).text() 

    const user1 = UserListWrapper.find('.user-list__user').at(0)
    const user2 = UserListWrapper.find('.user-list__user').at(1)

    expect(user1.text()).toMatch(buttonText1)
    expect(user2.text()).toMatch(buttonText2)
    UsersNodeList.forEach( node => expect(node.children().length).toBe(2))
    
})

it('should call onEdit when Edit button is clicked', () => {
    const users = [ {name : '1' , id: 1 } ]
    const onEdit = jest.fn()
    const UserListWrapper = mount(<UserList  users={users} onEdit={onEdit}/>)    
    
    const buttonWrapper = UserListWrapper.find('.btn-info') 

    buttonWrapper.simulate('click')

    expect(onEdit).toHaveBeenCalledTimes(1)
    expect(onEdit).toHaveBeenCalledWith(users[0].id)
    
})

it('should call onEdit when Edit button is clicked', () => {
    const users = [ {name : '1' , id: 1 } ]
    const onDelete = jest.fn()
    const UserListWrapper = mount(<UserList  users={users} onDelete={onDelete}/>)    
    
    const buttonWrapper = UserListWrapper.find('.btn-danger') 

    buttonWrapper.simulate('click')

    expect(onDelete).toHaveBeenCalledTimes(1)
    expect(onDelete).toHaveBeenCalledWith(users[0].id)
    
})