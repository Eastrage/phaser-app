import 'phaser';
import {ActivatedRoute} from '@angular/router';
import {OnInit} from '@angular/core';

export class GameScene extends Phaser.Scene implements OnInit {
  delta: number;
  lastStarTime: number;
  starsCaught: number;
  starsFallen: number;
  sand: Phaser.Physics.Arcade.StaticGroup;
  info: Phaser.GameObjects.Text;
  word = 'DEMO';
  wordToEmit = this.word.split('');
  letterCount =  0;


ngOnInit(): void {
}

init(data): void {
  this.delta = 1000;
  this.lastStarTime = 0;
  this.starsCaught = 0;
  this.starsFallen = 0;

  this.word = data.word || 'DEMO';
  this.wordToEmit = this.word.split('');
}

preload(): void {
  this.load.setBaseURL('.');
  this.load.image('sky', 'assets/back.png');
  this.load.image('sand', 'assets/xxx.jpg');
}

create(): void {
  this.sand = this.physics.add.staticGroup({
    key: 'sand',
    frameQuantity: 20
  });
  this.add.image(400, 300, 'sky');

  Phaser.Actions.PlaceOnLine(this.sand.getChildren(),
    new Phaser.Geom.Line(20, 580, 820, 580));
  this.sand.refresh();
  this.info = this.add.text(10, 10, '',
      { font: '24px Arial Bold', fill: '#FBFBAC' });
}

update(time: number): void {
  const diff: number = time - this.lastStarTime;
  if (diff > this.delta) {
    this.lastStarTime = time;
    if (this.delta > 500) {
      this.delta -= 20;
    }

    const letter = this.wordToEmit.shift();

    if (letter) {
      this.emitLetter(letter);
    }
  }
  // this.info.text =
  //   this.starsCaught + ' caught - ' +
  //   this.starsFallen + ' fallen (max 3)';
}
private onClick(star: Phaser.Physics.Arcade.Image): () => void {
  return () => {
    // star.setTint(0x00ff00);
    // star.setVelocity(0, 0);
    // this.starsCaught += 1;
    window.location.href = 'https://yandex.ru';
    this.time.delayedCall(100, () => {
      star.destroy();
    }, [star], this);
  };
}

  private onFall(star: Phaser.Physics.Arcade.Image): () => void {
    return () => {
      star.setTint(0xff0000);
      this.starsFallen += 1;
      this.time.delayedCall(100, () => {
        star.destroy();
        if (this.starsFallen > 2) {
          this.scene.start('ScoreScene',
            { starsCaught: this.starsCaught });
        }
      }, [star], this);
    };
  }
  private emitStar(): void {
    let star: Phaser.Physics.Arcade.Image;
    const x = Phaser.Math.Between(25, 775);
    const y = 26;
    star = this.physics.add.image(x, y, 'star');
    star.setDisplaySize(50, 50);
    star.setVelocity(0, 200);
    // star.setInteractive();
    star.setBounceY(Phaser.Math.Between(1, 80) / 100);
    star.setGravityY(180);
    star.on('pointerdown', this.onClick(star), this);
    this.physics.add.collider(star, this.sand);
  }

  private emitLetter(letter: string) {
    const letterSpace = (this.sys.game.canvas.width) / (this.word.length + 1)    ;
    const x =  this.letterCount * letterSpace + letterSpace / 2;
    this.letterCount++;
    const y = 26;

    const text = this.add.text(x, y, letter, { font: '62px Arial Black', fill: '#dddddd' }) as any;
    this.physics.world.enable(text);
    text.setStroke('#de77ae', 16);
    text.setShadow(2, 2, '#333333', 2, true, false);
    text.body.setVelocity(0, 200);
    text.setInteractive();
    text.body.setBounceY(Phaser.Math.Between(30, 80) / 100);
    text.body.setGravityY(180);
    text.on('pointerdown', this.onClick(text), this);
    
    this.physics.add.collider(text, this.sand);
  }
}
