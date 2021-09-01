import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from './components/layout/Alert';
import About from './components/pages/About'
import PropTypes from 'prop-types'

import './App.css';


class App extends Component {

  state = {
    users: [],
    loading: false,
    alert: null
  }


  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
  }
  // async componentDidMount() {

  //   console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
  //   this.setState({ loading: true })

  //   const res = await axios.get(`http://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
  //   &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

  //   this.setState({ users: res.data, loading: false })


  // }

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



  render() {
    const { users, loading } = this.state

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

            </Switch>

          </div>
        </div>
      </Router>

    );
  }
}

export default App;
