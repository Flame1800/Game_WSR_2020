export default class Game {
    constructor(name) {
        this.state = {
            pause: false,
            time: {
                min: `00`,
                sec: `00`,
            }
        };
        this.interface = {
            hp: document.querySelector('.hp'),
                bonuses: document.querySelector('.bonuses'),
                timer: document.querySelector('.time'),
                name: document.querySelector('.name-player')
        };
        this.bg = new Image();
        this.bg.src = '../../assets/img/bg.png';
        this.gameContainer = document.querySelector('.game-container');
        this.player = {
            name: name,
            hp: 100,
            bonuces: 0,
            frame: 0,
            x: 30,
            y: 200,
            width: 90,
            height: 80,
            xVelosity: 1.8,
            yVelosity: 1.8,
            prevX: 0,
            prevY: 0,
            jump: false,
            down: false,
            collide: false,
            img: new Image()
        }

        this.keys = {
            up: false,
            down: false,
            right: false,
            left: false,
            esc: false,
            space: false
        }
        this.walls = [{
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
        ];
        this.bonuces = [];

        this.imgWall = new Image();
        this.imgWall.src = '../../assets/img/land.png';
        this.imgBonus = new Image();
        this.imgBonus.src = '../../assets/img/caterpillar.png';
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.CANVAS_WIDTH = 4600;
        this.CANVAS_HEIGHT = 745;
        this.canvas.width = this.CANVAS_WIDTH;
        this.canvas.height = this.CANVAS_HEIGHT;
    }

    getRandomNum = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    drawObject = (obj, img) => {
        if (obj.img) {
            this.ctx.drawImage(obj.img, 90, 0, 600, 450, obj.x, obj.y, obj.width, obj.height);
        } else if (img) {
            this.ctx.drawImage(img, obj.x, obj.y, obj.width, obj.height);
        } else {
            this.ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        }
    }

    generateBonus = () => {
        const randomWallIndex = this.getRandomNum(0, this.walls.length - 1);
        const bonus = {
            x: this.walls[randomWallIndex].x + this.walls[randomWallIndex].width / 2,
            y: this.walls[randomWallIndex].y - 40,
            width: 40,
            height: 40,
        }

        this.bonuces.push(bonus);
    }

    collideHanlder = (obj, obst) => {
        if (obj.x + obj.width >= obst.x &&
            obj.x <= obst.x + obst.width &&
            obj.y + obj.height >= obst.y &&
            obj.y <= obst.y + obst.height) {
            return true;
        } else {
            return false;
        }
    }

    controllCollide = (obj, obst, mode = 'default') => {
        if (mode === 'bonus') {
            if (this.collideHanlder(obj, obst)) {
                this.player.hp += 5;
                this.player.bonuces += 1;   
                const newBonuces = this.bonuces.filter(bonus => obst !== bonus);
                this.bonuces = newBonuces;
            }
        } else {
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
                    obj.jump = false;
                }
                if (obj.prevY >= obst.y + obst.height) {
                    obj.y = obst.y + obst.height;
                    obj.yVelosity = 0;
                }
            }
        }

    }

    controllView = () => {
        const clientWidth = document.body.clientWidth;
        if (this.player.x >= clientWidth / 2 &&
            this.player.xVelosity != 0) {
            if (this.keys.right) {
                this.gameContainer.scrollBy(this.player.xVelosity, 0);
            }
            if (this.keys.left) {
                this.gameContainer.scrollBy(this.player.xVelosity, 0);
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

        if (this.keys.left && !this.player.down) {
            obj.xVelosity -= 1.5;
        }

        if (this.keys.right && !this.player.down) {
            obj.xVelosity += 1.5;
        }

        if (this.keys.up && !obj.jump) {
            obj.jump = true;
            if (!this.player.down) {
                obj.yVelosity -= 90;
            } else {
                this.player.down = false;
            }
        }

        if (this.keys.down) {
            this.player.down = true;
        }

        obj.prevX = obj.x;
        obj.prevY = obj.y;

        obj.yVelosity += 4;

        obj.xVelosity *= 0.9;
        obj.yVelosity *= 0.9;
        obj.x += obj.xVelosity;
        obj.y += obj.yVelosity;

        if (obj.y + obj.height >= this.CANVAS_HEIGHT) {
            if (this.player.down) {
                obj.y = this.CANVAS_HEIGHT + obj.height - 120;
            } else {
                obj.y = this.CANVAS_HEIGHT - obj.height;
                obj.jump = false;
            }
        }

        if (obj.x < 0) {
            obj.x = 0;
        }

        if (obj.x + obj.width > this.CANVAS_WIDTH) {
            obj.x = this.CANVAS_WIDTH - obj.width;
        }
    }

    frameControl = () => {
        setInterval(() => {
            this.player.frame++;
            let framePng = `00${this.player.frame}.png`;
            if (this.player.frame >= 10) {
                framePng = `0${this.player.frame}.png`;
            }

            this.player.img.src = `../../assets/img/player/Idle/Golem_01_Idle_${framePng}`;
            if (this.player.frame === 11) {
                this.player.frame = 0;
            }

            if (this.keys.right) {
                this.player.img.src = `../../assets/img/player/Walking/Golem_01_Walking_${framePng}`;
                if (this.player.frame === 17) {
                    this.player.frame = 0;
                }
            }

            if (this.keys.left) {
                this.player.img.src = `../../assets/img/player/Walking2/Golem_01_Walking_${framePng}`;
                if (this.player.frame === 17) {
                    this.player.frame = 0;
                }
            }

        }, 60);
    }

    playerMoves = () => {
        this.drawObject(this.player);
        this.controlMoves(this.player);

        if (this.player.hp >= 100) {
            this.player.hp = 100;
        }
    }

    render = () => {
        this.interfaceHandler();
        setTimeout(() => {
            if (this.bonuces.length < 2) {
                this.generateBonus();
            }
        }, 2000);

        this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        let fon = this.ctx.createPattern(this.bg, 'repeat');
        this.ctx.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.ctx.fillStyle = fon;

        this.walls.forEach(wall => {
            this.drawObject(wall, this.imgWall);
            this.controllCollide(this.player, wall);
        });
        this.bonuces.forEach(bonus => {
            this.drawObject(bonus, this.imgBonus);
            this.controllCollide(this.player, bonus, 'bonus');
        })

        this.playerMoves();
        this.controllView();
        document.addEventListener('keydown', this.controllKeys);
        document.addEventListener('keyup', this.controllKeys);
        requestAnimationFrame(this.render);
    }

    interfaceHandler = () => {
        this.interface.hp.innerHTML = `HP: ${this.player.hp}`;
        this.interface.bonuses.innerHTML = `Гусениц сьедено: ${this.player.bonuces}`;
        this.interface.timer.innerHTML = `${this.state.time.min}:${this.state.time.sec}`;
        this.interface.name.innerHTML = this.player.name;
    }

    timer = (min = 0, sec = 0) => {
        setTimeout(() => {
            this.player.hp -= 1;

            sec += 1;
            if (sec === 60) {
                sec = 0;
                min += 1;
            }

            this.state.time.sec = sec < 10 ? `0${sec}` : sec;
            this.state.time.min = min < 10 ? `0${min}` : min;

            this.timer(min, sec);
        }, 1000)
    }

    start = () => {
        this.frameControl();
        this.render();
        this.timer();
    }
}