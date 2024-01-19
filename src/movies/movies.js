import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { userAction } from "../login/userSlice";
import { useEffect, useState } from "react";
import {
  getCity,
  getMovieBySearch,
  getMovieDetails,
  getMovies,
  getSelectedMovie,
} from "./movieActions";
import { movieAction } from "./movieSlice";
import MovieList from "./movieList";
import Cinema from "../cinema/cinema";

const Movies = () => {
  const city = useSelector((state) => state.movie.city);
  const selectedCity = useSelector((state) => state.movie.selectedCity);
  const selCinema = useSelector((state) => state.movie.selectedCinemas);
  const movies = useSelector((state) => state.movie.movies);

  const [moviesData, setMoviesData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [searchByMovie, setSearchByMovie] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (movies.length ==0) {
      
      fetchMOvies();
    }
  }, []);

  useEffect(() => {
    applySElectedCinema();
  }, [movies]);

  const fetchMOvies = async () => {
    const movies = await dispatch(getMovies(0));
    setMoviesData(movies);
  };

  useEffect(() => {
    applySElectedCinema();
  }, [selCinema]);

  useEffect(() => {
    sortedCityData();
  }, [selectedCity]);

  const sortedCityData = () => {
    if (selectedCity) {
      const sortedData = sortByCinema(movies);
      setMoviesData(sortedData);
    }
  };

  const applySElectedCinema = () => {
    if (selCinema.length !== 0 && movies.length !== 0) {
      const selectedCine = movies.filter((movie) => {
        return selCinema.includes(movie.cinema_name);
      });
      const selectedSortedCine = sortByCinema(selectedCine);
      setMoviesData(selectedSortedCine );
    } else {
      if (movies.length !== 0) {
        const unselectedSortedCine = sortByCinema(movies);
        setMoviesData(unselectedSortedCine);
      }
      
    }
  };

  const onLogout = () => {
    localStorage.removeItem("key");
    dispatch(userAction.removeUser());
    navigate("/login");
  };

  useEffect(() => {
    if (city.length === 0) {
      dispatch(getCity());
    }
  }, []);

  const cityChange = (event) => {
    const name = event.target.value;
    if (name !== "") {
      dispatch(movieAction.setSelectedCity(name));
      dispatch(getMovieDetails(name));
      applySElectedCinema();
      if (movies.length !== 0) {
        setMoviesData([]);
      }
      return;
    }
    dispatch(movieAction.setSelectedCity(null));
    dispatch(movieAction.addMovies([]));
  };

  const addPageCount = async () => {
    setPageCount(pageCount + 1);
    const data = await dispatch(getMovies(pageCount));
    const existingdata = [...moviesData, ...data];
    setMoviesData(existingdata);
  };

  const sortByCinema = (movie) => {
    if (movie && movie.length !== 0) {
      return movie.filter((m) => m.cinema_name !== selCinema);
    }
    return []
  };

  const searchTextChange = async (value) => {
    if (value.length === 3) {
      const data = await dispatch(getMovieBySearch(value));
      setSearchResults(data && data.length !== 0 ? data : []);
    } else if (value.length < 3) {
      setSearchResults([]);
    }
  };

  const viewMovie = (e) => {
    navigateToMoviePage(e.target.value);
  };

  const navigateToMoviePage = (id) => {
   
    dispatch(getSelectedMovie(id))
    navigate(`/movies/${id}`);
  };
  return (
    <>
      <header className="bg-pink-700 h-16 ">
        {" "}
        <h1 className="text-white text-center text-4xl pt-2">Movies</h1>
      </header>
      <nav className="bg-stone-200	flex h-14 gap-10">
        <div className="w-2/3 flex flex-col">
          <input
            type="text"
            placeholder="Search by Movies"
            onChange={(e) => {
              searchTextChange(e.target.value);
            }}
            className="h-10  mt-2 w-11/12 ml-8 bg-white opacity-60 shadow-md shadow-stone-400 text-xl"
          ></input>
          {searchResults && searchResults.length !== 0 && (
            <div className="flex flex-col w-11/12 ml-8 bg-white z-10">
              {searchResults.map((m) => {
                return (
                  <button
                    className="shadow-sm shadow-gray-300 h-10 text-left pl-10 hover:bg-pink-600 hover:text-white "
                    value={m.id}
                    key={m.name}
                    onClick={(e) => {
                      viewMovie(e);
                    }}
                  >
                    {m.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <select
          className="h-9 mt-2 w-52 text-xl shadow-md shadow-stone-400"
          value={selectedCity}
          onChange={(e) => {
            cityChange(e);
          }}
        >
          <option value="">Select City</option>
          {city &&
            city.length > 0 &&
            city.map((city) => {
              return (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              );
            })}
        </select>

        <button
          onClick={onLogout}
          className="h-9 w-32 text-xl shadow-md shadow-stone-400 relative top-3 right-4 "
        >
          Logout
        </button>
      </nav>

      <div className=" flex mt-10 h-full">
        <Cinema />
        <main className="  h-full pl-10 pr-10 mt-4 w-full flex flex-col ">
          <MovieList
            movies={moviesData}
            navigateToMoviePage={navigateToMoviePage}
          />
          {selCinema.length === 0 && (
            <button
              className=" text-2xl text-pink-800 mt-8 underline h-10 mb-10 w-48 relative left-1/3"
              onClick={() => addPageCount()}
            >
              Explore More...
            </button>
          )}
        </main>
      </div>
    </>
  );
};
export default Movies;
