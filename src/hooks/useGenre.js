import { useState, useEffect } from "react";

export default function useGenre() {
  async function getArtInGenre(apiUrl, headers) {
    return fetch(apiUrl, { headers })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Search result is this:", data);
        const searchResultLink = data._embedded.results[0]._links.self.href;
        return searchResultLink;
      })
      .then(async (link) => {
        // Get artist information
        const genreResponse = await fetch(link, { headers });
        const genre = await genreResponse.json();
        // console.log("Got that Genre:", genre);

        // Get their main artwork image
        const imgVersions = genre.image_versions;
        let mainArtImage = genre._links.image.href;
        mainArtImage = mainArtImage.replace("{image_version}", imgVersions[0]);
        // console.log("Link to the main image for this Genre", mainArtImage);

        // Get other artworks
        const otherArtistsLink = genre._links.artists.href;
        const otherArtistsResponse = await fetch(otherArtistsLink, {
          headers,
        });
        const artistsJSON = await otherArtistsResponse.json();
        let { artists } = artistsJSON._embedded;
        let artistsInfo = [];
        if (artists.length > 0) {
          // console.log(
          //   `Got many artworks by that genre from here ${otherArtistsLink}`
          // );
          console.log("Response", artistsJSON);
          artistsInfo = artists.map((artist) => {
            let info = {
              id: artist.id,
              birthday: artist.birthday,
              name: artist.name,
              nationality: artist.nationality,
              gender: artist.gender,
              imageLink: artist._links.thumbnail.href,
            };
            info.imageLink = info.imageLink.replace(
              "{image_version}",
              imgVersions[0]
            );
            return info;
          });
        }
        return { genre, mainArtImage, artistsInfo };
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return {
    getArtInGenre,
  };
}
