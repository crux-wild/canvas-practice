class Context {
  constructor(options = {}) {
    const { el, contextType='2d', contextAttributes={} } = options;
    const context = el.getContext(contextType, contextAttributes)
    this.context = context;
  }

  pipe(callback) {
    const context = this.context;
    callback.bind(context)();
    return this;
  }
}

function src(options = { selector: '' }) {
  return new Context(options);
}

export default {
  src
};
