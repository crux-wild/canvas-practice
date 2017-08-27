import ReactDOM from 'react-dom';

import React from 'react';

import Chart from 'components/Chart';

import drawCircleIcon, { drawLabel, drawLine, drawIconLabel } from 'helpers/shape';

import context from 'helpers/context';

import actorImgSrc from './images/actor.png';

import hacktoolImgSrc from './images/hacktool.png';

import losthostImagSrc from './images/losthost.png';

function main() {
  ReactDOM.render(
    <content>
      <Chart id="char-one" witdh="500" height="500" />
      <img id="image-actor" src={actorImgSrc} style={{ display: 'none' }} />
      <img id="image-hacktool" src={hacktoolImgSrc} style={{ display: 'none' }} />
      <img id="image-losthost" src={losthostImagSrc} style={{ display: 'none' }} />
    </content>,
    document.querySelector('main'),
  );

  context.src({ selector: '#char-one' })
    .pipe(drawCircleIcon({ icon: 'actor', x: 50, y: 50 }))
    .pipe(drawCircleIcon({ icon: 'hacktool', x: 100, y: 100 }))
    .pipe(drawIconLabel({ x: 140, y: 140, icon: 'hacktool', text: 'armypress.org' }))
    .pipe(drawIconLabel({ x: 300, y: 300, icon: 'losthost', text: '大量与"Sofacy"组织相关的可疑域名。' }))
}

main();
