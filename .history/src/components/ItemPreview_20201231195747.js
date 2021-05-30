import React from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { connect } from 'react-redux';
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../constants/actionTypes';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: ARTICLE_FAVORITED,
    payload: api.Items.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: ARTICLE_UNFAVORITED,
    payload: api.Items.unfavorite(slug)
  })
});

const ItemPreview = props => {
  const item = props.item;
  // TODO
  item.favorited = true;
  const favoriteButtonClass = item.favorited ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if (item.favorited) {
      props.unfavorite(item.id);
    } else {
      props.favorite(item.id);
    }
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/@${item.username}`}>
          <img src={item.image} alt={item.username} />
        </Link>

        <div className="info">
          <Link className="author" to={`/@${item.username}`}>
            {item.username}
          </Link>
          <span className="date">
            {new Date(item.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart"></i> {0/*article.favoritesCount*/}
          </button>
        </div>
      </div>

      <Link to={`/items/${item.id}`} className="preview-link">
        <h1>{item.name}</h1>
        <p>{/*article.description*/""}</p>
        <span>See more...</span>
        <ul className="tag-list">
          {
            item.tagList.map(tag => {
              return (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              )
            })
          }
        </ul>
      </Link>
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(ItemPreview);
