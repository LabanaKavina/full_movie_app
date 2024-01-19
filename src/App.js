import { createBrowserRouter,Navigate,RouterProvider } from "react-router-dom";
import Login from "./login/login";
import Movies from "./movies/movies";
import { checkAuthKey, isLogin } from "./token";
import MoviePage from "./movies/moviepage";

const router = createBrowserRouter([
  {
    path:'/',
    element:<Navigate to='/login' />
  },{
    path:'/login',
    element:<Login />,
    loader: isLogin
  },{
    path:'/movies',
    element:<Movies />,
    loader:checkAuthKey
  },{
    path:"/movies/:id",
    element:<MoviePage />,
    loader:checkAuthKey
  }
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
