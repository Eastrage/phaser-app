import { Component, OnInit } from '@angular/core';
import 'phaser';
import {GameScene} from './scenes/game.scene';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-letters-fall',
  templateUrl: './letters-fall.component.html',
  styleUrls: ['./letters-fall.component.less']
})
export class LettersFallComponent implements OnInit  {
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let word = 'DEMO';
      if (params['word']) {
        word = params['word'];
      }

      const game =  new Phaser.Game({
          title: 'Letter fall',
          width: 800,
          height: 600,
          backgroundColor: '#18216D',
          physics: {
            default: 'arcade',
            arcade: {
              debug: false
            }
          },
        });

        game.scene.add('GameScene', GameScene);
        game.scene.start('GameScene', {word});
      });
  }

  constructor(private route: ActivatedRoute) {
  }
}

