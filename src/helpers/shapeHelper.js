function drawCircle(options = { x: 0, y: 0, radius: 0, height: 0 }) {
  return function() {
    const { type='fill' } = options;
    const ctx = this;

    switch (type) {
      case 'fill':
      fillOneCircle(ctx, options);
      break;
      case 'stroke':
      strokeOneCircle(ctx, options);
      break;
    }
  }
}

function fillOneCircle(ctx, options = {}) {
  const { x=0, y=0, radius=0, fillStyle='' } = options;

  ctx.fillStyle = fillStyle;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
}

function strokeOneCircle(ctx, options = {}) {
  const { x=0, y=0, radius=0, strokeStyle='' } = options;

  ctx.strokeStyle = strokeStyle;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.stroke();
}

function drawRect(options = { x: 0, y: 0, width: 0, height: 0 }) {
  return function() {
    const { type='fill' } = options;
    const ctx = this;

    switch (type) {
      case 'fill':
      fillOneRect(ctx, options);
      break;
      case 'stroke':
      strokeOneRect(ctx, options);
      break;
    }
  }
}

function drawRect(options = { x: 0, y: 0, width: 0, height: 0 }) {
  return function() {
    const { type='fill' } = options;
    const ctx = this;

    switch (type) {
      case 'fill':
      fillOneRect(ctx, options);
      break;
      case 'stroke':
      strokeOneRect(ctx, options);
      break;
    }
  }
}

function fillOneRect(ctx, options = {}) {
  const { x=0, y=0, width=0, height=0, fillStyle='' } = options;

  ctx.fillStyle = fillStyle;
  ctx.fillRect(x, y, width, height);
}

function strokeOneRect(ctx, options = {}) {
  const { x=0, y=0, width=0, height=0, strokeStyle='' } = options;

  ctx.strokeStyle = strokeStyle;
  ctx.strokeRect(x, y, width, height);
}

export {
  drawRect as default,
  drawCircle,
};
