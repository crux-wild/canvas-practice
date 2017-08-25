function drawRect(options = { x: 0, y: 0, width: 0, height: 0 }) {
  return function() {
    const { x, y, width, height, fillStyle='' } = options;
    const ctx = this;

    ctx.fillStyle = fillStyle;
    ctx.fillRect(x, y, width, height);
  }
}

export {
  drawRect as default
};
