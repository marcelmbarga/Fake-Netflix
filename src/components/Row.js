import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';
import axios from '../axios';
import './Row.css'
const Row = ({title,fetchUrl, isLargeRow = false}) => {

    const [movies , setMovies] = useState([]);
    const [trailerUrl,setTrailerUrl] = useState('')
    const base_url = "https://image.tmdb.org/t/p/original/";
    const API_KEY = "0ef226697833ba81eae2021fdfd063f8";

    const opts = {
      height: "390",
      width: "100%",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    useEffect( () => {

        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request
        }
        fetchData()
    },[fetchUrl]);

    const handleClick = async (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            let movieTrailer = await axios.get(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`
            );
            setTrailerUrl(movieTrailer.data.results[0].key)
            console.log(movieTrailer);
        }
    }

    return (
      <div className="row">
        <h2>{title}</h2>
        <div className="row_posters">
          {movies.map(
            (movie, key) =>
              ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) && (
                <div
                  className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                  onClick={() => handleClick(movie)}
                  key={movie.id}
                >
                  <Link
                    to={{
                      pathname: "/detail/" + movie.id,
                      state: { movie: movie },
                    }}
                  >
                    <img
                      src={`${base_url}${
                        isLargeRow ? movie?.poster_path : movie?.backdrop_path
                      }`}
                      alt={movie.name}
                    />
                  </Link>
                </div>
              )
          )}
        </div>
        {trailerUrl && (
          <YouTube className="trailer" videoId={trailerUrl} opts={opts} />
        )}
      </div>
    );
}

export default Row;
