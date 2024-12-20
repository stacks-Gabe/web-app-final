import "./ReturnButton.css";
import "./App.jsx";

export default function ReturnButton({ setPage, language }) {
  return (
    <button id='RETURN' onClick={() => setPage("Title")}>
      {language === "fr" ? "Retour au Titre" : "Return to Title"}
    </button>
  );
}
