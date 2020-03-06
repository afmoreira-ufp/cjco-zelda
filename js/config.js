import './phaser.js';

export default {
    type: Phaser.AUTO,
    width: 592,
    height: 503,
    physics: {
      default: "arcade",
      arcade: {
        debug: true
      }
    },    
  };