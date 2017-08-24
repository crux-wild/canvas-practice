function getChart({ selector, contextType, contextAttributes }) {
  const chartEls = document.querySelecotrAll(selector);

  const chartCxts = Array.prototype.map.call(chartEls, (el) => {
    return el.getContext(contextType, contextAttributes);
  });

  this.ctxs = { ...chartCxts };

  return this;
}

export {
  getChart as default,
}
