import styles from "./Artist.module.scss";

export default function Artist({ imageURL, artist }) {
  return (
    <>
      <div className={styles.artistContainer}>
        <img src={imageURL} />
        <div className={styles.artistInfo}>
          <h3>{artist.name}</h3>
          <p>
            {artist.birthday} - {artist.deathday}
          </p>
          <p>{artist.location}</p>

          {artist.biography && (
            <>
              <h5>Biography:</h5>
              <p>{artist.biography}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
