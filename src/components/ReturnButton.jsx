import "./ReturnButton.css"
import "./App.jsx"

export default function ReturnButton({setPage}) {
    return (
      <button onClick={() => setPage('Title')}>
        Return To Title Screen
      </button>
    );
}