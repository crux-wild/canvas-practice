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

function getIconSelector(icon) {
    switch (icon) {
      case 'hacktool': return  '#image-hacktool';
      break;
      case 'losthost': return '#image-lost-host';
      break;
      default: return '#image-actor';
    }
}

function drawCircleIcon(options = { x: 0, y: 0 }) {
  return function() {
    const { x, y, icon='actor' } = options;
    const radius = 26;
    const ctx = this;
    strokeOneCircle(ctx, { x, y , radius, strokeStyle: '#ccc' });
    const selector = getIconSelector(icon);
    const el = document.querySelector(selector);
    const imageX = x - el.width / 2;
    const imageY = y - el.height / 2;
    options = { ...options, selector, x: imageX, y: imageY };
    drawOneImage(ctx, options);
  }
}

export {
  drawRect as default,
  drawCircle,
  drawImage,
  drawCircleIcon,
};
