import { useEffect } from "react";

const MovieModal = (props) => {
  useEffect(() => {
    console.log(props.selectedMovieData);
  }, [props.selectedMovieData]);

  return (
    <div
      className="modal-container"
      style={{ display: props.selectedMovieData ? "flex" : "none" }}
    >
      <div className="modal">
        <img
          src={`https://image.tmdb.org/t/p/original/${props.selectedMovieData?.backdrop_path}`}
          alt={`${props.selectedMovieData?.title} Backdrop Image`}
          className="modal-backdrop"
        />
        <h2 style={{ alignSelf: "center" }}>
          {props.selectedMovieData?.title}
        </h2>
        <section className="modal-summary">
        </section>
      </div>
    </div>
  );
};

export default MovieModal;
