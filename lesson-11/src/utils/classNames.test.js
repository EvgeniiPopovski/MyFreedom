import {classNames} from './classNames'

it('should work with any number of args' , () => {
    let result = classNames('a' , {"b" : true} , 'c')
    expect(result).toBe('a b c')
    let result2 = classNames('a')
    expect(result2).toBe('a')
})

it ('should return empty string if calles with no args', () => {
    let result = classNames()
    expect(result).toMatch('')
})

it ('should ignore non-Sring and non-obj args' , () => {
    let result = classNames(['hello'] , 5)
    expect(result).toMatch('')
})

it ('should provide an arg-string to result string' , () => {
    let argString = 'Hello'
    let argString2 = 'world'
    let result = classNames(argString , argString2)
    expect(result).toMatch(argString)
    expect(result).toMatch(argString2)
})

it('should return obj key as string if key value is truthy' , () => {
    let obj = {'Hello' : 'world' || 5 || [] || {}}
    let result = classNames(obj)
    expect(result).toMatch('Hello')
})