function drawImage(options = {}) {
  return function() {
    const ctx = this;
    drawOneImage(ctx, options);
  }
}

function drawOneImage(ctx, options = {}) {
  const { x=0, y=0, width=0, height=0, selector='' } = options;
  const img = document.querySelector(selector);
  // @FIXME 加载逻辑有问题
  //img.addEventListener('load', () => {
    img.width = width || img.naturalWidth;
    img.height = height || img.naturalHeight;
    ctx.drawImage(img, x, y, img.width, img.height);
  //});

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
    const radius = 26;
    options = { ...options, radius };
    drawOneCircleIcon(ctx, options);
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

function drawOneCircleIcon(ctx, options = {}) {
  const { x, y } = options;
  const { radius }= options;
  strokeOneCircle(ctx, { x, y , radius, strokeStyle: '#ccc', lineWidth: 2 });
  fillOneCircle(ctx, { x, y, radius, fillStyle: '#fff' });

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

// @FIXME 需要用二分查找重写
function getOneLineText({ ctx, text, start, end, textWidth }) {
  for (let index = 0; index <= text.length; index++) {
    const subText = text.substring(start, end - index);
    const computedWidth = ctx.measureText(subText).width;

    if (computedWidth <= textWidth) {
      return subText;
    }
  }
}

function convertToMultiLineText(ctx, options) {
  const { text, textWidth=0, font={} } = options;
  ctx.font = getFontFormat(font);

  const multiLineText = [];
  const end = text.length;
  let start = 0;
  while (start < text.length) {
    const oneLineText = getOneLineText({ ctx, text, start, end, textWidth });
    multiLineText.push(oneLineText);
    start = start + oneLineText.length;
  }
  return multiLineText;
}

function getLineHeight(options) {
  const { font } = options;
  let { size, lineHeight } = font;
  size = parseFloat(size);
  lineHeight = parseFloat(lineHeight);
  return size * lineHeight;
}

function drawOneLabel(ctx, options) {
  const textWidth = 110;
  options = { ...options, textWidth };
  const { padding={}, font={} } = options;
  const { top=0, bottom=top } = padding;
  const { left=0, right=left } = padding;

  const { x, y } = options;
  const multiLineText = convertToMultiLineText(ctx, options);
  const line = multiLineText.length;
  const width = left + textWidth + right;
  const height = top + getLineHeight(options) * line + bottom;
  const labelY = y - height / 2;
  const strokeStyle = '#ccc';
  const fillStyle = '#fff';
  options = { ...options, width, height, strokeStyle, fillStyle, lineWidth: 1, y: labelY };
  strokeOneRect(ctx, options);
  fillOneRect(ctx, options);

  const { text } = options;
  const { lineWidth=2 } = options;
  const textX = x + left;
  const textY = y + height / 2 - getLineHeight(options) * line;
  options = { ...options, textWidth, fillStyle: '#ccc', x: textX, y: textY, text: multiLineText };
  fillOneText(ctx, options);
  const label = { width, height };
}

function fillOneText(ctx, options) {
  const {
    text=[],
    x=0,
    y=0,
    fillStyle='',
    font={},
    textWidth=100
  } = options;

  text.forEach((text, index) => {
    const textY = y + index * getLineHeight(options);
    ctx.font = getFontFormat(font);
    ctx.fillStyle = fillStyle;
    ctx.fillText(text, x, textY);
  });
}

function getFontFormat(font) {
  const {
    style='normal',
    variant='normal',
    weight='normal',
    size='16px',
    lineHeight='1',
    family='"Open Sans", sans-serif',
  } = font;

  return `${style} ${variant} ${weight} ${size}/${lineHeight} ${family}`;
}

function drawLine(options = { startX: 0, startY: 0, endX: 0, endY: 0 }) {
  return function() {
    const ctx = this;
    const strokeStyle = '#ccc';
    options = { ...options, strokeStyle };
    strokeOneLine(ctx, options);
  };
}

function strokeOneLine(ctx, options = {}) {
  const { strokeStyle='', startX=0, startY=0, endX=0, endY=0, lineWidth=1 } = options;
  ctx.beginPath();
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

function drawIconLabel(options = { x: 0, y: 0 }) {
  return function() {
    const ctx = this;
    drawOneIconLabel(ctx, options);
  };
}

function drawOneIconLabel(ctx, options = {}) {
  const font = {
    weight: 'lighter',
    size: '16px',
    lineHeight: '1.4',
  };

  const padding = {
    top: 8,
    right: 16,
    left: 34,
    bottom: 22,
  };
  options = { ...options, padding, font };
  drawOneLabel(ctx, options);

  const { x, y, label } = options;
  const radius = 26;
  options = { ...options, radius };
  drawOneCircleIcon(ctx, options);
}

function drawIconText(options = { x: 0, y: 0 }) {
  return function() {
    const ctx = this;
    drawOneIconText(ctx, options);
  };
}

function drawOneIconText(ctx, options) {
  const radius = 26;
  options = { ...options, radius };
  drawOneCircleIcon(ctx, options);

  options = { ...options, textWidth: 100 };
  const multiLineText = convertToMultiLineText(ctx, options);

  const { x, y } = options;
  const font = { size: '15px', lineHeight: '1' };
  options = { ...options, font };

  const fontFormat = getFontFormat(font);
  ctx.font = fontFormat;

  const lines = multiLineText.length;
  const computedWidth = ctx.measureText(multiLineText).width;
  const textY = y +  lines * getLineHeight(options) + radius;
  const textX = x - (computedWidth / 2);
  options = { ...options, text: multiLineText, font, fillStyle: '#888', y: textY, x: textX };
  fillOneText(ctx, options);
}

export {
  drawCircleIcon as default,
  drawLine,
  drawLabel,
  drawIconText,
  drawIconLabel,
};
