import { SignIn, SignOut } from "./Auth";
import { useAuthentication } from "../services/authService";

import "./Header.css";

export default function Header({ language }) {
  const user = useAuthentication();
  return (
    <header>
      <div>
        {!user ? (
          <SignIn language={language} />
        ) : (
          <SignOut language={language} />
        )}
      </div>
    </header>
  );
}
