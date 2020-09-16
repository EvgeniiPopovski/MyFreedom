import React from 'react'
import { mount } from 'enzyme'
import { SignUpForm } from './SignUpForm'


it('should change input value on input information', () => {
    const wrapper = mount(<SignUpForm onSignUp={() => { }} onCancel={() => { }} />)
    const inputWrapper = wrapper.find('input')
    inputWrapper.forEach((node) => expect(node.simulate("change", { target: { value: "hello" } })))
    const inputWrapperWithValue = wrapper.find('input')
    inputWrapperWithValue.forEach((node) => expect(node.props().value).toMatch('hello'))
})

it('should call function onSignUp with inputs value', () => {
    const onSignUp = jest.fn()
    const wrapper = mount(<SignUpForm onSignUp={onSignUp} onCancel={() => { }} />)
    const inputWrapper = wrapper.find('input')
    inputWrapper.forEach((node) => expect(node.simulate("change", { target: { value: "hello" } })))
    const buttonWrapper = wrapper.find('button').at(1)
    buttonWrapper.simulate('click')
    expect(onSignUp).toHaveBeenCalledTimes(1);
    expect(onSignUp).toHaveBeenCalledWith({
        login: "hello",
        password: "hello",
        passwordConfirmation: 'hello'
    })
})

it('should call function onCancel on "cancel" button click', () => {
    const onCancel = jest.fn()
    const wrapper = mount(<SignUpForm onSignUp={() => { }} onCancel={onCancel} />)
    const buttonWrapper = wrapper.find('button').at(0)
    buttonWrapper.simulate('click')
    expect(onCancel).toHaveBeenCalledTimes(1);
})

it('should show validation alert when pass and passConfirmation doesn"t match ', () => {
    const onSignUp = jest.fn()
    const wrapper = mount(<SignUpForm onSignUp={onSignUp} onCancel={() => { }} />)

    const buttonWrapper = wrapper.find('button').at(1)

    const inputPass = wrapper.find('input[name="password"]')
    const inputPassConfirmation = wrapper.find('input[name="password-confirmation"]')

    inputPass.simulate('change', { target: { value: '123' } })
    inputPassConfirmation.simulate('change', { target: { value: '1234' } })

    buttonWrapper.simulate("click")
    
    const alert = wrapper.exists(".sign-up-form__alert")
    
    
    expect(alert).toBe(true)
    expect(onSignUp).toHaveBeenCalledTimes(0)
})