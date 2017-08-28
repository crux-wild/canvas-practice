import ReactDOM from 'react-dom';

import React from 'react';

import Canvas from 'components/Canvas';

import TreeDiagram from 'components/TreeDiagram';

function main() {
  ReactDOM.render(
    <content>
      // 需要和二为一
      <Canvas id="canvas-one" witdh="700" height="500" />
      <TreeDiagram selector="#canvas-one" />
    </content>,
    document.querySelector('main'),
  );
}

main();
