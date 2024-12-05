import { SignIn, SignOut } from "./Auth";
import { useAuthentication } from "../services/authService";

import "./Header.css";

export default function Header() {
  const user = useAuthentication();
  return <header>{!user ? <SignIn /> : <SignOut />}</header>;
}
