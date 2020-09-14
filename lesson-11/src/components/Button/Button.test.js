import React from "react";
import { Button } from "./Button";
import { mount } from "enzyme";

it("should render <Button /> children as <button></button> children", () => {
	const wrapper = mount(<Button>Hello</Button>);
	const buttonWrapper = wrapper.find("button");
    expect(buttonWrapper.text()).toBe("Hello");

	const wrapper2 = mount(<Button> <div>Hello</div></Button>);
    const buttonWrapper2 = wrapper2.find("button")
    const divWrapper2 = buttonWrapper2.find('div');
	expect(divWrapper2.equals(<div>Hello</div>)).toBe(true);
});

it('should call onClick function on button click' , () => { 
    const onClick = jest.fn()
    const wrapper = mount( <Button onClick={onClick}></Button>)
    const buttonWrapper = wrapper.find('button')
    buttonWrapper.simulate('click')
    expect(onClick).toHaveBeenCalledTimes(1)
})

it('should have default class "btn-default" if no kind prop' , () => {
    const wrapper = mount(<Button >Hello</Button>)
    const buttonWrapper = wrapper.find('button')
    const className = buttonWrapper.props().className
    expect(className).toMatch('btn-default')
})

it('should have class "btn-info" if prop kind="info"' , () => {
    const wrapper = mount(<Button kind="info" >Hello</Button>)
    const buttonWrapper = wrapper.find('button')
    const className = buttonWrapper.props().className
    expect(className).toMatch('btn-info')
})

it('should have class "btn-danger" if prop kind="danger"' , () => {
    const wrapper = mount(<Button kind="danger">Hello</Button>)
    const buttonWrapper = wrapper.find('button')
    const className = buttonWrapper.props().className
    expect(className).toMatch('btn-danger')
})

it('should have class "btn-big" if prop isBig=true ' , () => {
    const wrapper = mount(<Button isBig={true}>Hello</Button>)
    const buttonWrapper = wrapper.find('button')
    const className = buttonWrapper.props().className
    expect(className).toMatch('btn-big')
})
