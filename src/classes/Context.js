class Context {
  constructor(options = {
    nodeList: null,
    contextType: '2d',
    contextAttributes: {},
  }) {

    const { nodeList, contextType, contextAttributes } = options;
    const els = Array.from(nodeList);
    this.ctxs = els.map((el) => {
      el.getContext(contextType, contextAttributes);
    });
  }

  pipe(callback) {
    this.ctxs.forEach(callback);
    return this;
  }
}

export default Context;
