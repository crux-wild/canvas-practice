class Context {
  constructor(options = {}) {
    const { selector, contextType='2d', contextAttributes={} } = options;
    const nodeList = document.querySelectorAll(selector);
    const els = Array.from(nodeList);
    this.ctxs = els.map((el) => {
      return el.getContext(contextType);
    });
  }

  pipe(callback) {
    this.ctxs.forEach((ctx) => {
      callback.bind(ctx)();
    });
    return this;
  }
}

function src(options = { selector: '' }) {
  return new Context(options);
}

export default {
  src
};
