import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import Home from './Home';
import reportWebVitals from './reportWebVitals';
import Play from './Play';
import NewGame from "./NewGame";
import Multiplayer from './Multiplayer';
import Nav from './Nav';

export const GameExistsCxt = createContext();

const GameExistsCxtProvider = ({ children }) => {
  const [ game_exists, set_game_exists ] = useState(false);
  const value = { game_exists, set_game_exists };

  return (
    <GameExistsCxt.Provider value = {value}>
      { children }
    </GameExistsCxt.Provider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/new",
    element: <NewGame />
  },
  {
    path: "/play",
    element: <Play />,
  },
  {
    path: "multiplayer",
    element: <Multiplayer />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
