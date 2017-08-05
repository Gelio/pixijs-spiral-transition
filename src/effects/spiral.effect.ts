export default class SpiralEffect {
  mask: PIXI.Graphics;
  isDone = false;
  duration = 1000;

  constructor(private previousSprite: PIXI.Sprite, private nextSprite: PIXI.Sprite, private canvasSize: { width: number, height: number }) {
    this.mask = new PIXI.Graphics();
  }

  start(stage: PIXI.Container, renderFunction: () => void) {
    stage.addChild(this.previousSprite);
    stage.addChild(this.nextSprite);
    this.nextSprite.mask = this.mask;

    let startTime: number;

    const requestFrameCallback = (currentTime: number) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const timeElapsed = currentTime - startTime;
      const progress = timeElapsed / this.duration;

      this.setupFrame(progress);
      renderFunction();
      if (progress < 1) {
        requestAnimationFrame(requestFrameCallback);
      } else {
        this.finish();
      }
    }

    requestAnimationFrame(requestFrameCallback);
  }

  setupFrame(progress: number) {
    this.mask.clear();
    this.mask.beginFill(0xFFFFFF, progress);
    this.mask.drawRect(0, 0, this.canvasSize.width, this.canvasSize.height);
    this.mask.endFill();
  }

  finish() {
    this.nextSprite.mask = null;
    this.mask.destroy();
    this.mask = null;
    this.isDone = true;
    console.log('done');
  }
}
