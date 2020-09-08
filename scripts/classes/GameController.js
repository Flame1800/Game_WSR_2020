import Game from './Game.js';

export default class GameController {
    constructor() {
        this.gameBlock = document.querySelector('.game');
        this.videoBlock = document.querySelector('.video');
        this.menuBlock = document.querySelector('.menu');

        this.stateScreen = {
            gameBlock: false,
            videoBlock: false,
            menuBlock: false,
        }
    }

    domScreenLoad = () => {
        this.gameBlock.style.display = 'none';
        this.menuBlock.style.display = 'none';
        this.videoBlock.style.display = 'none';                

        switch (true) {
            case this.stateScreen.gameBlock:
                this.gameBlock.style.display = 'block';
                break;
            case this.stateScreen.menuBlock:
                this.menuBlock.style.display = 'flex';
                break;
            case this.stateScreen.videoBlock:
                this.videoBlock.style.display = 'flex';                
                break;
        }
    } 

    onScreen = (mode) => {
        this.stateScreen.gameBlock = false;
        this.stateScreen.videoBlock = false;
        this.stateScreen.menuBlock = false;

        switch (mode) {
            case 'game':
                const game = new Game();
                game.start();
                this.stateScreen.gameBlock = true;
                break;
            case 'menu':
                this.stateScreen.menuBlock = true;
                break;
            case 'video':
                this.stateScreen.videoBlock = true;
                break;
        }
        this.domScreenLoad();
    }
}