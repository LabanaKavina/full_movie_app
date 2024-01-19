import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getSelectedMovie } from "./movieActions";
const MoviePage = () => {
  const movie = useSelector((state) => state.movie.selectedMovie);
  const navigate = useNavigate();
  const params = useParams();
  const movie_id = +params.id
const dispatch = useDispatch()

useEffect(()=>{
    if (movie_id && !movie) {
      fetchSelectedProduct(movie_id)
    }else if (!movie) {
      navigate('/movies')
    }

    
},[])

const fetchSelectedProduct =async (id)=>{
//  const data = await
  dispatch(getSelectedMovie(id))
//  console.log(data);
//  if (!data) {
//   return navigate('/movies')
//  }
}
  return (
    <>
      <header className="bg-pink-700 h-16 ">
        <h1 className="text-white text-center text-4xl pt-2">Movies</h1>
      </header>
      <main>
        {movie && (
          <div className="flex flex-col gap-5 ml-8  w-1/2 text-lg">
            <p className="text-3xl pt-7">{movie.name}</p>
            <p>{movie.description}</p>
            <p>Certificate : {movie.certificate}</p>
            <p>Movie Cast : </p>
            <ul>
              {movie &&
                movie.actor_name.map((m, index) => {
                  return (
                    <>
                      <li className="ml-16" key={m} >
                        {index + 1}. {m}
                      </li>
                    </>
                  );
                })}
            </ul>
            <p>Release Date : {movie.release_date }</p>
            <p>Duration : {movie.duration.hours}:{movie.duration.minutes} hrs
            </p>
          </div>
        )}
      </main>
      <button className="border border-solid border-black h-10 w-24 mt-10 ml-10 bg-pink-600 text-white" onClick={() => navigate("/movies")}>Back</button>
    </>
  );
};
export default MoviePage;
