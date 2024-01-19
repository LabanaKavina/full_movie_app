import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: 'movies',
    initialState:{
       city:[],
       movies:[],
       selectedCity:'',
       cinema:[],
       selectedCinemas:[],
       selectedMovie:null
    },
    reducers:{
        setCity:(state,action)=>{
            state.city = action.payload;
        },
        setMovies:(state,action)=>{
            state.movies.push(...action.payload);
        },   
        addMovies:(state,action)=>{
            state.movies=[]
            if (action.payload.length !==0) {
                state.movies = action.payload 
            }
        },
        setSelectedCity :(state,action)=>{
            state.selectedCity = action.payload
        },
        setCinema:(state,action)=>{
            state.cinema = action.payload
        },
        setSelectedCinema:(state,action)=>{
            state.selectedCinemas= action.payload;
        },
        setSelectedMovie:(state,action)=>{
            state.selectedMovie = action.payload
        }
         
    }
})
export const movieAction = movieSlice.actions
export default movieSlice