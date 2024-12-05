import Header from "./Header";
import Footer from "./Footer";
import ReturnButton from "./ReturnButton";
import "./Controls.css";

import WasdKeys from "../img/WasdKeys.gif";
import ArrowKeys from "../img/ArrowKeys.gif";
import RKey from "../img/RKey.gif";
import ZKey from "../img/ZKey.gif";

export default function Controls({ changePage, language }) {
  return (
    <>
      <Header language={language} />
      <h1>{language === "fr" ? "Contrôles" : "Controls"}</h1>
      <div className="controlsContainer">
        <div className="controlsContainerItem">
          <h2>{language === "fr" ? "Mouvement" : "Movement"}</h2>
          <img src={WasdKeys} alt="loading..." />
          <img src={ArrowKeys} alt="loading..." />
        </div>
        <div className="controlsContainerItem" id="controlsContainerMiniRow">
          <div>
            <h2>{language === "fr" ? "Réinitialiser" : "Reset"}</h2>
            <img src={RKey} alt="loading..." />
          </div>
          <div>
            <h2>{language === "fr" ? "Défaire" : "Undo"}</h2>
            <img src={ZKey} alt="loading..." />
          </div>
        </div>
      </div>
      <ReturnButton setPage={changePage} language={language} />
      <Footer language={language} />
    </>
  );
}
