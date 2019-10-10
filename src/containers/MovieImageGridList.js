import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieImages } from "actions";
import {
  selectIsFetchingMovieImages,
  selectMovieImages,
  selectMovie
} from "reducers";
import ImageGridList from "components/ImageGridList";
import ImageGalleryModal from "components/ImageGalleryModal";

function MovieImageGridList({ movieId }) {
  const dispatch = useDispatch();
  const movie = useSelector(state => selectMovie(state, movieId));
  const filePaths = useSelector(state => selectMovieImages(state, movieId));
  const isFetching = useSelector(state =>
    selectIsFetchingMovieImages(state, movieId)
  );

  useEffect(() => {
    dispatch(fetchMovieImages(movieId));
  }, [dispatch, movieId]);

  return (
    <>
      <ImageGridList filePaths={filePaths} isFetching={isFetching} />
      <ImageGalleryModal
        title={movie ? movie.title : ""}
        filePaths={filePaths}
      />
    </>
  );
}

export default MovieImageGridList;