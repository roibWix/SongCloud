export default function Signin() {
  return (
    <div className="sign-container">
      <i className="fa fa-mixcloud signup-logo" aria-hidden="true"></i>
      <h2 className="sign-title">SongCloud</h2>

      <form className="sign-form">
        <h4>Sign In</h4>

        <p className="sign-username">Email</p>
        <input className="sign-username-input" type="email" placeholder="E-mail"></input>


        <p className="sign-password">Password</p>
        <input className="sign-username-input" type="password" placeholder="Password"></input>

        <button className="sign-submit-btn" type="submit">continue</button>
      </form>


      <div>
        <span className="sign-question">Don't have an account yet ?</span>
        <a className="sign-link" href="#">Create Account</a>
      </div>
    </div>
  )
}
