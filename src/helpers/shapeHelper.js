function drawRect(options = { x: 0, y: 0, width: 0, height: 0 }) {
  return function() {
    const { type='fill' } = options;
    const ctx = this;

    if (type == 'fill') {
      fillOneRect(ctx, options);
    } else if(type == 'stroke') {
      strokeOneRect(ctx, options);
    }
  }
}

function fillOneRect(ctx, options = {}) {
  const { x=0, y=0, width=0, height=0, fillStyle='' } = options;

  ctx.fillStyle = fillStyle;
  ctx.fillRect(x, y, width, height);
}

function strokeOneRect(ctx, options = { x: 0, y: 0, width: 0, height: 0 }) {
  const { x=0, y=0, width=0, height=0, strokeStyle='' } = options;

  ctx.strokeStyle = strokeStyle;
  ctx.strokeRect(x, y, width, height);
}

export {
  drawRect as default,
};
