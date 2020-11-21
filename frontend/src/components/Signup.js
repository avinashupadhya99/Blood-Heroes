import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../stylesheets/signup.css";

const onRegister = (e, state) => {
  e.preventDefault();
  console.log(state);
};

export class signup extends Component {
  constructor(props) {
    super(props);

    this.onchangename = this.onchangename.bind(this);
    this.onchangeid = this.onchangeid.bind(this);
    this.onchangepassword = this.onchangepassword.bind(this);
    this.onchangehospital = this.onchangehospital.bind(this);

    this.state = {
      name: "",
      id: "",
      password: "",
      hospital: "",
      username: "",
      medcouncil: "",
    };
  }
  onchangename = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  onchangeusername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  onchangeid = (e) => {
    this.setState({
      id: e.target.value,
    });
  };
  onchangepassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  onchangehospital = (e) => {
    this.setState({
      hospital: e.target.value,
    });
  };
  onchangemedc = (e) => {
    console.log(e.target.value);
    this.setState({
      medcouncil: e.target.value,
    });
  };
  render() {
    return (
      <div className="signup-image">
        <div className="bgc"></div>
        <div className="form1">
          <h1 className="form-heading">CREATE ACCOUNT</h1>
          <form
            onSubmit={(e) => onRegister(e, this.state)}
            className="main-form"
          >
            <h1 className="error">{this.state.errors}</h1>
            <input
              type="text"
              required
              className="input"
              value={this.state.name}
              onChange={this.onchangename}
              placeholder="NAME"
            />
            <input
              type="text"
              required
              className="input"
              value={this.state.id}
              onChange={this.onchangeid}
              placeholder="DOCTOR ID"
            />
            <input
              type="text"
              required
              className="input"
              value={this.state.hospital}
              onChange={this.onchangehospital}
              placeholder="HOSPITAL'S NAME"
            />
            <input
              type="text"
              required
              className="input"
              value={this.state.username}
              onChange={this.onchangeusername}
              placeholder="USERNAME"
            />
            <input
              type="password"
              required
              className="input"
              value={this.state.password}
              onChange={this.onchangepassword}
              placeholder="PASSWORD"
            />
            <select
              required
              className="input"
              value={this.state.medcouncil}
              onChange={this.onchangemedc}
            >
              <option value="Andhra Pradesh Medical Council">
                Andhra Pradesh Medical Council
              </option>
              <option value="Arunachal Pradesh Medical Council">
                Arunachal Pradesh Medical Council
              </option>
              <option value="Assam Medical Council">
                Assam Medical Council
              </option>
              <option value="Bhopal Medical Council">
                Bhopal Medical Council
              </option>
              <option value="Bihar Medical Council">
                Bihar Medical Council
              </option>
              <option value="Bombay Medical Council">
                Bombay Medical Council
              </option>
              <option value="Chandigarh Medical Council">
                Chandigarh Medical Council
              </option>
              <option value="Chattisgarh Medical Council">
                Chattisgarh Medical Council
              </option>
              <option value="Delhi Medical Council">
                Delhi Medical Council
              </option>
              <option value="Goa Medical Council">Goa Medical Council</option>
              <option value="Gujarat Medical Council">
                Gujarat Medical Council
              </option>
              <option value="Haryana Medical Councils">
                Haryana Medical Councils
              </option>
              <option value="Himanchal Pradesh Medical Council">
                Himanchal Pradesh Medical Council
              </option>
              <option value="Hyderabad Medical Council">
                Hyderabad Medical Council
              </option>
              <option value="Jammu & Kashmir Medical Council">
                Jammu & Kashmir Medical Council
              </option>
              <option value="Jharkhand Medical Council">
                Jharkhand Medical Council
              </option>
              <option value="Karnataka Medical Council">
                Karnataka Medical Council
              </option>
              <option value="Madhya Pradesh Medical Council">
                Madhya Pradesh Medical Council
              </option>
              <option value="Madras Medical Council">
                Madras Medical Council
              </option>
              <option value="Mahakoshal Medical Council">
                Mahakoshal Medical Council
              </option>
              <option value="Maharashtra Medical Council">
                Maharashtra Medical Council
              </option>
              <option value="Manipur Medical Council">
                Manipur Medical Council
              </option>
              <option value="Medical Council of India">
                Medical Council of India
              </option>
              <option value="Medical Council of Tanganyika">
                Medical Council of Tanganyika
              </option>
              <option value="Mizoram Medical Council">
                Mizoram Medical Council
              </option>
              <option value="Mysore Medical Council">
                Mysore Medical Council
              </option>
              <option value="Nagaland Medical Council">
                Nagaland Medical Council
              </option>
              <option value="Orissa Council of Medical Registration">
                Orissa Council of Medical Registration
              </option>
              <option value="Pondicherry Medical Council">
                Pondicherry Medical Council
              </option>
              <option value="Punjab Medical Council">
                Punjab Medical Council
              </option>
              <option value="Rajasthan Medical Council">
                Rajasthan Medical Council
              </option>
              <option value="Sikkim Medical Council">
                Sikkim Medical Council
              </option>
              <option value="Tamil Nadu Medical Council">
                Tamil Nadu Medical Council
              </option>
              <option value="Telangana State Medical Council">
                Telangana State Medical Council
              </option>
              <option value="Travancore Cochin Medical Council, Trivandrum">
                Travancore Cochin Medical Council, Trivandrum
              </option>
              <option value="Tripura State Medical Council">
                Tripura State Medical Council
              </option>
              <option value="Uttar Pradesh Medical Council">
                Uttar Pradesh Medical Council
              </option>
              <option value="Uttarakhand Medical Council">
                Uttarakhand Medical Council
              </option>
              <option value="Vidharba Medical Council">
                Vidharba Medical Council
              </option>
              <option value="West Bengal Medical Council">
                West Bengal Medical Council
              </option>
            </select>
            <input type="submit" className="form-btn" />
          </form>
          <h1 className="login-line">
            HAVE AN ACCOUNT ?{" "}
            <Link to="/login" className="login-link">
              LOG IN
            </Link>
          </h1>
        </div>
      </div>
    );
  }
}

export default signup;
