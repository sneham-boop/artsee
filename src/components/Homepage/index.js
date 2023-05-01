import styles from "./Homepage.module.scss";

export default function Homepage() {
  return (
    <section className={styles.home}>
      <img src="/logo.svg" />
      <h2 id="heading">
        Explore art by historical artists <a href="/explore">here</a>!
      </h2>
    </section>
  );
}
