import './auth.scss';
import React from 'react'
let valueOfEmail;
export default class Signin extends React.Component {
  constructor(props) {
    super();


    this.notValid =  this.notValid.bind(this)
  }



  onSubmit(event) {
    event.preventDefault();
    // console.info('fuck');
    if (valueOfEmail.includes('@')){
      console.info('valid');
    }

    if (!valueOfEmail.includes('@')) {
      console.info('notvalid');
console.info(this.elm);
    }


  }

  onChange(event) {

    valueOfEmail = event.target.value;
    console.info(valueOfEmail);
  }


  empty() {
    this.signUserNameTitle.className = "sign-username title-error-empty";
    this.signUserNameInput.className = "sign-username-input input-error";
  }

  reset() {
    this.signUserNameTitle.className = "sign-username";
    this.signUserNameInput.className = "sign-username-input";
  }

  noUser() {
    this.signUserNameTitle.className = "sign-username title-error-no-user";
    this.signUserNameInput.className = "sign-username-input input-error";
  }

  notValid() {
    this.signUserNameTitle.className = "sign-username title-error-not-valid";
    this.signUserNameInput.className = "sign-username-input input-error";
  }



  render() {


    return (

      <div className="auth">
        <i className="fa fa-mixcloud signup-logo" aria-hidden="true"/>
        <h2 className="sign-title">SongCloud</h2>

        <form className="sign-form" onSubmit={this.onSubmit}>
          <h4>Sign In</h4>

          <p ref={(elm) => this.signUserNameTitle = elm} className="sign-username">Email</p>
          <input ref={(elm) => this.signUserNameInput = elm} className="sign-username-input" type="text" onChange={this.onChange} placeholder="E-mail"/>

          <p className="sign-password">Password</p>
          <input className="sign-username-input" type="password" placeholder="Password"/>

          <button className="sign-submit-btn" type="submit">continue</button>
        </form>


        <div>
          <span className="sign-question">Don't have an account yet ?</span>
          <a className="sign-link" href="#">Create Account</a>
        </div>
        <h2>username Errors</h2>
        <button onClick={() => this.reset()}>username reset</button>
        <br/>
        <button onClick={() => this.empty()}>username error empty value</button>
        <button onClick={() => this.noUser()}>username error noUser value</button>
        <button onClick={() => this.notValid()}>username error notValid value</button>

      </div>
    )
  }
}
