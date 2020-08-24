import Game from "./game.js";

export default class GameScreenController {
    constructor() {
        this.screenState = {
            game: false,
            mainMenu: true,
            video: false,
        }
        this.game = document.querySelector('.game');
        this.mainMenu = document.querySelector('.main-menu');
        this.video = document.querySelector('.video');
    }

    switchState = () => {
        const { game, mainMenu, video } = this.screenState;

        if (game) {
            this.offState();
            this.offStatesScreen();
            this.game.style.display = 'block';
        }

        if (mainMenu) {
            this.offState();
            this.offStatesScreen();
            this.mainMenu.style.display = 'flex';
        }

        if (video) {
            this.offState();
            this.offStatesScreen();
            this.video.style.display = 'flex';
        }
    }

    gameStart = () => {
        this.screenState.game = true;
        this.switchState();
        const game = new Game();
        game.start();
    }

    menuStart = () => {
        this.screenState.mainMenu = true;
        this.switchState();
    }

    videoStart = () => {
        this.screenState.video = true;
        this.switchState();
    }

    offState = () => {
        this.screenState.game = false;
        this.screenState.video = false;
        this.screenState.mainMenu = false;
    }

    offStatesScreen = () => {
        this.game.style.display = 'none';
        this.mainMenu.style.display = 'none';
        this.video.style.display = 'none';
    }
}