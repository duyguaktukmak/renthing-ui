import React from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { connect } from "react-redux";
import { ITEM_FAVORITED, ITEM_UNFAVORITED } from "../constants";

const FAVORITED_CLASS = "btn btn-sm btn-primary";
const NOT_FAVORITED_CLASS = "btn btn-sm btn-outline-primary";

const mapDispatchToProps = (dispatch) => ({
  favorite: (slug) =>
    dispatch({
      type: ITEM_FAVORITED,
      payload: api.Items.favorite(slug),
    }),
  unfavorite: (slug) =>
    dispatch({
      type: ITEM_UNFAVORITED,
      payload: api.Items.unfavorite(slug),
    }),
});

const ItemPreview = (props) => {
  const item = props.item;
  // TODO
  item.favorited = true;
  const favoriteButtonClass = item.favorited
    ? FAVORITED_CLASS
    : NOT_FAVORITED_CLASS;

  const handleClick = (ev) => {
    ev.preventDefault();
    if (item.favorited) {
      //props.unfavorite(item.id);
    } else {
      //props.favorite(item.id);
    }
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/items/${item.id}`}>
          <img src={item.userImagePath} alt={item.userImagePath} />
        </Link>

        <div className="info">
          {item.userName}
          <span className="date">
            {new Date(item.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart"></i> {0 /*article.favoritesCount*/}
          </button>
        </div>
      </div>

      <Link to={`/items/${item.id}`} className="preview-link">
        <h1>{item.name}</h1>
        {item.imagePath !== null && item.imagePath !== undefined ? (
          <Link to={`/items/${item.id}`}>
            <img
              src={item.imagePath.split(",")[0]}
              alt={item.imagePath.split(",")[0]}
              width="150"
              height="150"
            />
          </Link>
        ) : null}

        <p>{item.price} TL / per 30 mins</p>
        <span>See more...</span>
        <ul className="tag-list">
          {item.tags !== null && item.tags !== undefined
            ? item.tags.split(",").map((tag) => {
                return (
                  <li className="tag-default tag-pill tag-outline" key={tag}>
                    {tag}
                  </li>
                );
              })
            : null}
        </ul>
      </Link>
    </div>
  );
};

export default connect(() => ({}), mapDispatchToProps)(ItemPreview);
