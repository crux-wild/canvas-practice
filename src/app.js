import ReactDOM from 'react-dom';

import React from 'react';

import Chart from 'components/Chart';

import drawRect, { drawCircle, drawImage } from 'helpers/shape';

import context from 'helpers/context';

import actorImgSrc from './images/actor.png';

import hacktoolImgSrc from './images/hacktool.png';

import losthostImagSrc from './images/lost-host.png';

function main() {
  ReactDOM.render(
    <content>
      <Chart id="char-one" witdh="500" height="500" />
      <img id="image-actor" src={actorImgSrc} style={{ display: 'none' }} />
      <img id="image-hacktool" src={hacktoolImgSrc} style={{ display: 'none' }} />
      <img id="image-lost-host" src={losthostImagSrc} style={{ display: 'none' }} />
    </content>,
    document.querySelector('main'),
  );

  context.src({ selector: '#char-one' })
    .pipe(drawRect({ type: 'stroke', x: 50, y: 50, width: 150, height: 50, strokeStyle: '#ccc' }))
    .pipe(drawCircle({ type: 'stroke', x: 100, y: 100, radius: 25 }))
    .pipe(drawImage({ selector: '#image-actor', x: 200, y: 200 }))
    .pipe(drawImage({ selector: '#image-hacktool', x: 200, y: 200 }))
    .pipe(drawImage({ selector: '#image-lost-host', x: 200, y: 200 }))
}

main();
