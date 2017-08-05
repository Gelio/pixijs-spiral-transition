import * as PIXI from 'pixi.js';

export default class SpriteLoader {
  constructor(private canvasSize: { width: number; height: number }) {}

  loadSprite(sourceUrl: string): Promise<PIXI.Sprite> {
    const baseTexture = PIXI.BaseTexture.fromImage(sourceUrl);
    const texture = new PIXI.Texture(baseTexture);
    const sprite = new PIXI.Sprite(texture);

    return new Promise((resolve, reject) => {
      baseTexture.addListener('loaded', () => {
        this.removeBaseTextureListeners(baseTexture);
        resolve(sprite);
      });
      baseTexture.addListener('error', () => {
        this.removeBaseTextureListeners(baseTexture);
        reject(new Error(`Unable to load ${sourceUrl}`));
      });
    });
  }

  scaleSprite(sprite: PIXI.Sprite) {
    const canvasSize = this.canvasSize;
    const widthRatio = canvasSize.width / sprite.texture.width;
    const heightRatio = canvasSize.height / sprite.texture.height;

    const scaleRatio = Math.min(widthRatio, heightRatio);
    sprite.anchor.set(0.5, 0.5);
    sprite.scale.set(scaleRatio, scaleRatio);
    sprite.position.set(canvasSize.width / 2, canvasSize.height / 2);
  }

  async loadAndScaleSprite(sourceUrl: string) {
    const sprite = await this.loadSprite(sourceUrl);
    this.scaleSprite(sprite);
    return sprite;
  }

  private removeBaseTextureListeners(baseTexture: PIXI.BaseTexture) {
    baseTexture.removeAllListeners('loaded');
    baseTexture.removeAllListeners('error');
  }
}
