import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { fetchMovie } from "actions";
import { useParams } from "react-router-dom";
import Profile from "components/Profile";
import MovieIntroduction from "./MovieIntroduction";
import MovieImageGridList from "./MovieImageGridList";
import MovieVideoList from "./MovieVideoList";
import MovieCastGridList from "./MovieCastGridList";
import Recommendations from "./Recommendations";

const REQUIRED_FIELDS = ["tagline"];

function MovieProfile() {
  const dispatch = useDispatch();
  const { movieId } = useParams();

  useEffect(() => {
    dispatch(fetchMovie(movieId, REQUIRED_FIELDS));
  }, [movieId, dispatch]);

  return (
    <Profile
      introduction={<MovieIntroduction movieId={movieId} />}
      main={
        <>
          <Typography variant="h6" gutterBottom>
            Videos
          </Typography>
          <MovieVideoList movieId={movieId} />

          <Typography variant="h6" gutterBottom>
            Images
          </Typography>
          <MovieImageGridList movieId={movieId} />

          <Typography variant="h6" gutterBottom>
            Cast
          </Typography>
          <MovieCastGridList movieId={movieId} />
        </>
      }
      rightSide={
        <>
          <Typography variant="h6" gutterBottom>
            Recommendations
          </Typography>
          <Recommendations movieId={movieId} />
        </>
      }
    />
  );
}

export default MovieProfile;