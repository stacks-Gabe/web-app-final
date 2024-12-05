import { SignIn, SignOut } from "./Auth";
import { useAuthentication } from "../services/authService";

import "./Header.css";

export default function Header() {
  const user = useAuthentication();
  return <header >
      <div >{!user ? <SignIn /> : <SignOut />}</div>
    </header>;
}

