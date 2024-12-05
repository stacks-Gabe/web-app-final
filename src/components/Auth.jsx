import {
  login,
  logout,
  loggedInUserDisplayName,
} from "../services/authService";

export function SignIn({ language }) {
  return (
    <button className="button is-ghost" id="sign_in_button" onClick={login}>
      {language === "fr" ? "Se Connecter" : "Sign In"}
    </button>
  );
}

export function SignOut({ language }) {
  return (
    <div id="signin">
      {language === "fr" ? "Salut" : "Hello"}, {loggedInUserDisplayName()}
      <button className="button is-ghost" id="sign_out_button" onClick={logout}>
        {language === "fr" ? "Se Déconnecter" : "Sign Out"}
      </button>
    </div>
  );
}
