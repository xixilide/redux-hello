import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import { Link } from 'react-router';

class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <div>
          <Link to='/'  className="back-home">HOME</Link>
          { this.props.children }
        </div>
      </Provider>
    )
  }
}

export default App;
