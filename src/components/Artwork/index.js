import styles from "./Artwork.module.scss";

export default function Artwork({ imageURL, artist }) {
  return (
    <>
      <div className={styles.artworkContainer}>
        <img src={imageURL} />
        <div className={styles.artworkInfo}>
          <h3>{artist.name}</h3>
          <p>
            {artist.birthday} - {artist.deathday}
          </p>
          <p>{artist.location}</p>
          <h5>Biography:</h5>
          <p>{artist.biography}</p>
        </div>
      </div>
    </>
  );
}
