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
        // Get artist information
        const artistResponse = await fetch(link, { headers });
        const artist = await artistResponse.json();

        // Get their main artwork image
        const imgVersions = artist.image_versions;
        let mainArtImage = artist._links.image.href;
        mainArtImage = mainArtImage.replace("{image_version}", imgVersions[1]);

        // Get other artworks
        const artworksResponse = await fetch(artist._links.artworks.href, {
          headers,
        });
        const artworksJSON = await artworksResponse.json();
        let { artworks } = artworksJSON._embedded;
        let artworksInfo = [];
        if (artworks.length > 0) {
          artworksInfo = artworks.map((art) => {
            let info = {
              id: art.id,
              date: art.date,
              medium: art.medium,
              title: art.title,
              imageLink: art._links.thumbnail.href,
            };
            info.imageLink = info.imageLink.replace(
              "{image_version}",
              imgVersions[0]
            );
            return info;
          });
        }
        return { artist, mainArtImage, artworksInfo };
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return {
    getArtist,
  };
}
