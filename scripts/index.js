import GameController from './classes/GameController.js';

const gameController = new GameController;
const startGameBtn = document.querySelector('.start-game');
const nameInput = document.querySelector('.name');

gameController.onScreen('game');

nameInput.addEventListener('input', (e) => {

    if (nameInput.value.length === 0) {
        startGameBtn.style.cursor = 'default';
        startGameBtn.style.background = `rgb(187, 99, 99)`;
    }

    if (nameInput.value.length > 0) {
        startGameBtn.style.background = `rgb(172, 22, 22)`;
        startGameBtn.style.cursor = 'pointer';
    }
});


startGameBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (nameInput.value.length > 0) {
        gameController.onScreen('video');
        let onceClick = true;

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && onceClick) {
                onceClick = false;
                gameController.onScreen('game', nameInput.value);
            }
        })
    }

})