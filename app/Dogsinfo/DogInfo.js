"use client";

import React, { useState } from "react";
import Image from "next/image";

const DogInfo = () => {
  const [dogBreeds, setDogBreeds] = useState(null);
  const [dogImages, setDogImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [selectedBreed, setSelectedBreed] = useState(null);

  const fetchDogBreeds = () => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched dog breeds:", data.message);
        setDogBreeds(data.message);
      })
      .catch((error) => {
        console.error("Error fetching dog breeds:", error);
        setError(error.message);
      });
  };

  const fetchDogImages = (breed) => {
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched dog images:", data.message);
        setDogImages([data.message]);
        setSelectedBreed(breed);
      })
      .catch((error) => {
        console.error("Error fetching dog images:", error);
        setError(error.message);
      });
  };

  const fetchRandomDogImage = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched random dog image:", data.message);
        setDogImages([data.message]);
        setSelectedBreed(null);
      })
      .catch((error) => {
        console.error("Error fetching random dog image:", error);
        setError(error.message);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetchDogImages(searchTerm.toLowerCase());
    }
  };

  return (
    <div>
      <button className="btn btn-primary m-2" onClick={fetchDogBreeds}>
        Fetch Dog Breeds
      </button>
      <button className="btn btn-secondary m-2" onClick={fetchRandomDogImage}>
        Fetch Random Dog Image
      </button>
      <form onSubmit={handleSearch} className="m-2">
        <input
          type="text"
          placeholder="Search for a breed"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
        />
        <button type="submit" className="btn btn-secondary mt-2">
          Search
        </button>
      </form>
      {error && <p>Error fetching dog info: {error}</p>}
      {dogBreeds ? (
        <div>
          <h2>Dog Breeds</h2>
          <ul>
            {Object.keys(dogBreeds).map((breed) => (
              <li key={breed}>
                <button
                  className="btn btn-link"
                  onClick={() => fetchDogImages(breed)}
                >
                  {breed}
                </button>
                {dogBreeds[breed].length > 0 && (
                  <ul>
                    {dogBreeds[breed].map((subBreed) => (
                      <li key={subBreed}>
                        <button
                          className="btn btn-link"
                          onClick={() => fetchDogImages(`${breed}/${subBreed}`)}
                        >
                          {subBreed}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No breeds data fetched yet.</p>
      )}
      {selectedBreed && (
        <div>
          <h2>Breed Information</h2>
          <p>Breed: {selectedBreed}</p>
          <p>Origin: [Origin Information]</p>
          <p>Size: [Size Information]</p>
          <p>Temperament: [Temperament Information]</p>
        </div>
      )}
      {dogImages.length > 0 && (
        <div>
          <h2>Dog Images</h2>
          <div className="d-flex flex-wrap">
            {dogImages.map((image, index) => (
              <div key={index} className="m-2">
                <Image
                  src={image}
                  alt="Dog"
                  width={200}
                  height={200}
                  layout="responsive"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DogInfo;
