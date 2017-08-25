function drawImage(options = {}) {
  return function() {
    const ctx = this;
    drawOneImage(ctx, options);
  }
}

function drawOneImage(ctx, options = {}) {
  const { x=0, y=0, width=0, height=0, selector='' } = options;
  const img = document.querySelector(selector);
  img.addEventListener('load', () => {
    img.width = width || img.naturalWidth;
    img.height = height || img.naturalHeight;
    ctx.drawImage(img, x, y, img.width, img.height);
  });

  return { width: img.width, height: img.height };
}

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
  };
}

function fillOneCircle(ctx, options = {}) {
  const { x=0, y=0, radius=0, fillStyle='' } = options;

  ctx.fillStyle = fillStyle;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
}

function strokeOneCircle(ctx, options = {}) {
  const { x=0, y=0, radius=0, strokeStyle='', lineWidth='' } = options;

  ctx.lineWidth = lineWidth;
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
  const { x=0, y=0, width=0, height=0, strokeStyle='', lineWidth='' } = options;

  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeStyle;
  ctx.strokeRect(x, y, width, height);
}

function drawCircleIcon(options = { x: 0, y: 0 }) {
  return function() {
    const ctx = this;
    drawOneCircle(ctx, options);
  }
}

function getIconSelector(icon) {
    switch (icon) {
      case 'hacktool': return  '#image-hacktool';
      break;
      case 'losthost': return '#image-losthost';
      break;
      default: return '#image-actor';
    }
}

function drawOneCircle(ctx, options = {}) {
  const { x, y } = options;
  const radius = 26;
  strokeOneCircle(ctx, { x, y , radius, strokeStyle: '#ccc', lineWidth: 2 });

  const { icon } = options;
  const selector = getIconSelector(icon);
  const el = document.querySelector(selector);
  const imageX = x - el.width / 2;
  const imageY = y - el.height / 2;
  options = { ...options, selector, x: imageX, y: imageY };
  drawOneImage(ctx, options);
}

function drawLabel(options = { x: 0, y: 0 }) {
  return function() {
    const ctx = this;
    drawOneLabel(ctx, options);
  };
}

function drawOneLabel(ctx, options) {
  options = { ...options, width: 150, height: 52, strokeStyle: '#ccc', lineWidth: 1 };
  strokeOneRect(ctx, options);

  const maxWidth = 130;
  options = { ...options, maxWidth  };

  const fontSize = 18;
  const { x, y, width, height, lineWidth } = options;
  const textX = x + (width - maxWidth) / 2;
  const textY = y + (height + fontSize/2 ) / 2 + lineWidth;
  const font = `normal normal lighter ${fontSize}px/1 sans-serif`;
  options = { ...options, font, fillStyle: '#ccc', x: textX, y: textY };
  fillOneText(ctx, options);
}

function fillOneText(ctx, options) {
  const { text, x, y, fillStyle, font, maxWidth } = options;

  ctx.fillStyle = fillStyle;
  ctx.font = font;
  ctx.fillText(text, x, y, maxWidth);
}

export {
  drawCircleIcon as default,
  drawLabel,
};
