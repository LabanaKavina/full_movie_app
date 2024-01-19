import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./login/userSlice";
import movieSlice from "./movies/movieSlice";

 const store = configureStore({
    reducer:{
        user: userSlice.reducer,
        movie: movieSlice.reducer
    }
})
export default store