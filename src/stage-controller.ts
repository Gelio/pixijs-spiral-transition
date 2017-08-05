import SlideshowController from './slideshow-controller';

export default class CanvasController {
  private stage = new PIXI.Container();

  constructor(
    private renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer,
    private slideshowController: SlideshowController,
  ) {
    this.nextImage = this.nextImage.bind(this);
    this.render = this.render.bind(this);

    this.stage.interactive = true;
    this.stage.addListener('click', this.nextImage);

    this.slideshowController.addEventListener('current-sprite-loaded', () => {
      this.stage.addChild(this.slideshowController.currentSprite);
      this.render();
    }, { once: true });
  }

  destroy() {
    this.stage.removeListener('click', this.nextImage);
  }

  render() {
    this.renderer.render(this.stage);
  }

  private nextImage() {
    this.stage.removeChild(this.slideshowController.currentSprite);
    this.stage.addChild(this.slideshowController.nextSprite);
    this.render();
    console.log('moving to next sprite');
    this.slideshowController.moveToNextImage();
  }
}
