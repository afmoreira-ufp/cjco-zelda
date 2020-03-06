import Link from "../models/Link.js";

export default class FirstScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }
  preload() {
    this.load.spritesheet("link", "assets/link.png", {
      frameWidth: 29,
      frameHeight: 29,
      spacing: 1
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
    console.log();
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("link", { start: 64, end: 69 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("link", { start: 22, end: 27 }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("link", { start: 56, end: 63 }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("link", { start: 14, end: 21 }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: "idle-left",
      frames: this.anims.generateFrameNumbers("link", { start: 22, end: 23 }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: "idle-right",
      frames: this.anims.generateFrameNumbers("link", { start: 64, end: 65 }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: "idle-up",
      frames: this.anims.generateFrameNumbers("link", { start: 56, end: 57 }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: "idle-down",
      frames: this.anims.generateFrameNumbers("link", { start: 14, end: 15 }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: "down-attack",
      frames: this.anims.generateFrameNumbers("link", { start: 42, end: 46 }),
      frameRate: 20,
      repeat: 0
    });
    this.anims.create({
      key: "left-attack",
      frames: this.anims.generateFrameNumbers("link", { start: 50, end: 54 }),
      frameRate: 20,
      repeat: 0
    });
    this.anims.create({
      key: "up-attack",
      frames: this.anims.generateFrameNumbers("link", { start: 84, end: 88 }),
      frameRate: 20,
      repeat: 0
    });
    this.anims.create({
      key: "right-attack",
      frames: this.anims.generateFrameNumbers("link", { start: 92, end: 96 }),
      frameRate: 20,
      repeat: 0
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

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
    if (this.link.direction !== 'idle' && !this.link.attack) {
      this.link.anims.play(this.link.direction, true);
    }
    if (this.cursors.left.isDown) {
      this.link.direction = "left";
      this.link.setVelocityX(-160);

    } else if (this.cursors.right.isDown) {
      this.link.direction = "right";
      this.link.setVelocityX(160);
    } else if (this.cursors.up.isDown) {
      this.link.direction = "up";
      this.link.setVelocityY(-160);
    } else if (this.cursors.down.isDown) {
      this.link.direction = "down";
      this.link.setVelocityY(160);
    } else if (this.spaceBar.isDown) {
      if (!this.link.attack) {
        this.link.anims.play(this.link.direction + "-attack", true);
        this.link.attack = true;
        this.link.enableHitbox();
        this.timer = this.time.addEvent({
          delay: 350,
          callback: () => {
            this.link.attack = false;
            this.link.anims.play("idle-" + this.link.direction);
            this.link.disableAllHitboxes();
          },
          callbackScope: this,
          repeat: 0
        });
      }
    } else {
      this.link.setVelocityX(0);
      this.link.setVelocityY(0);
      if (!this.link.attack) {
        this.link.anims.stop();
      }
    }
  }

  disableAllHitboxes() {
    this.link.hitboxes.kill(this.link.hitboxes.getFirst());
  }
}
