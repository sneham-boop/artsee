import Footer from "../Footer";
import Header from "../Header";
import styles from "./Main.module.scss";
import { useState, useEffect } from "react";

export default function MainLayout({ children }) {
  const [user, setUser] = useState(null);

  return (
    <>
      <div className={styles.main}>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
