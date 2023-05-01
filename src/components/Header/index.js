import Logo from "./Logo";
import Link from "next/link";
import styles from "./Header.module.scss";

export default function Header({ user, login, logout }) {

  return (
    <>
      <nav id="navbar" className={styles.nav}>
        <Link href="/">
          <Logo />
        </Link>
        <div className={styles["nav-right-group"]}>
          <Link href="/explore">Explore Art</Link>
          <Link href="/faqs">FAQs</Link>
        </div>
      </nav>
    </>
  );
}