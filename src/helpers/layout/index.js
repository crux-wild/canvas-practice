function fluidLayout({ width=0, height=0, coordinates={} }) {
  const { cols=[], rows=[] } = coordinates;
  const computedCols = cols.map((percentage) => {
    return percentage * width;
  });
  const computedRows = rows.map((percentage) => {
    return percentage * height;
  });
  const computedCoordinates = {
    cols: computedCols,
    rows: computedRows,
  };
  return computedCoordinates;
}

export {
  fluidLayout as default,
};
