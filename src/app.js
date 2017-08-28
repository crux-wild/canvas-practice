import ReactDOM from 'react-dom';

import React from 'react';

import Chart from 'components/Chart';

import context from 'helpers/context';

import actorImgSrc from './images/actor.png';

import hacktoolImgSrc from './images/hacktool.png';

import losthostImagSrc from './images/losthost.png';

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

  context.src({ selector: '#char-one' })
    .pipe(drawIconLabel({ x: 50, y: 250, icon: 'hacktool', text: 'armypress.org' }))
      .pipe(drawIconLabel({ x: 300, y: 50, icon: 'losthost', text: '大量与"Sofacy"组织相关的可疑域名。' }))
      .pipe(drawIconLabel({ x: 300, y: 230, icon: 'losthost', text: '大量与"Sofacy"组织相关的可疑域名。' }))
      .pipe(drawIconLabel({ x: 300, y: 400, icon: 'losthost', text: '大量与"Sofacy"组织相关的可疑域名。' }))
        .pipe(drawIconText({ x: 600, y: 100, icon: 'actor', text: 'APT28', textWidth: 75 }))
        .pipe(drawIconText({ x: 600, y: 270, icon: 'actor', text: 'APT28', textWidth: 75 }))
        .pipe(drawIconText({ x: 600, y: 440, icon: 'actor', text: 'APT28', textWidth: 75 }))
}

main();
