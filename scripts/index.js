import GameScreenController from './screenController.js';

const gameScreen = new GameScreenController;

const startGameButton = document.querySelector('.button-start');
const game = document.querySelector('.game');

startGameButton.addEventListener('click', (e) => {
    e.preventDefault();
    gameScreen.videoStart();
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            gameScreen.gameStart();
        }
    });
});

gameScreen.gameStart();
