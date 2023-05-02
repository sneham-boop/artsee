import styles from "./OtherArtists.module.scss";

export default function OtherArtists({ artists, name }) {
  const showOtherArt = () => {
    return artists.map((artist, i) => {
      return (
        <div key={i} className={styles.artwork}>
          <img src={artist.imageLink.replace("four-thirds","large")} />
          <div className={styles.artworkInfo}>
            <h3>{artist.name}</h3>
            <p>Gender: {artist.gender}</p>
            <p>Born: {artist.birthday}</p>
            <p>Nationality: {artist.nationality}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <section className={styles.artworkContainer}>
      <hr></hr>
        <h2>Here are some other artworks of genre "{name}"</h2>
        {showOtherArt()}
      </section>
    </>
  );
}
