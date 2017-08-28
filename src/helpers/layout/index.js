function getFluidLayout({ width=0, height=0, pointers={} }) {
  const { x=[], y=[] } = pointers;

  const cols = x.map((percentage) => {
    return percentage * width;
  });
  const rows = y.map((percentage) => {
    return percentage * height;
  });

  return {
    cols,
    rows,
  };
}

export {
  getFluidLayout as default,
};
