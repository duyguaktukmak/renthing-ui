import ItemActions from './ItemActions';
import { Link } from 'react-router-dom';
import React from 'react';

const ItemMeta = props => {
  const item = props.item;
  return (
    <div className="article-meta">
      <div className="info">
        <Link to={`/@${item.userName}`} className="author">
          {item.userName}
        </Link>
        <span className="date">
          {new Date(item.createdAt).toDateString()}
        </span>
      </div>

      <ItemActions canModify={props.canModify} item={item} />
    </div>
  );
};

export default ItemMeta;
