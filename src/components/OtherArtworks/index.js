import styles from "./OtherArtworks.module.scss";

export default function OtherArtworks({ artworks, name }) {
  const showOtherArt = () => {
    return artworks.map((art, i) => {
      return (
        <div key={i} className={styles.artwork}>
          <img src={art.imageLink.replace("medium","large")} />
          <div className={styles.artworkInfo}>
            <h3>{art.title}</h3>
            <p>Date: {art.date}</p>
            <p>Medium: {art.medium}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <section className={styles.artworkContainer}>
      <hr></hr>
        <h2>Here are some other artworks by {name}</h2>
        {showOtherArt()}
      </section>
    </>
  );
}
