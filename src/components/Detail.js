import { useState } from "react";
import { useLocation ,useHistory} from "react-router";

import YouTube from "react-youtube";
import './Detail.css'
import axios from '../axios';
import React from "react";

const Detail = (props) => {
  const history = useHistory()

  // the next two statements allow to pass data through link
  //by providing data snapshot (ex: movie,fetchUrl) to state attribute in Link
  const location = useLocation();
  const {movie} = location.state;
  const [isClicked,setIsClicked] = useState(false)
  const [trailerUrl, setTrailerUrl] = useState("");
  const base_url = "https://image.tmdb.org/t/p/original/";
  const API_KEY = "0ef226697833ba81eae2021fdfd063f8";

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };


  console.log("movie", location.state);
    const handleClick = async (movie) => {
      if (trailerUrl) {
        setTrailerUrl("");
      } else {
        let movieTrailer = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`
        );
        setTrailerUrl(movieTrailer.data.results[0].key);
        setIsClicked(true);
      }
    };

    function truncate(string, n) {
      return string?.length > n ? string.substr(0, n - 1) + "..." : string;
    }

// //   useEffect(() => {
// //     async function fetchData() {
// //       const request = await axios.get(fetchUrl);
// //       setDetailData(request.data.results);
// //       return request;
// //     }
// //     fetchData();
// //   }, [fetchUrl]);
// //   console.log(detailData);
// {
//   trailerUrl && (
//     <YouTube className="trailer" videoId={trailerUrl} opts={opts} />
//   );
// }
// // onClick={() => handleClick(movie)}
const infoHtml = (
  <>
    <div className="imageTitle">
      <h1 className="imgTitle">{movie?.title || movie?.original_title}</h1>
    </div>
    <div className="contentMeta">
      <div className="controls">
        <button className="button_play">
          <img className="button_img" alt="" src="/image/play-icon-black.png" />
          <span>Play</span>
        </button>
        <button className="button_trailer" onClick={() => handleClick(movie)}>
          <img className="button_img" alt="" src="/image/play-icon-white.png" />
          <span>Trailer</span>
        </button>
        <div className="addList">
          <span />
          <span />
        </div>
        <div className="groupWatch">
          <div>
            <img
              className="groupWatch_img"
              alt=""
              src="/image/group-icon.png"
            />
          </div>
        </div>
        <div onClick={() => history.push("/")} className="home">
          <div>
            <img className="home_img" alt="" src="/image/home-icon.svg" />
          </div>
        </div>
      </div>
      <div className="description">{truncate(movie?.overview, 200)}</div>
    </div>
  </>
);
  return (
    <div className="container">
      <div className="background">
        <img
          className="backgroundImg"
          alt={movie?.title || movie?.original_title}
          src={base_url + (movie?.backdrop_path || movie?.poster_path)}
        />
      </div>
      {!isClicked ? (
        infoHtml
      ) : (
        <div className="trailer_box">
          {trailerUrl && (
            <YouTube className="trailer" videoId={trailerUrl} opts={opts} />
          )}
          <button
            onClick={() => setIsClicked(false)}
            type="button"
            className="button_exit"
          >
            Exit
          </button>
        </div>
      )}
    </div>
  );
    }



export default Detail;

// to pass data through link https://stackoverflow.com/questions/30115324/pass-props-in-link-react-router
// with query{movie:movie,fetchUrl:fetchUrl}
