import Header from "./Header";
import Footer from "./Footer";
import "./Controls.css";

import WasdKeys from "../img/WasdKeys.gif";
import ArrowKeys from "../img/ArrowKeys.gif";
import RKey from "../img/RKey.gif";
import ZKey from "../img/ZKey.gif";
import ReturnButton from "./ReturnButton";

export default function Controls({ changePage }) {
  return (
    <>
      <Header />
      <h1>Controls</h1>
      <img src={WasdKeys} alt="loading..." />
      <img src={ArrowKeys} alt="loading..." />
      <img src={RKey} alt="loading..." />
      <img src={ZKey} alt="loading..." />
      <ReturnButton setPage={changePage}/>
      <Footer />
    </>
  );
}
