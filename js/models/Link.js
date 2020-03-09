export default class Link extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "link");
    this.scene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.world.enable(this);
    //this.setFrame(14);
    this.setScale(2.0, 2.0);
    this.direction = "idle";
    this.setSize(20, 20);
    this.setOffset(1, 1);
    // create a group for all the player's hitboxes
    //hitboxes = game.add.group();
    this.hitboxes = this.scene.physics.add.group({
      maxSize: 1
    });
    this.walkSpeed = 160;
    this.scene.anims.create({
      key: "right",
      frames: this.scene.anims.generateFrameNumbers("link", { start: 64, end: 69 }),
      frameRate: 10,
      repeat: -1
    });
    this.scene.anims.create({
      key: "left",
      frames: this.scene.anims.generateFrameNumbers("link", { start: 22, end: 27 }),
      frameRate: 10,
      repeat: -1
    });
    this.scene.anims.create({
      key: "up",
      frames: this.scene.anims.generateFrameNumbers("link", { start: 56, end: 63 }),
      frameRate: 10,
      repeat: 0
    });
    this.scene.anims.create({
      key: "down",
      frames: this.scene.anims.generateFrameNumbers("link", { start: 14, end: 21 }),
      frameRate: 20,
      repeat: 0
    });
    this.scene.anims.create({
      key: "idle-left",
      frames: this.scene.anims.generateFrameNumbers("link", { start: 22, end: 23 }),
      frameRate: 10,
      repeat: 0
    });
    this.scene.anims.create({
      key: "idle-right",
      frames: this.scene.anims.generateFrameNumbers("link", { start: 64, end: 65 }),
      frameRate: 10,
      repeat: 0
    });
    this.scene.anims.create({
      key: "idle-up",
      frames: this.scene.anims.generateFrameNumbers("link", { start: 56, end: 57 }),
      frameRate: 10,
      repeat: 0
    });
    this.scene.anims.create({
      key: "idle-down",
      frames: this.scene.anims.generateFrameNumbers("link", { start: 14, end: 15 }),
      frameRate: 10,
      repeat: 0
    });
    this.scene.anims.create({
      key: "down-attack",
      frames: this.scene.anims.generateFrameNumbers("link", { start: 42, end: 46 }),
      frameRate: 20,
      repeat: 0
    });
    this.scene.anims.create({
      key: "left-attack",
      frames: this.scene.anims.generateFrameNumbers("link", { start: 50, end: 54 }),
      frameRate: 20,
      repeat: 0
    });
    this.scene.anims.create({
      key: "up-attack",
      frames: this.scene.anims.generateFrameNumbers("link", { start: 84, end: 88 }),
      frameRate: 20,
      repeat: 0
    });
    this.scene.anims.create({
      key: "right-attack",
      frames: this.scene.anims.generateFrameNumbers("link", { start: 92, end: 96 }),
      frameRate: 20,
      repeat: 0
    });
  }


  // activate a hitbox by namefunction
  enableHitbox() {
    var hitbox = this.hitboxes.getFirstDead(true, 0, 0);
    if (hitbox) {
      hitbox.setActive(true);
      hitbox.setVisible(false);
      hitbox.body.enable = true;
      //hitbox.setSize(100, 100);
      if (this.direction === "left") {
        //hitbox.setPosition(this.x - 60, this.y - 10); //left
        hitbox.setPosition(this.x - hitbox.frame.width * 2 + 5, this.y); //left
        //hitbox.setSize(this.width * 2, this.height / 2);
      } else if (this.direction === "right") {
        //hitbox.setPosition(this.x + 40, this.y - 10); //right
        hitbox.setPosition(this.x + hitbox.frame.width + 5, this.y); //right
        //hitbox.setSize(this.width * 2, this.height / 2);
      } else if (this.direction === "down") {
        //hitbox.setPosition(this.x - 10, this.y + 40); //down
        hitbox.setPosition(this.x, this.y + hitbox.frame.height + 5); //down
        //hitbox.setSize(this.width / 2, this.height * 2);
      } else {
        //hitbox.setPosition(this.x - 10, this.y - 55); //up
        hitbox.setPosition(this.x - 10, this.y - hitbox.frame.height * 2 + 5); //up
        //hitbox.setSize(this.width / 2, this.height * 2);
      }
    }
    return hitbox;
  }
  // disable all active hitboxesfunction
  disableAllHitboxes() {
    this.hitboxes.clear();
  }

  update(cursors) {
    this.setVelocityX(0);
    this.setVelocityY(0);
    if (!this.attack) {
      if (this.isIdle(cursors)) {
        this.anims.stop();
      }
      if (this.direction !== 'idle') {
        this.anims.play(this.direction, true);
      }
      if (cursors.left.isDown) {
        this.direction = "left";
        this.setVelocityX(-this.walkSpeed);
      } else if (cursors.right.isDown) {
        this.direction = "right";
        this.setVelocityX(this.walkSpeed);
      } if (cursors.up.isDown) {
        this.direction = "up";
        this.setVelocityY(-this.walkSpeed);
      } else if (cursors.down.isDown) {
        this.direction = "down";
        this.setVelocityY(this.walkSpeed);
      }
      if (cursors.space.isDown) {
        this.anims.play(this.direction + "-attack", true);
        //prevents from walk
        this.attack = true;
        let hitbox = this.enableHitbox();
        if (hitbox) {
          this.timer = this.scene.time.addEvent({
            delay: 350,
            callback: () => {
              this.attack = false;
              this.anims.play("idle-" + this.direction);

              //disable hitbox
              this.hitboxes.killAndHide(hitbox);
              //disable collision
              hitbox.body.enable = false;
            },
            callbackScope: this,
            repeat: 0
          });
        }
      }

    }

  }
  isIdle(cursors) {
    return !(cursors.right.isDown || cursors.left.isDown ||
      cursors.up.isDown || cursors.down.isDown || cursors.space.isDown);
  }
}
