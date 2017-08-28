class Context {
  constructor(options = {}) {
    const { nodeList=[], contextType='2d', contextAttributes={} } = options;
    const els = Array.from(nodeList);
    this.ctxs = els.map((el) => {
      return el.getContext(contextType, contextAttributes);
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
