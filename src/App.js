import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from './components/layout/Alert';
import About from './components/pages/About'
import PropTypes from 'prop-types'

import './App.css';


class App extends Component {

  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: []
  }


  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
  }


  // Search Github Users
  searchUsers = async text => {
    this.setState({ loading: true })
    const res = await axios.get(`http://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    console.log(res.data.items)
    this.setState({ users: res.data.items, loading: false })
  }

  // Clear Users from state
  clearUsers = () => this.setState({ users: [], loading: false })

  // Set Alert
  setAlert = (message, type) => {
    this.setState({ alert: { message, type } })

    setTimeout(() => this.setState({ alert: null }), 3000)
  }

  // Get Single Github user
  getUser = async (username) => {

    this.setState({ loading: true })

    const res = await axios.get(`http://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    console.log(res.data.items)

    this.setState({ user: res.data, loading: false })
  }


  // Gets Users Repos

  getUserRepos = async (username) => {

    this.setState({ loading: true })

    const res = await axios.get(`http://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    console.log(res.data.items)

    this.setState({ repos: res.data, loading: false })
  }





  render() {
    const { repos, users, user, loading } = this.state

    return (
      <Router>
        <div>
          <Navbar title="GitHub Finder" icon="fab fa-github" />
          <div className="container">
            <Alert alert={this.state.alert} />

            <Switch>
              <Route exact path="/" render={props => (
                <Fragment>
                  <Search
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />

                  <Users users={users} loading={loading} />

                </Fragment>
              )} />

              <Route expact path="/about" component={About} />

              <Route exact path="/user/:login" render={props => (
                <User
                  {...props}
                  getUser={this.getUser}
                  getUserRepos={this.getUserRepos}
                  repos={repos}
                  user={user}
                  loading={loading} />
              )} />

            </Switch>

          </div>
        </div>
      </Router>

    );
  }
}

export default App;
