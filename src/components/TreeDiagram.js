import React from 'react';

import fluidLayout from 'helpers/layout';

import context from 'helpers/context';

import actorImageUrl from '../images/actor.png';

import hacktoolImageUrl from '../images/hacktool.png';

import losthostImageUrl from '../images/losthost.png';

import drawCircleIcon, {
  drawIconLabel, drawLabel,
  drawLine, drawIconText,
} from 'helpers/shape';

class TreeDiagram extends React.Component {
  constructor(props) {
    super(props);
    this.canvasHash = Date.now();
    this.minWidth = 682;
    this.minHeight = 383;
  }

  componentDidMount() {
    const { canvasHash } = this;
    const canvasEl =  document.getElementById(canvasHash);
    this.loaded = false;
    this.canvasEl = canvasEl;

    this.resize();
    this.bindResizeEvent();
  }

  getLayout() {
    const { width, height } = this.canvasEl;
    const cols = [ 0.05, 0.305, 0.455, 0.95 ];
    const rows = [ 0.1, 0.5, 0.9 ];
    const coordinates = { cols, rows };
    return fluidLayout({ width, height, coordinates });
  }

  bindResizeEvent() {
    const resize = this.resize;
    window.addEventListener('resize', () => {
      if (!this.running) {
        this.running = true;
        window.requestAnimationFrame(resize.bind(this));
        this.running = false;
      }
    });
  }

  resize() {
    const { minHeight, minWidth } = this;
    const { innerWidth, innerHeight } = window;
    if (!(this.loaded)) {
      if ((innerWidth < minWidth) || (innerHeight < minHeight)) {
        this.canvasEl.width = minWidth - 4;
        this.canvasEl.height = minHeight - 4;
      }

      this.repaint();
      this.loaded = true;
    }

    if ((innerWidth >= minWidth) && (innerHeight >= minHeight)) {
      this.canvasEl.width = innerWidth - 4;
      this.canvasEl.height = innerHeight - 4;
      this.repaint();
    }
  }

  repaint() {
    const { cols, rows } = this.getLayout();
    const { loaded, canvasEl } = this;
    context.src({ el: canvasEl })
       // 骨架部分
      .pipe(drawLine({ startX: cols[0], startY: rows[1], endX: cols[2], endY: rows[1] }))
        .pipe(drawLine({ startX: cols[1], startY: rows[0], endX: cols[1], endY: rows[1] }))
        .pipe(drawLine({ startX: cols[1], startY: rows[1], endX: cols[1], endY: rows[2] }))
          .pipe(drawLine({ startX: cols[1], startY: rows[0], endX: cols[2], endY: rows[0] }))
          .pipe(drawLine({ startX: cols[1], startY: rows[2], endX: cols[2], endY: rows[2] }))
            .pipe(drawLine({ startX: cols[2], startY: rows[0], endX: cols[3], endY: rows[0] }))
            .pipe(drawLine({ startX: cols[2], startY: rows[1], endX: cols[3], endY: rows[1] }))
            .pipe(drawLine({ startX: cols[2], startY: rows[2], endX: cols[3], endY: rows[2] }))
      // 图形部分
      .pipe(drawIconLabel({ x: cols[0], y: rows[1], icon: 'hacktool', loaded, text: 'armypress.org' }))
        .pipe(drawIconLabel({ x: cols[2], y: rows[0], icon: 'losthost', loaded , text: '大量与"Sofacy"组织相关的可疑域名。' }))
        .pipe(drawIconLabel({ x: cols[2], y: rows[1], icon: 'losthost', loaded, text: '大量与"Sofacy"组织相关的可疑域名。' }))
        .pipe(drawIconLabel({ x: cols[2], y: rows[2], icon: 'losthost', loaded, text: '大量与"Sofacy"组织相关的可疑域名。' }))
          .pipe(drawIconText({ x: cols[3], y: rows[0], icon: 'actor', loaded, text: 'APT28' }))
          .pipe(drawIconText({ x: cols[3], y: rows[1], icon: 'actor', loaded, text: 'APT28' }))
          .pipe(drawIconText({ x: cols[3], y: rows[2], icon: 'actor', loaded, text: 'APT28' }))
  }

  render() {
    const imageStyle = { display: 'none' };
    return (
      <div>
        <canvas id={this.canvasHash} ></canvas>
        <img id="image-actor" src={actorImageUrl} style={imageStyle} />
        <img id="image-hacktool" src={hacktoolImageUrl} style={imageStyle} />
        <img id="image-losthost" src={losthostImageUrl} style={imageStyle} />
      </div>
    );
  }
}

export default TreeDiagram;
