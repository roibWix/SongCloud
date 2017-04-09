export default function Signup() {
  return (
    <div className="auth">
      <i className="fa fa-mixcloud signup-logo" aria-hidden="true"/>
      <h2 className="sign-title">SongCloud</h2>

      <form className="sign-form">
        <h4 className="sign-action-title">Create account</h4>

        <label htmlFor="username-input" className="sign-username">Email</label>
        <input id="username-input" className="sign-username-input" type="text" placeholder="E-mail"/>


        <label htmlFor="password-input" className="sign-password">Password</label>
        <input id="password-input" className="sign-username-input" type="password" placeholder="Password"/>

        <button className="sign-submit-btn" type="submit">continue</button>
      </form>


      <div>
        <span className="sign-question">Already have an account ?</span>
        <a className="sign-link" href="#">Sign in</a>
      </div>
    </div>
  )
}
