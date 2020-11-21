import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../stylesheets/login.css";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangeid = this.onChangeid.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);
    this.state = {
      id: "",
      password: "",
      errors: "",
    };
  }
  onChangeid = (e) => {
    this.setState({
      id: e.target.value,
      errors: "",
    });
  };
  onChangepassword = (e) => {
    this.setState({
      password: e.target.value,
      errors: "",
    });
  };

  render() {
    return (
      <div className="signup-image">
        <div className="bgc"></div>
        <div className="form">
          <h1 className="form-heading">LOG IN</h1>
          <form className="main-form" onSubmit={this.onSubmit}>
            <h1 className="error">{this.state.errors}</h1>
            <input
              required
              type="text"
              className="input"
              name="id"
              value={this.state.id}
              onChange={this.onChangeid}
              placeholder="DOCTOR ID"
            />
            <input
              required
              type="password"
              className="input"
              name="password"
              value={this.state.password}
              onChange={this.onChangepassword}
              placeholder="PASSWORD"
            />
            <button className="form-btn">LOG IN</button>
          </form>
          <h1 className="login-line">
            DON'T HAVE AN ACCOUNT ?{" "}
            <Link to="/signup" className="login-link">
              SIGN UP
            </Link>
          </h1>
        </div>
      </div>
    );
  }
}
