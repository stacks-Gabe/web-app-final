import {
  login,
  logout,
  loggedInUserDisplayName,
} from "../services/authService";

export function SignIn() {
  return (
    <button className="button is-ghost" id='sign_in_button' onClick={login}>
      Sign In
    </button>
  );
}

export function SignOut() {
  return (
    <div id="signin">
      Hello, {loggedInUserDisplayName()}
      <button className="button is-ghost" id='sign_out_button' onClick={logout}>
        Sign Out
      </button>
    </div>
  );
}
