import React from 'react';
import './App.css';
import { Albums } from './Albums/Albums';
import { UsersCollection } from './Users/UsersCollection';

class App extends React.Component {
  state = {
    activeUserId: "",
  }

  changeActiveUser = (userId) => {
    if (this.state.activeUserId !== userId) {
      this.setState({ activeUserId: userId })
    }
  }

  render() {
    return (
      <div className='container'>
        <UsersCollection changeActiveUser={this.changeActiveUser} activeUserId={this.state.activeUserId} />
        <Albums />
      </div>
    );
  }
}
export default App;
