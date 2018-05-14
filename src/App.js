import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import './styles/App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import logo from './images/bloc_jams_logo.png'
class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav>
          <img src={logo} className="App-logo" alt="logo" />
             <Link className ="link"to='/'>Landing</Link>
             <Link className="link"to='/library'>Library</Link>
             

          </nav>
          <h1 className="app-title">Bloc Jams</h1>
        </header>
        <main>
        <Route exact path="/" component={Landing} />
           <Route path="/library" component={Library} />
           <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
