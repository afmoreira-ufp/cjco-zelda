import Link from "../models/Link.js";

export default class FirstScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }
  preload() {
    this.load.spritesheet("link", "assets/link.png", {
      frameWidth: 29,
      frameHeight: 29,
      spacing: 1,
      margin: 0
    });
    this.load.spritesheet("enemy", "assets/sprites-enemies.gif", {
      frameWidth: 18,
      frameHeight: 18,
      spacing: 12
    });
  }
  create() {
    this.link = new Link(this, 200, 200);

    this.enemy = this.physics.add.sprite(400, 400, "enemy", 15);
    this.enemy.setVelocityX(-100);
    this.add.existing(this.enemy);
    this.physics.add.existing(this.enemy);
    this.physics.world.enable(this.enemy);
    this.enemy.setActive(true);
    this.enemy.setScale(2, 2);
    //console.log();

    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.overlap(
      this.link.hitboxes,
      this.enemy,
      () => {
        this.enemy.destroy();
      },
      null,
      this
    );

    this.physics.add.overlap(
      this.link,
      this.enemy,
      () => {
        this.scene.restart();
      },
      null,
      this
    );
  }

  update(time, delta) {
    this.link.update(this.cursors);
  }

  disableAllHitboxes() {
    this.link.hitboxes.kill(this.link.hitboxes.getFirst());
  }
}
