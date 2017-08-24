function getChart({ selector, contextType, contextAttributes }) {
  const chartNodeList = document.querySelecotrAll(selector);
  const chartEls = Array.from(chartNodeList);

  const chartCxts = chartEls.map(chartEls, (el) => {
    return el.getContext(contextType, contextAttributes);
  });

  this.ctxs = { ...chartCxts };

  return this;
}

export {
  getChart as default,
}
