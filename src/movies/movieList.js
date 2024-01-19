

const MovieList = (props) => {
  const movies = props.movies;
  
  return (
    <>
      <div className="flex flex-wrap mt-6">
        {movies.length === 0 && (
          <p className="text-black ml-32 opacity-30 text-4xl">
            Sorry in your City no Movies found{" "}
          </p>
        )}
        {movies &&
          movies.length !== 0 &&
          movies.map((movie, index) => {
            return (
              <div className="w-1/4 p-2" key={index}>
                <div className="h-64 shadow-sm shadow-pink-400 text-black flex justify-center items-center flex-col">
                  <p className="text-xl pb-3 text-center italic">
                    {movie.name}
                  </p>
                  <button
                    onClick={() => props.navigateToMoviePage(movie.id)}
                    className="text-xl border border-solid border-black bg-pink-600/50 h-12 w-24 hover:text-white mt-4"
                  >
                    View
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default MovieList;

// city_id(pin):8
// movie_id(pin):733
// movie(pin):"3 Idiots"
// city(pin):"Ahmedabad"
// release_date(pin):"2021-03-31T18:30:00.000Z"
// description(pin):"While attending one of India's premier colleges, three miserable engineering students and best friends struggle to beat the school's draconian system."
// certificate(pin):"A"
// name(pin):"Adventure"
