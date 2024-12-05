import "./Footer.css";

export default function Footer({ language }) {
  return (
    <footer>
      <p>
        {language === "fr"
          ? "Fabriqué par Wesley Ng & Gabriel Garcia"
          : "Made by Wesley Ng & Gabriel Garcia"}
      </p>
      <p>
        GitHub: <a>https://github.com/stacks-Gabe/web-app-final</a>
      </p>
    </footer>
  );
}
