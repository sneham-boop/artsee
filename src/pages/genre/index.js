import { useEffect, useState } from "react";
import styles from "./genre.module.scss";
import useGenre from "@component/hooks/useGenre";
import Button from "../../components/Button";
import ShowGenre from "@component/components/ShowGenre";
import OtherArtists from "@component/components/OtherArtists";

export default function Genre({ genre: defaultGenre, token }) {
  const { getArtInGenre } = useGenre();
  const [imageURL, setImageURL] = useState(null);
  const [genreName, setGenreName] = useState("");
  const [genre, setGenre] = useState(defaultGenre || {});
  const [artists, setArtists] = useState({});

  // Set default artist information and image
  useEffect(() => {
    const imgVersions = genre.image_versions;
    let imgLink = genre._links.image.href;
    imgLink = imgLink.replace("{image_version}", imgVersions[1]);
    setImageURL(imgLink);
  }, []);
  // console.log(artist)

  //  Handle the submit via input or button with artists name.
  const handleSubmit = async (event, genreName) => {
    event.preventDefault();

    const apiUrl = `https://api.artsy.net/api/search?q=${genreName.replace(
      " ",
      "%20"
    )}&type=gene`;

    const headers = {
      "X-XAPP-Token": token,
    };

    const response = await getArtInGenre(apiUrl, headers);
    if (!response) return null;
    console.log(response);
    setImageURL(response.mainArtImage);
    setGenre(response.genre);
    setArtists(response.artistsInfo);
    setGenreName("");
  };

  const showButtons = () => {
    const genreNames = [
      "Pop Art",
      "New Age",
      "Contemporary Art",
      "Street Art",
      "Modern",
      "Bright Colors",
      "Abstract",
      "Figurative",
      "Expressionism",
    ];
    return genreNames.map((name, id) => {
      return (
        <Button
          key={id}
          btnText={name}
          onClick={(e) => handleSubmit(e, name)}
          custom="exampleArtistNames"
        />
      );
    });
  };

  return (
    <section className={styles.explore}>
      <h2>Explore Art In Different Genres</h2>
      <div className={styles.buttons}>{showButtons()}</div>
      <div className={styles.artistForm}>
        <label htmlFor="name">Enter Genre:</label>
        <input
          type="text"
          id="name"
          value={genreName}
          onChange={(e) => setGenreName(e.target.value)}
        />
        <Button
          btnText="Show Me Some Art!"
          onClick={(e) => handleSubmit(e, genreName)}
          custom="submitArtistName"
        />
      </div>

      <ShowGenre imageURL={imageURL} genre={genre} />
      {artists.length > 0 && (
        <OtherArtists artists={artists} name={genre.name} />
      )}
    </section>
  );
}

export async function getServerSideProps(context) {
  const token = `${process.env.xapp_token}`;
  const headers = { "X-Xapp-Token": token }; // auth header with bearer token

  const resArtist = await fetch(
    "https://api.artsy.net/api/genes/522e169febad64e88d000001",
    {
      headers,
    }
  );
  const genre = await resArtist.json();
  return {
    props: { genre, token }, // will be passed to the page component as props
  };
}
