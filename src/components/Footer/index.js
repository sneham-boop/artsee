import Button from "../Button";
import styles from "./Footer.module.scss";
import Heart from "@mui/icons-material/FavoriteRounded";

export default function Footer() {
  const btnText = "GO UP";
  const handleScroll = () => {
    const element = document.getElementById("navbar");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className={styles.footer}>
      <section className={styles["made-by"]}>
        <span>Made with </span>
        <span>
          <Heart sx={{ color: "#F9684F" }} />
        </span>
        <span>
          by{" "}
          <a href="https://snehakmahajan.com/" target="_blank">
            Sneha Mahajan
          </a>
        </span>
      </section>
      <p className={styles["coolers-text"]}>
        Inspired by the{" "}
        <a href="https://developers.artsy.net/" target="_blank">
          Artsy API
        </a>
      </p>
    </footer>
  );
}
