import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import cx from 'classnames';

import { setUsername, getUserLists } from './action';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      showForm: true,
    }
  }

  componentDidMount() {
    this.props.getUserLists();
  }

  setUserName = (e) => {
    this.setState({
      error: '',
      username: e.target.value
    });
  }

  setPassword = (e) => {
    this.setState({
      error: '',
      password: e.target.value
    })
  }

  onSubmitForm = () => {

    if ((_.isEmpty(this.state.username) && _.isEmpty(this.state.password))) {
      this.setState({
        error: 'Please enter the username and password',
      });
    } else if (this.state.password.length < 6 || _.isEmpty(this.state.password)) {
      this.setState({
        error: 'Password must be at least 6 characters long.'
      });
    } else {
      this.setState({
        error: 'Please enter the valid username'
      });
    }

    if (this.state.username === 'hruday@gmail.com' && this.state.password === 'hruday123') {
      this.setState({
        showForm: false,
      });
    }
  }

  renderUserLists = (user) => {
    const { age, email, gender, id, name, phoneNo } = user;

    return (
      <div className='user-details' key={id}>
        <div>age: {age}</div>
        <div>email: {email}</div>
        <div>gender: {gender}</div>
        <div>id: {id}</div>
        <div>name: {name}</div>
        <div>phoneNo: {phoneNo}</div>
      </div>
    );
  }

  renderErrorMessage = () => {
    return <div className='login-error-message'>
      {this.state.error}
    </div>;
  }

  render() {
    const { showForm, username, password, error } = this.state;
    const { userList } = this.props;

    return (
      <Fragment>
        {showForm ?
          <Fragment>
            {!_.isEmpty(error) && this.renderErrorMessage()}
            <form className="login__form">
              <div className='login-field'>
                <span>Username: </span>
                <input type='text' onChange={this.setUserName} value={username} />
              </div>
              <div className='login-field'>
                <span>Password: </span>
                <input type='password' onChange={this.setPassword} value={password} />
              </div>
              <div className={cx('btn-login', { 'active': !_.isEmpty(username) && !_.isEmpty(password) })} onClick={this.onSubmitForm}>LOGIN</div>
            </form>
          </Fragment>
          : <div className='users'>
            <div><strong>User Lists</strong></div>
            {_.map(userList, user => this.renderUserLists(user))}
          </div>}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userList: _.get(state, 'reduxStore.userList', []),
  };
};

const matchDispatchToProps = dispatch => bindActionCreators({
  setUsername,
  getUserLists,
}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(Login);

