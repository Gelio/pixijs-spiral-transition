import SpriteLoader from './sprite-loader';
import EventEmitter from './event-emitter';

export default class SlideshowController extends EventEmitter {
  private currentImageNumber = 0;
  private sprites: PIXI.Sprite[] = [];

  constructor(
    private spriteLoader: SpriteLoader,
    private imageUrls: string[],
  ) {
    super();
    this.init();
  }

  async moveToNextImage() {
    this.currentImageNumber = this.nextImageNumber;
    await this.loadImageIfNotLoaded(this.nextImageNumber);
    this.dispatchEvent(new Event('next-sprite-loaded'));
  }

  private async init() {
    const currentSpritePromise = this.loadImageIfNotLoaded(this.currentImageNumber);
    const nextSpritePromise = this.loadImageIfNotLoaded(this.nextImageNumber);

    await currentSpritePromise;
    this.dispatchEvent(new Event('current-sprite-loaded'));
    await nextSpritePromise;
    this.dispatchEvent(new Event('next-sprite-loaded'));
  }

  private async loadImageIfNotLoaded(index: number) {
    if (index < this.sprites.length) {
      return this.sprites[index];
    }

    this.sprites[index] = await this.spriteLoader.loadAndScaleSprite(this.imageUrls[index]);
    return this.sprites[index];
  }

  private get nextImageNumber() {
    return (this.currentImageNumber + 1) % this.imageUrls.length;
  }

  get currentSprite() {
    return this.sprites[this.currentImageNumber];
  }

  get nextSprite() {
    return this.sprites[this.nextImageNumber];
  }
}
