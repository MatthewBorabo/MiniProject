import GameEnv from './GameEnv.js';
import GameObject from './GameObject.js';

class Character extends GameObject {
    static characterArray = [];

    constructor(canvas, image, speedRatio,
        spriteWidth, spriteHeight, spriteScale) {
                var characterArray = [];
        super(canvas, image, speedRatio);
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.spriteScale = spriteScale;
        this.minFrame = 0;
        this.maxFrame = 0;
        this.frameX = 0;  // Default X frame of the animation
        this.frameY = 0;  // Default Y frame of the animation
        this.collisionWidth = spriteWidth * spriteScale;
        this.collisionHeight = spriteHeight * spriteScale;
        Character.characterArray.push(this);
    }

    setMinFrame(minFrame){
        this.minFrame = minFrame;
    }

    setMaxFrame(maxFrame){
        this.maxFrame = maxFrame;
    }

    setFrameX(frameX){
        this.frameX = frameX;
    }

    setFrameY(frameY){
        this.frameY = frameY;
    }

    // Draw dog object
    draw() {
        // Set fixed dimensions and position for the Character
        this.canvas.width = this.spriteWidth * this.spriteScale;
        this.canvas.height = this.spriteHeight * this.spriteScale;
        this.canvas.style.width = `${this.canvas.width}px`;
        this.canvas.style.height = `${this.canvas.height}px`;
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = `${this.x}px`; // Set character horizontal position based on its x-coordinate
        this.canvas.style.top = `${this.y}px`; // Set character up and down position based on its y-coordinate

        this.ctx.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    }

    size() {
        // Calculate proportional x and y positions based on the new screen dimensions
        if (GameEnv.prevInnerWidth) {
            const proportionalX = (this.x / GameEnv.prevInnerWidth) * GameEnv.innerWidth;
            const proportionalY = (this.y / GameEnv.prevBottom) * GameEnv.bottom;
        } else {
            // First Dog Screen Position
            this.setX(GameEnv.innerWidth);
            this.setY(GameEnv.bottom * 1);
        }
    }

    update() {
        this.collisionChecks();
    }

    collisionAction(){
        // default is no action
    }

    collisionChecks() {
        for (var characterObj of Character.characterArray){
            if (this != characterObj ) {
                this.isCollision(characterObj);
                if (this.collisionData.hit){
                    this.collisionAction();
                }
            }
        }
    }

}

export default Character;