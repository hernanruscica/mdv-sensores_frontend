
import { CardBtnSmall } from "../CardBtnSmall/CardBtnSmall";

const CardList = ({ items, getKey, getTitle, getUrl, emptyMessage }) => (
  <>
    {items.length > 0 ? (
      items.map((item) => (
        <CardBtnSmall
          key={getKey(item)}
          title={getTitle(item)}
          url={getUrl(item)}
        />
      ))
    ) : (
      <span>{emptyMessage}</span>
    )}
  </>
);

export default CardList;
