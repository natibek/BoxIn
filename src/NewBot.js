import { useState, useContext } from 'react';
import { BotParamsCxt, GameParamsCxt, NewBotCxt } from './App';
import { Modal } from 'react-bootstrap';

const mapBotStrength = {
  0: 'Easy Level',
  1: 'Medium Level',
  2: 'Hard Level',
};

export default function NewBot() {
  const [bot_strength, set_bot_strength] = useState(0);
  const [size, set_size] = useState(5);
  const { bot_params, set_bot_params } = useContext(BotParamsCxt);
  const { new_bot, set_new_bot } = useContext(NewBotCxt);
  const [modalShow, setModalShow] = useState(false);

  const handleGameSetting = () => {
    localStorage.setItem('bot_board', JSON.stringify(null));

    if (bot_strength > 0) {
      handleModalShow();
      return;
    }

    set_bot_params({
      size: Number(size),
      bot_strength: Number(bot_strength),
    });

    set_new_bot(false);
  };

  const handleSizeInput = (e) => {
    const input = e.target.value;
    set_size(input);

    const offset = 32 * (0.5 - (input - e.target.min) / (e.target.max - e.target.min)) - 7;
    const pos = ((input - e.target.min) / (e.target.max - e.target.min)) * 100;
    const display_element = document.getElementById('size_text');

    display_element.style.left = `calc(${pos}% + ${offset}px)`;
  };

  function handleModalShow() {
    setModalShow(!modalShow);
  }

  return (
    <>
      <div
        className="flex_col_center bg-white shadow-lg gap_20 px-3 py-5 m-4 rounded border border-1 border-black modal-md"
        style={{ minHeight: '150px' }}
      >
        <h3 className="text-center "> Bot Setup </h3>

        <div className="input_div gap_10 d-flex flex-column position-relative w-90">
          <h4 className="text-center fs-5">Bot Strength</h4>

          <input
            id="num_players_input"
            onChange={(e) => set_bot_strength(e.target.value)}
            value={bot_strength}
            type="range"
            min="0"
            max="2"
            step="1"
            list="num_markers"
          />

          <div className="legend">
            <span className="legend_min"> Easy </span>
            <span className="legend_min"> Medium </span>
            <span className="legend_max"> Hard </span>
          </div>
        </div>

        <br />
        <div className="input_div d-flex flex-column gap_10 position-relative">
          <h4 className="text-center fs-5">Board Size</h4>

          <input
            id="size_input"
            onChange={handleSizeInput}
            value={size}
            type="range"
            min="5"
            max="20"
            step="1"
            list="size_markers"
          />
          <div id="size_text" className="slider_label">
            {' '}
            {size}{' '}
          </div>

          <div className="legend">
            <span className="legend_min">| 5</span>
            <span className="legend_max">15 |</span>
          </div>
        </div>

        <button
          className="button bg-light-grey rounded px-5 py-2 mt-3"
          onClick={handleGameSetting}
        >
          Play
        </button>
      </div>
      <Modal show={modalShow} onHide={handleModalShow} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <h4>{mapBotStrength[bot_strength]} bot coming soon.</h4>
        </Modal.Body>
      </Modal>
    </>
  );
}
