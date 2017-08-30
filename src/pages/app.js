import ReactDOM from 'react-dom';

import React from 'react';

import TreeDiagram from 'components/TreeDiagram';

import 'whatwg-fetch';

import 'styles/index.css';

function main() {
  const data = window.fetch('/api/treeDiagram.json')
    .then((response) => {
      return response.json();
    });

  ReactDOM.render(
    <content>
      <TreeDiagram data={data} />
    </content>,
    document.querySelector('main'),
  );
}

main();
