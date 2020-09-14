import React from 'react'
import {mount} from 'enzyme'
import {SignUpForm} from './SignUpForm'


it('should change input value on input information' , () => {
    const wrapper = mount(<SignUpForm onSignUp={() => {}} onCancel={() => {}} />)
    const inputWrapper = wrapper.find('input')
    inputWrapper.forEach( (node) => expect(node.simulate('change' , {target : {value : '123' }})) )
    expect(wrapper.state('login')).toBe('123')
    // inputWrapper.forEach((node) => expect(node.prop('value')).toMatch('123'))

})