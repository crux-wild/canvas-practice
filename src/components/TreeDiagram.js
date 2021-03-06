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
    this.height = 0;
    this.minWidth = 540;
    this.canvasHash = TreeDiagram.getCanvasHash();
  }

  static getCanvasHash() {
    const name = 'tree-diagram';
    const data = Date.now();
    const hash = `${name}-${data}`;
    return hash;
  }

  static getMinHeight({ lineNumbers }) {
    return 105 * lineNumbers;
  }

  static getRows({ lineNumbers=0 } = {}) {
    const per = 1 / lineNumbers;
    const array = new Array(lineNumbers);
    array.fill(per);
    return array.map((per, index) => {
      const coordinate = per * index  + per / 2;
      return coordinate;
    })
  }


  componentDidMount() {
    const { props: { data } } = this;
    const { canvasHash } = this;
    this.canvasEl = document.querySelector(`#${canvasHash}`);

    Promise.resolve(data)
    .then((data) => {
      const { rootNode: { childNode } } = data;
      const lineNumbers = childNode.length;

      this.data = data;
      this.minHeight = TreeDiagram.getMinHeight({ lineNumbers });

      this.firstTimeResize();
      this.bindResizeEvent();
    });
  }

  getLayout({ lineNumbers=0 } = {}) {
    const { width, height } = this.canvasEl;
    const rows = this.constructor.getRows({ lineNumbers });
    const cols = [ 0.05, 0.43, 0.55, 0.95 ];
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

    if ((innerWidth < minWidth) || (innerHeight < minHeight)) {
      canvasEl.height = minHeight - 4;

      if (innerWidth < minWidth) {
        canvasEl.width = minWidth - 4;
      } else {
        canvasEl.width = innerWidth - 4;
      }
    } else {
      canvasEl.width = innerWidth - 4;
      canvasEl.height = innerHeight - 4;
    }

    this.height = canvasEl.height;
    this.repaint();
  }

  resize() {
    const { minHeight, minWidth, canvasEl } = this;
    const { innerWidth, innerHeight } = window;

    if ((innerWidth >= minWidth) || (innerHeight >= minHeight)) {
      canvasEl.width = innerWidth - 4;
      canvasEl.height = innerHeight - 4;

      if (innerHeight < minHeight) {
        canvasEl.height = minHeight - 4;
      }

      if (innerWidth < minWidth) {
        canvasEl.width = minWidth - 4;
      }

      this.height = canvasEl.height;
      this.repaint();
    }
  }

  getMiddle() {
    return this.height / 2;
  }

  repaint() {
    const { data: { rootNode } } = this;
    const { childNode: { length: lineNumbers } } = rootNode;
    const layout = this.getLayout({ lineNumbers });

    this.repaintRootNode({ rootNode, layout });
  }

  // @TODO 需要重构
  repaintRootNode({ rootNode, layout  }) {
    const { icon='', text='', childNode=[] } = rootNode;
    const { cols, rows } = layout;
    const { canvasEl } = this;

    if ((icon != '') && (text != '')) {
      const y = this.getMiddle();
      if (childNode.length > 0) {
        context.src({ el: canvasEl })
        .pipe(drawLine({ startX: cols[0], startY: y, endX: cols[1], endY: y}));

        this.repaintChildNode({ childNode, layout });
      }

      context.src({ el: canvasEl })
      .pipe(drawIconLabel({ x: cols[0], y, icon, text }));
    }
  }

  repaintChildNode({ childNode, layout }) {
    const { cols, rows } = layout;
    const { canvasEl } = this;

    childNode.forEach((node, index) => {
      const { icon='', text='', leafNode=null } = node;
      const row = rows[index];

      if ((icon != '') && (text != '')) {
        if (leafNode) {
          const { icon, text } = leafNode;
          if ((icon != '') && (text != '')) {
            context.src({ el: canvasEl })
            .pipe(drawLine({ startX: cols[2], startY: row, endX: cols[3], endY: row }))
          }
        }

        context.src({ el: canvasEl })
        .pipe(drawLine({ startX: cols[1], startY: row, endX: cols[2], endY: row }))
        .pipe(drawIconLabel({ x: cols[2], y: row, icon, text }))

        if (index < childNode.length - 1) {
          const col = cols[1];
          context.src({ el: canvasEl })
          .pipe(drawLine({ startX: col, startY: rows[index], endX: col, endY: rows[index + 1] }));
        }

        if (leafNode) {
          this.repaintLeafNode({ leafNode, layout, row });
        }
      }
    });
  }

  repaintLeafNode({ leafNode, layout, row: y }) {
    const { icon='', text='' } = leafNode;
    const { cols } = layout;
    const { canvasEl } = this;

    if ((icon != '') && (text != '')) {
      context.src({ el: canvasEl })
      .pipe(drawIconText({ x: cols[3], y, icon, text }));
    }
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
