import { movieAction } from "./movieSlice"

export const getCity = ()=>{
    return async (dispatch)=>{
        try {

            const response = await fetch("http://localhost:5000/city")
            if (!response.ok) {
                throw new Error("Could not fetch city")
            }

            const data = await response.json()
            if (data.length !==0) {
                
                dispatch(movieAction.setCity(data))
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const getMovies = (pageNum)=>{
    return async(dispatch)=>{
        try {

            const response = await fetch(`http://localhost:5000/movies/?page=${pageNum}`)
            if (!response.ok) {
                throw new Error("Could not fetch movies")
            }

            const data = await response.json()
            if (data.length !==0) {
                dispatch(movieAction.setMovies(data))
            }
            return data
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const getMovieDetails =(city)=>{
    return async (dispatch)=>{
        try {
            const response = await fetch(`http://localhost:5000/movies/citywise?name=${city}`)
            if (!response.ok) {
                throw new Error("Could not fetch movies")
            }
            const data = await response.json()
          
            if (data.length !==0) {
                
                dispatch(movieAction.addMovies(data))
               return data
            }
            dispatch(movieAction.addMovies([]))

        } catch (error) {
            console.log(error.message);
        }
    }
}

export const getCinemas = ()=>{
    return async (dispatch)=>{
        try {

            const response = await fetch("http://localhost:5000/cinema")
            if (!response.ok) {
                throw new Error("Could not fetch cinemas")
            }

            const data = await response.json()
            if (data.length !==0) {
                
                dispatch(movieAction.setCinema(data))
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}


export const getMovieBySearch =(movie)=>{
    return async ()=>{
        try {
            const response = await fetch(`http://localhost:5000/movies/search_movie?name=${movie}`)
            if (!response.ok) {
                throw new Error("Could not fetch cinemas")
            }
            const data = await response.json()
            if (data.length !==0) {
               return data
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const getSelectedMovie = (id)=>{
    return async(dispatch)=>{
        try {
            
            const response = await fetch(`http://localhost:5000/movies/${id}`)
            if (!response.ok) {
                throw new Error("Could not fetch movie")
    
            }
            const data = await response.json()
            if (data.length !==0) {
                dispatch(movieAction.setSelectedMovie(data[0]))
                return true
            }
            return false
        } catch (error) {
            console.log(error.message);
        }
    }
}