import React, { createContext, useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import Home from './Home';
import Play from './Play';
import Multiplayer from './Multiplayer';
import Bot from './Bot';

export const GameParamsCxt = createContext();
export const BotParamsCxt = createContext();

export const NewGameCxt = createContext();
export const NewBotCxt = createContext();



const GameParamsProvider = ({ children }) => {
  const [ game_params, set_game_params ] = useState( {size: null, num_players: null, names: []} );
  const value = { game_params, set_game_params };

  return (
    <GameParamsCxt.Provider value = {value}>
      { children }
    </GameParamsCxt.Provider>
  );
};

const BotParamsProvider = ({ children }) => {
  const [ bot_params, set_bot_params ] = useState( {size: null, bot_strength: null} );
  const value = { bot_params, set_bot_params };

  return (
    <BotParamsCxt.Provider value = {value}>
      { children }
    </BotParamsCxt.Provider>
  );
};

const NewGameProvider = ({ children }) => {
  const [ new_game, set_new_game ] = useState( false );
  const value = { new_game, set_new_game };

  return (
    <NewGameCxt.Provider value = {value}>
      { children }
    </NewGameCxt.Provider>
  );
};

const BotNewProvider = ({ children }) => {
  const [ new_bot, set_new_bot ] = useState( false );
  const value = { new_bot, set_new_bot };

  return (
    <NewBotCxt.Provider value = {value}>
      { children }
    </NewBotCxt.Provider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/bot",
    element: <Bot />
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
        <BotParamsProvider>
        <NewGameProvider>
        <BotNewProvider>

          <RouterProvider router={router} />

        </BotNewProvider>
        </NewGameProvider>
        </BotParamsProvider>
        </GameParamsProvider>
    );
}