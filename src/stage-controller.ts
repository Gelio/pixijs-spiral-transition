import SlideshowController from './slideshow-controller';
import SpiralEffect from './effects/spiral.effect';

export default class CanvasController {
  private stage = new PIXI.Container();
  private canvasSize;
  private effect: SpiralEffect;

  constructor(
    private renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer,
    private slideshowController: SlideshowController,
  ) {
    this.nextImage = this.nextImage.bind(this);
    this.render = this.render.bind(this);

    this.canvasSize = {
      width: this.renderer.width,
      height: this.renderer.height,
    };

    this.stage.interactive = true;
    this.stage.addListener('click', this.nextImage);

    this.slideshowController.addEventListener(
      'current-sprite-loaded',
      () => {
        this.stage.addChild(this.slideshowController.currentSprite);
        this.render();
      },
      { once: true },
    );
  }

  destroy() {
    this.stage.removeListener('click', this.nextImage);
  }

  render() {
    this.renderer.render(this.stage);
    console.log('rendered');
  }

  private nextImage() {
    if (this.effect && !this.effect.isDone) {
      return;
    }

    this.stage.removeChildren();
    this.effect = new SpiralEffect(
      this.slideshowController.currentSprite,
      this.slideshowController.nextSprite,
      this.canvasSize,
    );
    this.effect.start(this.stage, this.render);
    this.slideshowController.moveToNextImage();
  }
}
