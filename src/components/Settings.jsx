import Footer from "./Footer";

export default function Settings({ changePage }) {
  return (
    <>
      <h1>Settings</h1>
      <button>Change Keybinds</button>
      <button onClick={() => changePage("Title")}>
        Return to Title Screen
      </button>
      <Footer />
    </>
  );
}
