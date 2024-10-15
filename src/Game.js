import { useEffect, useState, useContext } from 'react';
import { GameParamsCxt, NewGameCxt } from './App';
import Board from './game_logic';

const colorScheme = [
  'rgb(107, 170, 255)',
  '#EEE8A9',
  '#00c9b7',
  '#D955DD',
  '#FF8A72',
  '#A3A5DB',
  '#FF5774',
  '#BFA5A5',
];

const r = document.querySelector(':root');

export default function Game() {
  const [game, set_game] = useState();
  const { game_params, set_game_params } = useContext(GameParamsCxt);
  const { new_game, set_new_game } = useContext(NewGameCxt);

  useEffect(() => {
    const cached = JSON.parse(localStorage.getItem('board'));

    if (cached) {
      set_game_params({ size: cached.size, num_players: cached.num_players, names: cached.names });

      const new_board = new Board(
        cached.num_players,
        cached.size,
        cached.names,
        cached.board,
        cached.box_1d,
        cached.turn,
        cached.score,
        cached.done,
        cached.winner
      );

      set_game(new_board);
      r.style.setProperty('--hover-color', colorScheme[cached.turn - 1]);

      setTimeout(() => {
        if (cached.done === true) {
          if (cached.winner.length > 1) {
            const winners = cached.winner.join(', ');
            document.getElementById('turn').textContent = 'Tie between: ' + winners;
          } else if (cached.winner.length === 1)
            document.getElementById('turn').textContent = 'Winner: ' + cached.winner;
        } else document.getElementById('turn').textContent = cached.names[cached.turn - 1];
      }, 100);

      console.log('CACHED GAME');
    } else if (game_params.size && game_params.num_players) {
      let new_board = new Board(game_params.num_players, game_params.size, game_params.names);
      set_game(new_board);
      r.style.setProperty('--hover-color', colorScheme[0]);
      localStorage.setItem('board', JSON.stringify(new_board));

      setTimeout(() => {
        document.getElementById('turn').textContent = new_board.names[new_board.turn - 1];
      }, 100);
      console.log('NEW GAME');
    } else set_new_game(true);
  }, []);

  const is_first_col = (ind) => ind % (game_params.size - 1) === 0;
  const is_last_row = (ind) => Math.floor(ind / (game_params.size - 1)) === game_params.size - 2;

  const get_row_col = (ind, side) => {
    let pos1, pos2;
    const row_inner = Math.floor(ind / (game_params.size - 1));
    const col_inner = ind % (game_params.size - 1);

    switch (side) {
      case 'up':
        pos1 = ind + row_inner;
        pos2 = pos1 + 1;
        break;
      case 'down':
        pos1 = ind + row_inner + game_params.size;
        pos2 = pos1 + 1;
        break;
      case 'right':
        pos1 = ind + 1 + row_inner;
        pos2 = pos1 + game_params.size;
        break;
      case 'left':
        pos1 = ind + row_inner;
        pos2 = pos1 + game_params.size;
        break;
      default:
    }

    const row1 = Math.floor(pos1 / game_params.size);
    const col1 = pos1 % game_params.size;

    return [pos1, pos2, row1, col1];
  };

  const handleClick = (e) => {
    const bar = e.target;

    if (bar.style.backgroundColor === '') {
      const ind = Number(e.target.parentNode.id);

      let [pos1, pos2, ..._] = get_row_col(ind, bar.className);
      const player = game.turn;
      const state = game.apply_move(pos1, pos2);

      if (state !== false) {
        bar.style.backgroundColor = colorScheme[player - 1];
        bar.style.borderStyle = 'none';

        localStorage.setItem('board', JSON.stringify(game));
        r.style.setProperty('--hover-color', colorScheme[game.turn - 1]);

        if (state.length > 0) {
          for (let close_dir of state) {
            const text = document.createTextNode(game.names[game.turn - 1]);
            document.getElementById(String(close_dir)).appendChild(text);
          }
        }

        if (game.done) {
          if (game.winner.length > 1) {
            const winners = game.winner.join(', ');
            document.getElementById('turn').textContent = 'Tie between: ' + winners;
          } else if (game.winner.length === 1)
            document.getElementById('turn').textContent = 'Winner: ' + game.winner;
        } else document.getElementById('turn').textContent = game.names[game.turn - 1];
      }
    }
  };

  const is_connected = (ind, dir) => {
    switch (dir) {
      case 'up':
      case 'down':
        return game.board[get_row_col(ind, dir)[2]][get_row_col(ind, dir)[3]].right;

      case 'left':
      case 'right':
        return game.board[get_row_col(ind, dir)[2]][get_row_col(ind, dir)[3]].down;
      default:
    }
  };

  return (
    <div
      className="flex_col_center p-5 bg-off-white"
      style={{ width: 'fit-content', height: 'fit-content' }}
    >
      <div className="p-3 fs-2" id="turn">
        {' '}
      </div>

      <div
        className="grid_display p-5 rounded shadow-lg border border-1 border-black"
        style={{ '--num-cols': game_params.size - 1 }}
      >
        {game ? (
          game.box_1d.map((name, ind) => (
            <div key={ind} id={ind} className="box flex_col_center">
              {name ? name : ''}
              <div
                onClick={handleClick}
                className="up"
                style={{
                  backgroundColor: `${is_connected(ind, 'up') ? colorScheme[is_connected(ind, 'up') - 1] : ''}`,
                  borderStyle: `${is_connected(ind, 'up') ? 'none' : 'dashed'}`,
                }}
              ></div>

              <div
                onClick={handleClick}
                className="right"
                style={{
                  backgroundColor: `${is_connected(ind, 'right') ? colorScheme[is_connected(ind, 'right') - 1] : ''}`,
                  borderStyle: `${is_connected(ind, 'right') ? 'none' : 'dashed'}`,
                }}
              ></div>

              {is_first_col(ind) ? (
                <div
                  onClick={handleClick}
                  className="left"
                  style={{
                    backgroundColor: `${is_connected(ind, 'left') ? colorScheme[is_connected(ind, 'left') - 1] : ''}`,
                    borderStyle: `${is_connected(ind, 'left') ? 'none' : 'dashed'}`,
                  }}
                ></div>
              ) : (
                <></>
              )}

              {is_last_row(ind) ? (
                <div
                  onClick={handleClick}
                  className="down"
                  style={{
                    backgroundColor: `${is_connected(ind, 'down') ? colorScheme[is_connected(ind, 'down') - 1] : ''}`,
                    borderStyle: `${is_connected(ind, 'down') ? 'none' : 'dashed'}`,
                  }}
                ></div>
              ) : (
                <></>
              )}

              <div className="top-right"></div>

              {is_first_col(ind) ? <div className="top-left"></div> : <></>}
              {is_last_row(ind) ? <div className="bottom-right"></div> : <></>}
              {is_last_row(ind) && is_first_col(ind) ? <div className="bottom-left"></div> : <></>}
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

