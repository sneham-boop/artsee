import { useEffect, useState } from "react";
import styles from "./artists.module.scss";
import useArtist from "@component/hooks/useArtist";
import Button from "../../components/Button";
import Artist from "@component/components/Artist";
import OtherArtworks from "@component/components/OtherArtworks";

export default function Artists({ artist: defaultArtist, token }) {
  const { getArtist } = useArtist();
  const [imageURL, setImageURL] = useState(null);
  const [artistName, setArtistName] = useState("");
  const [artist, setArtist] = useState(defaultArtist || {});
  const [artworks, setArtworks] = useState({});

  // Set default artist information and image
  useEffect(() => {
    const imgVersions = artist.image_versions;
    let imgLink = artist._links.image.href;
    imgLink = imgLink.replace("{image_version}", imgVersions[1]);
    setImageURL(imgLink);
  }, []);
  // console.log(artist)

  //  Handle the submit via input or button with artists name.
  const handleSubmit = async (event, artistName) => {
    event.preventDefault();

    const apiUrl = `https://api.artsy.net/api/search?q=${artistName.replace(
      " ",
      "%20"
    )}&type=artist`;

    const headers = {
      "X-XAPP-Token": token,
    };

    const response = await getArtist(apiUrl, headers);
    if (!response) return null;
    setImageURL(response.mainArtImage);
    setArtist(response.artist);
    setArtworks(response.artworksInfo);
    setArtistName("");
  };

  const showButtons = () => {
    const artistNames = ["Van Gogh", "Manet", "Monet", "Seurat", "Matisse","Toulouse","Rousseau"];
    return artistNames.map((name, id) => {
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
      <h2>Explore Art By Famous Artists</h2>
      <div className={styles.buttons}>
        {showButtons()}
      </div>
      <div className={styles.artistForm}>
        <label htmlFor="name">Artist name:</label>
        <input
          type="text"
          id="name"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
        />
        <Button
          btnText="Show Me A Painting!"
          onClick={(e) => handleSubmit(e, artistName)}
          custom="submitArtistName"
        />
      </div>

      <Artist imageURL={imageURL} artist={artist} />
      {artworks.length > 0 && (
        <OtherArtworks artworks={artworks} name={artist.name} />
      )}
    </section>
  );
}

export async function getServerSideProps(context) {
  const token = `${process.env.xapp_token}`;
  const headers = { "X-Xapp-Token": token }; // auth header with bearer token

  const resArtist = await fetch(
    "https://api.artsy.net/api/artists/edouard-manet",
    {
      headers,
    }
  );
  const artist = await resArtist.json();
  return {
    props: { artist, token }, // will be passed to the page component as props
  };
}
