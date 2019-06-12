import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Home from './components/Home';
import Pack from './components/Pack';
import Pets from './components/Pets';
import Found from './components/Found';
import Register from './components/Register';
import Login from './components/Login';
import axios from 'axios';
import PetDetails from './components/PetDetails';
import PetFound from './components/PetFound';



class App extends Component {

  constructor() {
    super();
    this.fetchUser = this.fetchUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  state = {
    user: null,
    err: null
  }

  componentDidMount() {
    axios({
      url: `${process.env.REACT_APP_BACK_END_BASE_URL}/auth/get-user`,
      method: 'post',
      withCredentials: true
    })
    .then((response) => {
      this.setState({
        user: response.data
      })
    })
    .catch(err => {
      this.setState({
        err: err
      })
    });
  }

  fetchUser = (user) => {
    
    this.setState({user: user});
  }

  logout() {
    axios({
      method: 'get',
      withCredentials: true,
      url: `${process.env.REACT_APP_BACK_END_BASE_URL}/auth/logout`
    })
    .then(() => {
      debugger
      this.setState({
        user: null
      })
    })
    .then(() => {
      this.props.history.push('/');
    })
    .catch((err) => {
      debugger
      this.setState({
        err
      })
    });
  }

  render() {
    return (
      <Router>
        <nav className="navbar is-link" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/" >
              <img src="../images/paw-logo.png"  alt="nel" />
            </Link>

            <Link to="/" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarJohnDog">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </Link>
          </div>

          <div id="navbarJohnDog" className="navbar-menu">
            {
              this.state.user ?
              <div className="navbar-start">
                <Link to="/" className="navbar-item">Home</Link>
                <Link to="/myPack" className="navbar-item">My Pack</Link>
                
                <Link to="/pet-details" className="navbar-item">Show Pet Details</Link>
     
                
                <div className="navbar-item has-dropdown is-hoverable">
                  <Link to="/" className="navbar-link">
                    More
                  </Link>
                  <div className="navbar-dropdown">
                    <Link to="/newPet" className="navbar-item">Add Pet</Link>
                    <Link to="/found" className="navbar-item">Dog Found</Link>
                  </div>
                </div>
              </div> 
              :
              <div className="navbar-start">
                <Link to="/" className="navbar-item">Home</Link>
                
              </div>
            }
            
          </div>

          <div className="navbar-end">
          <div className="navbar-item">
              {
                !this.state.user ?
                <div className="buttons">
                  <Link to="/register" className="button is-white">
                    <strong>Sign up</strong>
                  </Link>
                  <Link to="/login" className="button is-light">
                    Log in
                  </Link>
                </div>
                :
                <div className="buttons">
                  <p>Welcome {this.state.user.name}</p>
                  <Link to="/" className="button is-light" onClick={this.logout} >
                    Log out
                  </Link>
                </div>
              }
              
            </div>
          </div>

        </nav>

        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/myPack/:id" render={(props) => <PetDetails {...props} /> } />
          <Route path="/myPack" component={Pack}/>
          <Route path="/newPet" component={Pets}/>
          <Route path="/found" component={Found}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" render={(props) => <Login {...props} fetchUser={this.fetchUser}/>} />
          <Route path="/found/:id" render={(props) => <PetFound {...props} /> } />
        </Switch>
      </Router>
    )
  }
  
}

export default App;
