
const { Board } = require("./game_logic")
const { Bot } = require("./bot_logic")

function test_level1()
{
    const board = new Board(2, 5, ['', '']);
    const bot = new Bot(0);
    board.apply_move(0, 1);
    const move = bot.recommend_best(board);
    console.log("CHOSEN", move);
}

test_level1();


function test_level2()
{
    const board = new Board(2, 5, ['', 'Bot']);
    const bot = new Bot(1);
    board.apply_move(0, 1);
    const move = bot.recommend_best(board);
    console.log("CHOSEN", move);

}

test_level2();


function test_level3()
{
    const board = new Board(2, 5, ['', 'Bot']);
    const bot = new Bot(2);
    board.apply_move(0, 1);
    const move = bot.recommend_best(board);
    console.log("CHOSEN", move);

}

test_level3();