import ReactDOM from 'react-dom';

import React from 'react';

import Chart from 'components/Chart';

import Context from 'classes/Context';

import drawRect from 'helpers/shapeHelper';

function main() {
  ReactDOM.render(
    <Chart id="char-one" witdh="500" height="500" />,
    document.querySelector('main'),
  );

  new Context({ selector: '#char-one' })
    .pipe(drawRect({ x: 50, y: 50, width: 50, height: 50 }));
}

main()
