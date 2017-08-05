import 'normalize.css';
import * as PIXI from 'pixi.js';
import StageController from './stage-controller';
import SpriteLoader from './sprite-loader';
import SlideshowController from './slideshow-controller';

import imageUrls from './images';

const renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
const spriteLoader = new SpriteLoader({
  width: renderer.width,
  height: renderer.height,
});
const slideshowController = new SlideshowController(spriteLoader, imageUrls);
const stageController = new StageController(renderer, slideshowController);

window.onload = () => {
  document.body.appendChild(renderer.view);
  stageController.render();
};
