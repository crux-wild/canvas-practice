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
    this.minWidth = 682;
    this.minHeight = 383;
    this.canvasHash = this.constructor.getCanvasHash();
  }

  static getCanvasHash() {
    const name = 'tree-diagram';
    const data = Date.now();
    const hash = `${name}-${data}`;
    return hash;
  }

  componentDidMount() {
    const { props: { data } } = this;
    const { canvasHash } = this;
    this.canvasEl = document.querySelector(`#${canvasHash}`);

    // 等待异步数据到达
    Promise.resolve(data)
      .then((data) => {
        this.data = data;
        this.firstTimeResize();
        this.bindResizeEvent();
      });
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

  firstTimeResize() {
    const { minHeight, minWidth, canvasEl } = this;
    const { innerWidth, innerHeight } = window;

    if ((innerWidth < minWidth) && (innerHeight < minHeight)) {
      canvasEl.width = minWidth - 4;
      canvasEl.height = minHeight - 4;
    } else {
      canvasEl.width = innerWidth - 4;
      canvasEl.height = innerHeight - 4;
    }
    this.repaint();
  }

  resize() {
    const { minHeight, minWidth, canvasEl } = this;
    const { innerWidth, innerHeight } = window;

    if ((innerWidth >= minWidth) && (innerHeight >= minHeight)) {
      canvasEl.width = innerWidth - 4;
      canvasEl.height = innerHeight - 4;
      this.repaint();
    }
  }

  repaint() {
    const layout = this.getLayout();
    const { data } = this;

    this.repaintRootNode({ data, layout });
    this.repaintChildNode({ data, layout });
  }

  repaintRootNode({ data, layout  }) {
    const { rootNode: { icon, text, childNode } } = data;
    const { cols, rows } = layout;
    const { canvasEl } = this;

    context.src({ el: canvasEl })
      .pipe(drawLine({ startX: cols[0], startY: rows[1], endX: cols[1], endY: rows[1] }))
      .pipe(drawIconLabel({ x: cols[0], y: rows[1], icon, text }))
  }

  repaintChildNode({ data, layout }) {
    const { rootNode: { childNode } } = data;
    const { cols, rows } = layout;
    const { canvasEl } = this;

    childNode.forEach((node, index) => {
      const { icon, text, leafNode } = node;
      const row = rows[index];

      context.src({ el: canvasEl })
        .pipe(drawLine({ startX: cols[1], startY: row, endX: cols[2], endY: row }))
        .pipe(drawLine({ startX: cols[2], startY: row, endX: cols[3], endY: row }))
        .pipe(drawIconLabel({ x: cols[2], y: row, icon, text }))
    });
    //context.src({ el: canvasEl })
      //.pipe(drawLine({ startX: cols[1], startY: rows[0], endX: cols[1], endY: rows[1] }))
      //.pipe(drawLine({ startX: cols[1], startY: rows[1], endX: cols[1], endY: rows[2] }))
        //.pipe(drawIconText({ x: cols[3], y: rows[0], icon: 'actor', text: 'APT28' }))
        //.pipe(drawIconText({ x: cols[3], y: rows[1], icon: 'actor', text: 'APT28' }))
        //.pipe(drawIconText({ x: cols[3], y: rows[2], icon: 'actor', text: 'APT28' }))
  }

  repaintLeafNode() {
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
