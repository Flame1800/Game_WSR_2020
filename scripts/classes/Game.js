
export default class Game {
    constructor() {
        this.state = {
            pause: false,
            time: {
                min: 0,
                sec: 0,
            }
        };
        this.gameContainer = document.querySelector('.game-container');
        this.player = {
            hp: 100,
            bonuces: 0,
            xFrame: 21.4,
            yFrame: 0,
            frame: 0,
            widthFrame: 20,
            heightFrame: 30,
            x: 30,
            y: 200,
            width: 60,
            height: 80,
            xVelosity: 1.8,
            yVelosity: 1.8,
            prevX: 0,
            prevY: 0,
            jump: false,
            down: false,
            collide: false,
            img: new Image(),
        }
        this.player.img.src = '../../assets/img/player.png';
        this.keys = {
            up: false,
            down: false,
            right: false,
            left: false,
            esc: false,
            space: false
        }

        this.walls = [
            {
                x: 460,
                y: 650,
                height: 30,
                width: 100,
            },
            {
                x: 660,
                y: 550,
                height: 30,
                width: 60,
            },
            {
                x: 760,
                y: 450,
                height: 30,
                width: 100,
            },
            {
                x: 860,
                y: 350,
                height: 30,
                width: 100,
            },
            {
                x: 960,
                y: 250,
                height: 30,
                width: 500,
            },
            {
                x: 860,
                y: 650,
                height: 30,
                width: 100,
            },
            {
                x: 4100,
                y: 300,
                height: 500,
                width: 600,
            },
        ];
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.CANVAS_WIDTH = 4600;
        this.CANVAS_HEIGHT = 720;
        this.canvas.width = this.CANVAS_WIDTH;
        this.canvas.height = this.CANVAS_HEIGHT;
    }

    drawObject = (obj) => {
        if (obj.img) {
            this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
        } else {
            this.ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        }
    }

    collideHanlder = (obj, obst) => {
        if (obj.x + obj.width >= obst.x
            && obj.x <= obst.x + obst.width
            && obj.y + obj.height >= obst.y
            && obj.y <= obst.y + obst.height) {
            return true;
        } else {
            return false;
        }
    }

    controllCollide = (obj, obst) => {
        if (this.collideHanlder(obj, obst)) {
            this.gameContainer.scrollBy(0, 0);

            if (obj.prevX + obj.width <= obst.x) {
                obj.x = obst.x - obj.width;
                obj.xVelosity = 0;
            }
            if (obj.prevX - obst.width >= obst.x) {
                obj.x = obst.x + obst.width;
                obj.xVelosity = 0;
            }
            if (obj.prevY + obj.height <= obst.y) {
                obj.y = obst.y - obj.height;
                // obj.yVelosity = 0;
                obj.jump = false;
            }
            if (obj.prevY >= obst.y + obst.height) {
                obj.y = obst.y + obst.height;
                obj.yVelosity = 0;
            }
        }
    }

    controllView = () => {
        const clientWidth = document.body.clientWidth;
        if (this.player.x >= clientWidth / 2
            && this.player.xVelosity !== 0) {
                // this.player.xVelosity /= 2;
            if (this.keys.right) {
                this.gameContainer.scrollBy(this.player.xVelosity, 0);
            }
            if (this.keys.left) {
                this.gameContainer.scrollBy(-11, 0);
            }
        }
    }

    controllKeys = (e) => {
        const keyListener = e.type === 'keydown' ? true : false;

        switch (e.code) {
            case "KeyW":
                this.keys.up = keyListener;
                break;
            case "KeyA":
                this.keys.left = keyListener;
                break;
            case "KeyS":
                this.keys.down = keyListener;
                break;
            case "KeyD":
                this.keys.right = keyListener;
                break;
        }
    }

    controlMoves = (obj) => {

        if (this.keys.left) {
            obj.xVelosity -= 1.2;
        }

        if (this.keys.right) {
            obj.xVelosity += 1.2;
        }

        if (this.keys.up && !obj.jump) {
            obj.jump = true;
            obj.yVelosity -= 90;
        }

        obj.prevX = obj.x;
        obj.prevY = obj.y;

        obj.yVelosity += 4;

        obj.xVelosity *= 0.9;
        obj.yVelosity *= 0.9;
        obj.x += obj.xVelosity;
        obj.y += obj.yVelosity;

        if (obj.y + obj.height >= this.CANVAS_HEIGHT) {
            obj.y = this.CANVAS_HEIGHT - obj.height;
            obj.jump = false;
        }

        if (obj.x < 0) {
            obj.x = 0;
        }

        if (obj.x + obj.width > this.CANVAS_WIDTH) {
            obj.x = this.CANVAS_WIDTH - obj.width;
        }
    }

    frameControl = () => {
        setInterval(() => this.player.frame++, 100);
    }
    
    playerMoves = () => {
        this.drawObject(this.player);
        this.controlMoves(this.player);
           
        if (this.player.frame > 10) {
            this.player.frame = 0;
        }

        if (this.keys.right) {
            this.player.yFrame = 171;
            this.player.xFrame = 30;
        }

        if (this.keys.left) {
            this.player.yFrame = 110;
            this.player.xFrame = 31.6;
        }
    }

    render = () => {
        this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.playerMoves();

        this.walls.forEach(wall => {
            this.drawObject(wall);
            this.controllCollide(this.player, wall);
        });
        this.controllView();
        document.addEventListener('keydown', this.controllKeys);
        document.addEventListener('keyup', this.controllKeys);
        requestAnimationFrame(this.render);
    }

    start = () => {
        this.frameControl();
        this.render();
    }
}