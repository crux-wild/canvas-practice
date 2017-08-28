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

// @TODO nodeList 需要通过面向对象复用
function repaint() {
  const nodeList =  document.querySelectorAll('#chart-one');
  const canvasEl = nodeList[0];
  const { width, height } = canvasEl;
  const pointers = { x: [ 0.05, 0.305, 0.455, 0.805 ], y: [ 0.1, 0.4, 0.7 ] };
  const { cols, rows } = getFluidLayout({ width, height, pointers })

  context.src({ nodeList })
     // 骨架部分
    .pipe(drawLine({ startX: cols[0], startY: rows[1], endX: cols[2], endY: rows[1] }))
      .pipe(drawLine({ startX: cols[1], startY: rows[0], endX: cols[1], endY: rows[1] }))
      .pipe(drawLine({ startX: cols[1], startY: rows[1], endX: cols[1], endY: rows[2] }))
        .pipe(drawLine({ startX: cols[1], startY: rows[0], endX: cols[2], endY: rows[0] }))
        .pipe(drawLine({ startX: cols[1], startY: rows[2], endX: cols[2], endY: rows[2] }))
          .pipe(drawLine({ startX: cols[2], startY: rows[0], endX: cols[3], endY: rows[0] }))
          .pipe(drawLine({ startX: cols[2], startY: rows[1], endX: cols[3], endY: rows[1] }))
          .pipe(drawLine({ startX: cols[2], startY: rows[2], endX: cols[3], endY: rows[2] }))
    // 图形部分
    .pipe(drawIconLabel({ x: cols[0], y: rows[1], icon: 'hacktool', text: 'armypress.org' }))
      .pipe(drawIconLabel({ x: cols[2], y: rows[0], icon: 'losthost', text: '大量与"Sofacy"组织相关的可疑域名。' }))
      .pipe(drawIconLabel({ x: cols[2], y: rows[1], icon: 'losthost', text: '大量与"Sofacy"组织相关的可疑域名。' }))
      .pipe(drawIconLabel({ x: cols[2], y: rows[2], icon: 'losthost', text: '大量与"Sofacy"组织相关的可疑域名。' }))
        .pipe(drawIconText({ x: cols[3], y: rows[0], icon: 'actor', text: 'APT28' }))
        .pipe(drawIconText({ x: cols[3], y: rows[1], icon: 'actor', text: 'APT28' }))
        .pipe(drawIconText({ x: cols[3], y: rows[2], icon: 'actor', text: 'APT28' }))
}

function resize() {
  const nodeList =  document.querySelectorAll('#chart-one');
  const canvasEl = nodeList[0];
  if ((window.innerWidth >= 682) && (window.innerHeight >= 383)) {
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;
    repaint();
  }
}

function main() {
  ReactDOM.render(
    <content>
      <Chart id="chart-one" witdh="700" height="500" />
      <img id="image-actor" src={actorImgSrc} style={{ display: 'none' }} />
      <img id="image-hacktool" src={hacktoolImgSrc} style={{ display: 'none' }} />
      <img id="image-losthost" src={losthostImagSrc} style={{ display: 'none' }} />
    </content>,
    document.querySelector('main'),
  );

  resize();
}

var optimizedResize = (function() {

    var callbacks = [],
        running = false;

    // fired on resize event
    function resize() {

        if (!running) {
            running = true;

            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(runCallbacks);
            } else {
                setTimeout(runCallbacks, 66);
            }
        }

    }

    // run the actual callbacks
    function runCallbacks() {

        callbacks.forEach(function(callback) {
            callback();
        });

        running = false;
    }

    // adds callback to loop
    function addCallback(callback) {

        if (callback) {
            callbacks.push(callback);
        }

    }

    return {
        // public method to add additional callback
        add: function(callback) {
            if (!callbacks.length) {
                window.addEventListener('resize', resize);
            }
            addCallback(callback);
        }
    }
}());

// start process
optimizedResize.add(resize);

main();
