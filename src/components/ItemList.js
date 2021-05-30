import ItemPreview from "./ItemPreview";
import ListPagination from "./ListPagination";
import React from "react";
import AwaitingItem from "./AwaitingItem";

const ItemList = (props) => {
  if (!props.items) {
    return <div className="article-preview">Loading...</div>;
  }

  if (props.items.length === 0) {
    return <div className="article-preview">No items are here... yet.</div>;
  }

  if (props.isOffer) {
    return (
      <div>
        {props.items.map((item) => {
          return <AwaitingItem item={item} key={item.itemId} />;
        })}
      </div>
    );
  } else {
    return (
      <div>
        {props.items.map((item) => {
          return <ItemPreview item={item} key={item.id} />;
        })}

        <ListPagination
          pager={props.pager}
          itemsCount={props.itemsCount}
          currentPage={props.currentPage}
        />
      </div>
    );
  }
};

export default ItemList;
