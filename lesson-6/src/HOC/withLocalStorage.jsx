import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';


const withLocalStorage = (Component , initialValue , storageKey , label) =>  { 
    class WithLocalStorage extends React.Component {
        static displayName = `withLocalStorage(${Component.displayName || Component.name || ''})`
        state = {
            value : '',
        }

        componentDidMount() {
            let data = localStorage.getItem(storageKey)
            this.setState({value : data ? data : initialValue})
        }

        onChange = (value) => {
            this.setState({value : value} , () =>  localStorage.setItem(storageKey , this.state.value))
        }
        
        render() {
            return <Component value={this.state.value} onChange={this.onChange} label={label} {...this.props}/>
        }
    }
    hoistNonReactStatics(WithLocalStorage , Component)

    return WithLocalStorage
}

export {withLocalStorage}