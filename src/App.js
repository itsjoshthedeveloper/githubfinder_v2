import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  // async componentDidMount() {
  //   this.setState({ loading: true });

  //   const github = axios.create({
  //     baseURL: 'https://api.github.com',
  //     timeout: 1000,
  //     headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN },
  //   });

  //   const res = await github.get(`https://api.github.com/users`);

  //   this.setState({ users: res.data, loading: false });
  // }

  searchUsers = async (text) => {
    this.setState({ loading: true });

    const github = axios.create({
      baseURL: 'https://api.github.com',
      timeout: 1000,
      headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN },
    });

    const res = await github.get(
      `https://api.github.com/search/users?q=${text}`
    );

    this.setState({ users: res.data.items, loading: false });
  };

  clearUsers = () => this.setState({ users: [], loading: false });

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  render() {
    const { users, loading, alert } = this.state;

    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users users={users} loading={loading} />
        </div>
      </div>
    );
  }
}

export default App;
