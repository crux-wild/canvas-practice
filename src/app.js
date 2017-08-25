import ReactDOM from 'react-dom';

import React from 'react';

import Chart from 'components/Chart';

import drawRect from 'helpers/shapeHelper';

import context from 'helpers/contextHelper';

function main() {
  ReactDOM.render(
    <Chart id="char-one" witdh="500" height="500" />,
    document.querySelector('main'),
  );

  context.src({ selector: '#char-one' })
    .pipe(drawRect({ x: 50, y: 50, width: 50, height: 50 }));
}

main()
