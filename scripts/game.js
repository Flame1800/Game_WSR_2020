
export default class Game {
    constructor() {
        this.state = {
            pause: false,
            time: 0,
        };
        this.player = {
            hp: 100,
            bonuses: 0,
            x: 20,
            y: 30,
            width: 50,
            height: 50,
            velosityX: 1.5,
            velosityY: 1.5,
            jump: false,
            upDown: false,
            image: '',
        }
        this.keys = {
            up: false,
            down: false,
            right: false,
            left: false,
            space: false,
            esc: false,
        }
        this.walls = [];
        this.wall = {};

        this.canvas = document.querySelector('.game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.CANVAS_WIDTH = 1000;
        this.CANVAS_HEIGHT = 500;
        this.canvas.width = this.CANVAS_WIDTH;
        this.canvas.height = this.CANVAS_HEIGHT;
    }

    keyListener = (evt) => {
        let keyState = (evt.type == 'keydown') ? true : false;

        switch (evt.code) {
            case 'KeyW':
                this.keys.up = keyState;
                break;
            case 'KeyS':
                this.keys.down = keyState;
                break;
            case 'KeyA':
                this.keys.right = keyState;
                break;
            case 'KeyD':
                this.keys.left = keyState;
                break;
            case 'Space':
                this.keys.space = keyState;
                break;
            case 'Esc':
                this.keys.esc = keyState;
                break;
        }

    }

    controllMoves = () => {
        let { up, down, right, left, space, esc } = this.keys;
        const obj = this.player;

        if (right) {
            obj.velosityX -= 1.5;
        }

        if (left) {
            obj.velosityX += 1.5;
        }

        if (up && obj.jump === false) {
            obj.velosityY -= 100;
            obj.jump = true;
        }

        if (up && obj.jump === false) {
            obj.velosityY -= 100;
            obj.jump = true;
        }



        obj.velosityY += 5;

        obj.x += obj.velosityX;
        obj.y += obj.velosityY;

        obj.velosityX *= 0.9;
        obj.velosityY *= 0.9;

        if (obj.x <= 0) {
            obj.x = 0;
        }

        if (obj.y + obj.height >= this.CANVAS_HEIGHT) {
            obj.y = this.CANVAS_HEIGHT - obj.height;
            obj.jump = false;
        }

        this.collideHandler(this.player, this.wall)

    }

    collideHandler = (obj, obst) => {
        const isCollided = (obj, obst) => {
            if (obj.x + obj.width >= obst.x 
             && obj.x <= obst.x + obst.width
             && obj.y + obj.height >= obst.y 
             && obj.y <= obst.y + obst.height) {
                return true;
            }
            return false;
        }
    }




    draw = () => {
        this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.drawObject(this.player);

        this.wall = this.createObject(400, 450, 100, 20);
        this.drawObject(this.wall);
    }

    createObject = (x, y, width, height) => {
        return { x, y, width, height }
    }

    drawObject = (obj, img) => {
        this.ctx.fillRect(obj.x, obj.y, obj.width, obj.height);

        if (img) {
            this.ctx.drawImage(img, obj.x, obj.y, obj.width, obj.height);
        }
    }

    drawSprite = (obj) => {
        this.ctx.drawImage(obj.sprite, obj.xFrame * obj.frame, obj.yFrame, obj.widthF, obj.heightF, obj.x, obj.y, obj.width, obj.height);
    }

    render = () => {
        this.draw();
        document.addEventListener('keydown', this.keyListener);
        document.addEventListener('keyup', this.keyListener);
        this.controllMoves();

        requestAnimationFrame(this.render);
    }

    start = () => {
        this.render();
    }
}