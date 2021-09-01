import React, { Component } from 'react';
import axios from 'axios';

import Navbar from './components/layout/Navbar';
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import PropTypes from 'prop-types'

import './App.css';


class App extends Component {

  state = {
    users: [],
    loading: false
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


  searchUsers = async text => {
    this.setState({ loading: true })
    const res = await axios.get(`http://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    console.log(res.data.items)
    this.setState({ users: res.data.items, loading: false })
  }

  render() {
    return (
      <div>
        <Navbar title="GitHub Finder" icon="fab fa-github" />
        <div className="container">
          <Search searchUsers={this.searchUsers} />
          <Users users={this.state.users} loading={this.state.loading} />

        </div>
      </div>

    );
  }
}

export default App;
