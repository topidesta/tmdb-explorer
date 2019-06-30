import React from "react";
import LoadingIndicator from "components/LoadingIndicator";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  flexList: {
    listStyle: "none",
    padding: 0,
    display: "grid",
    gridGap: ({ spacing }) => theme.spacing(spacing),
    gridTemplateColumns: ({ minItemWidth }) =>
      `repeat(auto-fill, minmax(${minItemWidth}px, 1fr))`
  }
}));

function FlexGridList({
  items = [],
  loading,
  renderItem,
  spacing = 1,
  minItemWidth = 220,
  keyExtractor
}) {
  const classes = useStyles({ minItemWidth, spacing });
  // const [resizeObserverRef, { width }] = useResizeObserver();
  // const [itemsPerRow, setItemsPerRow] = useState(1);

  // useEffect(() => {
  //   if (width) {
  //     const itemsPerRow = Math.floor(width / minItemWidth) || 1;
  //     setItemsPerRow(itemsPerRow);
  //   }
  // }, [width, minItemWidth]);

  function extractItemKey(item, index) {
    return typeof keyExtractor === "string"
      ? item[keyExtractor]
      : keyExtractor(item, index);
  }

  const isInitialFetch = loading && !items;

  return (
    <LoadingIndicator loading={isInitialFetch}>
      <ul className={classes.flexList}>
        {items.map((item, index) => (
          <li key={extractItemKey(item, index)}>{renderItem(item, index)}</li>
        ))}
      </ul>
      <LoadingIndicator loading={loading} />
    </LoadingIndicator>
  );
}

export default FlexGridList;
