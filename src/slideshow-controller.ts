import SpriteLoader from './sprite-loader';
import EventEmitter from './event-emitter';

export default class SlideshowController extends EventEmitter {
  currentSprite: PIXI.Sprite;
  nextSprite: PIXI.Sprite;
  private currentImageNumber = 0;

  constructor(
    private spriteLoader: SpriteLoader,
    private imagesList: string[],
  ) {
    super();
    this.init();
  }

  async moveToNextImage() {
    this.currentSprite = this.nextSprite;
    this.currentImageNumber = this.nextImageNumber;
    this.nextSprite = await this.spriteLoader.loadAndScaleSprite(this.imagesList[this.nextImageNumber]);
    this.dispatchEvent(new Event('next-sprite-loaded'));
  }

  private async init() {
    const currentSpritePromise = this.spriteLoader.loadAndScaleSprite(this.imagesList[this.currentImageNumber]);
    const nextSpritePromise = this.spriteLoader.loadAndScaleSprite(this.imagesList[this.nextImageNumber]);


    this.currentSprite = await currentSpritePromise;
    this.dispatchEvent(new Event('current-sprite-loaded'));
    this.nextSprite = await nextSpritePromise;
    this.dispatchEvent(new Event('next-sprite-loaded'));
  }

  private get nextImageNumber() {
    return (this.currentImageNumber + 1) % this.imagesList.length;
  }
}
