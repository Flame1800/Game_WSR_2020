import GameController from './classes/GameController.js';

const gameController = new GameController;
const startGameBtn = document.querySelector('.start-game');
const video = document.querySelector('.video');

gameController.onScreen('game');

// startGameBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     gameController.onScreen('video');

//     document.addEventListener('keydown', (e) => {
//         if (e.code === 'Space') {
//             gameController.onScreen('game');
//         }
//     })
// })

