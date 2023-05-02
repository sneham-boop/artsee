import { useState, useEffect } from "react";

export default function useArtist() {
  async function getArtist(apiUrl, headers) {
    return fetch(apiUrl, { headers })
      .then((response) => response.json())
      .then((data) => {
        const artistLink = data._embedded.results[0]._links.self.href;
        return artistLink;
      })
      .then(async (link) => {
        const response = await fetch(link, { headers });
        const data = await response.json();
        const artist = {...data};
        const imgVersions = artist.image_versions;
        let imageLink = artist._links.image.href;
        imageLink = imageLink.replace("{image_version}", imgVersions[1]);
        return {artist , imageLink};
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return {
    getArtist,
  };
}
