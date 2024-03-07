import React, { createContext, useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import Home from './Home';
import Play from './Play';
import NewGame from "./NewGame";
import Multiplayer from './Multiplayer';

export const GameParamsCxt = createContext();

const GameParamsProvider = ({ children }) => {
  const [ game_params, set_game_params ] = useState( {size: null, num_players: null, names: []} );
  const value = { game_params, set_game_params };

  return (
    <GameParamsCxt.Provider value = {value}>
      { children }
    </GameParamsCxt.Provider>
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

export default function App()
{
    return (
        <GameParamsProvider>
            <RouterProvider router={router} />
        </GameParamsProvider>
    );
}