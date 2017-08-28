import ReactDOM from 'react-dom';

import React from 'react';

import Chart from 'components/Chart';

import context from 'helpers/context';

import actorImgSrc from './images/actor.png';

import hacktoolImgSrc from './images/hacktool.png';

import losthostImagSrc from './images/losthost.png';

import getFluidLayout from 'helpers/layout';

import drawCircleIcon, {
  drawLabel,
  drawLine,
  drawIconLabel,
  drawIconText
} from 'helpers/shape';

function main() {
  ReactDOM.render(
    <content>
      <Chart id="char-one" witdh="700" height="500" />
      <img id="image-actor" src={actorImgSrc} style={{ display: 'none' }} />
      <img id="image-hacktool" src={hacktoolImgSrc} style={{ display: 'none' }} />
      <img id="image-losthost" src={losthostImagSrc} style={{ display: 'none' }} />
    </content>,
    document.querySelector('main'),
  );

  // @TODO: 需要重构
  const nodeList = document.querySelectorAll('#char-one');
  const canvasEl = nodeList[0];
  const { width, height } = canvasEl;
  const pointers = { x: [0.05, 0.4, 0.8], y: [0.1, 0.4, 0.8]  };
  const { cols, rows } = getFluidLayout({ width, height, pointers })

  context.src({ nodeList })
    .pipe(drawIconLabel({ x: cols[0], y: rows[1], icon: 'hacktool', text: 'armypress.org' }))
      .pipe(drawIconLabel({ x: cols[1], y: rows[0], icon: 'losthost', text: '大量与"Sofacy"组织相关的可疑域名。' }))
      .pipe(drawIconLabel({ x: cols[1], y: rows[1], icon: 'losthost', text: '大量与"Sofacy"组织相关的可疑域名。' }))
      .pipe(drawIconLabel({ x: cols[1], y: rows[2], icon: 'losthost', text: '大量与"Sofacy"组织相关的可疑域名。' }))
        .pipe(drawIconText({ x: cols[2], y: rows[0], icon: 'actor', text: 'APT28', textWidth: 75 }))
        .pipe(drawIconText({ x: cols[2], y: rows[1], icon: 'actor', text: 'APT28', textWidth: 75 }))
        .pipe(drawIconText({ x: cols[2], y: rows[2], icon: 'actor', text: 'APT28', textWidth: 75 }))
}

main();
