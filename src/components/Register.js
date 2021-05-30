import { Link } from "react-router-dom";
import ListErrors from "./ListErrors";
import React from "react";
import api from "../api";
import { connect } from "react-redux";
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED,
} from "../constants";

const mapStateToProps = (state) => ({ ...state.auth });

const mapDispatchToProps = (dispatch) => ({
  onChangeEmail: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "email", value }),
  onChangePassword: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "password", value }),
  onChangeUsername: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "username", value }),
  onChangeName: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "name", value }),
  onChangePhone: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "phone", value }),
  onChangeAddress: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "address", value }),
  onSubmit: (username, name, email, phone, address, password) => {
    const payload = api.Auth.register(
      username,
      name,
      email,
      phone,
      address,
      password
    );
    dispatch({ type: REGISTER, payload });
  },
  onUnload: () => dispatch({ type: REGISTER_PAGE_UNLOADED }),
});

class Register extends React.Component {
  constructor() {
    super();
    this.changeEmail = (ev) => this.props.onChangeEmail(ev.target.value);
    this.changePassword = (ev) => this.props.onChangePassword(ev.target.value);
    this.changeUsername = (ev) => this.props.onChangeUsername(ev.target.value);
    this.changeName = (ev) => this.props.onChangeName(ev.target.value);
    this.changePhone = (ev) => this.props.onChangePhone(ev.target.value);
    this.changeAddress = (ev) => this.props.onChangeAddress(ev.target.value);
    this.submitForm = (username, name, email, phone, address, password) => (
      ev
    ) => {
      ev.preventDefault();
      this.props.onSubmit(username, name, email, phone, address, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    const username = this.props.username;
    const name = this.props.name;
    const phone = this.props.phone;
    const address = this.props.address;

    if (this.props.errors !== undefined && this.props.errors !== null) {
      return <div className="auth-page">{this.props.errors.message}</div>;
    }
    
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="/login">Have an account?</Link>
              </p>

              <ListErrors errors={this.props.errors} />

              <form
                onSubmit={this.submitForm(
                  username,
                  name,
                  email,
                  phone,
                  address,
                  password
                )}
              >
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Username"
                      value={this.props.username}
                      onChange={this.changeUsername}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Name Surname"
                      value={this.props.name}
                      onChange={this.changeName}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={this.props.email}
                      onChange={this.changeEmail}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="tel"
                      placeholder="Phone"
                      value={this.props.phone}
                      onChange={this.changePhone}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Address"
                      value={this.props.address}
                      onChange={this.changeAddress}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={this.props.password}
                      onChange={this.changePassword}
                    />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}
                  >
                    Sign up
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
