import styles from "./ShowGenre.module.scss";

export default function ShowGenre({ imageURL, genre }) {
  return (
    <>
      <div className={styles.artistContainer}>
        <img src={imageURL} />
        <div className={styles.artistInfo}>
          <h3>{genre.name}</h3>
          {genre.description && (
            <>
              <h5>Description:</h5>
              <p>{genre.description}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
