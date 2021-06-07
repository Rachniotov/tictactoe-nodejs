const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
const board = [' ', ' ', ' ',
    ' ', ' ', ' ',
    ' ', ' ', ' '];


const legend = ['a1', 'b1', 'c1', 'a2', 'b2', 'c2', 'a3', 'b3', 'c3'];

let turn = 1;

const play = async () => {
    if (turn % 2 === 0) {
        console.log('o\'s turn');
    } else {
        console.log('x\'s turn');
    }
    console.log(drawBoard(board));
    let responce = await ask();
    if (!responce) {
        await play();
        return;
    }
    let winner = handleRes(responce, board);
    if (!winner) {
        console.log('You cannot place your piece there!');
        await play();
        return;
    }
    let e = await checkWin(board, winner);
    if (e) {
        rl.close();
        return;
    }
    await play();
};

const drawBoard = (board) => {
    let result = '\n';
    for (let i = 0; i < board.length; i++) {
        if (i === 2 || i === 5 || i === 8) {
            result += `|${board[i]}|\n`;
        } else {
            result += `|${board[i]}`
        }
    }
    return result;
};
const ask = async () => {
    const promis = new Promise((res, rej) => {
        rl.question("where do you want to place your marker? ", (response) => {
            if (response.length <= 1) {
                console.log('Must be a2/b1/c2 etc\n\n');
                res(false);
                return;
            }

            res(response);
        });
    });
    return await promis;
}

const handleRes = (res, board) => {
    let player;
    if (turn % 2 === 0) {
        player = 'o';
    } else {
        player = 'x';
    }
    let whereToPut;

    whereToPut = legend.findIndex((val) => val === res);

    if (board[whereToPut] === ' ') {
        board[whereToPut] = player;
        turn++;
        return player;
    } else {
        return false;
    }
}

const checkWin = async (board, player) => {
    const p = new Promise((res, rej) => {
        for (let char of ['x', 'o']) {
            if (board[0] === char && board[1] === char && board[2] === char) {
                res(true);
                return;
            }
            if (board[3] === char && board[4] === char && board[5] === char) {
                res(true);
                return;
            }
            if (board[6] === char && board[7] === char && board[8] === char) {
                res(true);
                return;
            }
            if (board[0] === char && board[4] === char && board[8] === char) {
                res(true);
                return;
            }
            if (board[2] === char && board[4] === char && board[6] === char) {
                res(true);
                return;
            }
            if (board[0] === char && board[3] === char && board[6] === char) {
                res(true);
                return;
            }
            if (board[1] === char && board[4] === char && board[7] === char) {
                res(true);
                return;
            }
            if (board[2] === char && board[5] === char && board[8] === char) {
                res(true);
                return;
            }
        }
        res(false);
    });
    if (await p) {
        let winner;
        const t = turn -1;
        if (t % 2 === 0) {
            winner = 'o';
        } else {
            winner = 'x';
        }
        console.log(`${winner} WON THIS GAME!!`);
        return true;
    } else {
        return false;
    }
}

(async () => {
    await play()
})()