import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCinemas } from "../movies/movieActions";
import { useState } from "react";
import { movieAction } from "../movies/movieSlice";
const Cinema = () => {
  const cinema = useSelector((state) => state.movie.cinema);
  const selCinema = useSelector((state) => state.movie.selectedCinemas);

  const dispatch = useDispatch();

  useEffect(() => {
    if (cinema.length === 0) {
      dispatch(getCinemas());
    }
  }, []);

  
  const cinemaChange = (aEvent) => {
   
    let cine = [...selCinema];
    const isIncluded = cine.includes(aEvent.target.value);
    if (isIncluded) {
      const existingSelectedCinema = cine.filter(
        (cinema) => cinema !== aEvent.target.value
      );
      dispatch(movieAction.setSelectedCinema(existingSelectedCinema));
      return;
    }
    cine.push(aEvent.target.value);
    dispatch(movieAction.setSelectedCinema(cine));
  };

 
  const isChecked = (value) => {
      return selCinema.includes(value);
  };

  return (
    <>
      <div className="w-80 flex flex-col gap-2 h-96 shadow-md shadow-stone-400">
        <h1 className="text-2xl text-center mt-9">Browse by Cinemas</h1>

        {cinema &&
          cinema.length !== 0 &&
          cinema.map((cinema) => {
            return (
              <div key={cinema.name} className=" pt-3 ">
                <input
                  type="checkbox"
                  className="h-5 w-5 mr-3 ml-10 accent-pink-500"
                  value={cinema.name}
                  onChange={(e) => cinemaChange(e)}
                  checked={isChecked(cinema.name)}
                />
                <label htmlFor={cinema.name} className="text-lg text-center">
                  {cinema.name}
                </label>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Cinema;

// const [selectCategories, setSelectCategories] = useState([]);

// useEffect(() => {
//   applyCategory();
// }, [selectCategories]);

// const productCategoriesChange = (aEvent) => {
//   const selectedCategories = [...selectCategories];
//   const isIncluded = selectedCategories.includes(aEvent.target.name);
//   if (isIncluded) {
//     const existingSelectedCategory = selectedCategories.filter(
//       (item) => item !== aEvent.target.name
//     );

//     setSelectCategories(existingSelectedCategory);
//     return;
//   }
//   selectedCategories.push(aEvent.target.name);
//   setSelectCategories(selectedCategories);
// };

// const applyCategory = () => {
//   props.selectCategory(selectCategories);
// };

// const isChecked = (value) => {
//   return selectCategories.includes(value);
// };
