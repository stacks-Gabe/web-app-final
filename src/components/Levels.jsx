export default function Levels({ changePage }) {
  return (
    <>
      <h1>Levels</h1>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button onClick={() => changePage("Game")}>5</button>
      <button onClick={() => changePage("Title")}>
        Return to Title Screen
      </button>
    </>
  );
}
