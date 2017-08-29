import ReactDOM from 'react-dom';

import React from 'react';

import 'styles/index.css';

import TreeDiagram from 'components/TreeDiagram';

function main() {
  ReactDOM.render(
    <content>
      <TreeDiagram />
    </content>,
    document.querySelector('main'),
  );
}

main();
