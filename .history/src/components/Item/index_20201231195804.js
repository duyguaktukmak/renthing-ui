import ItemMeta from './ItemMeta';
import CommentContainer from './CommentContainer';
import React from 'react';
import api from '../../api';
import { connect } from 'react-redux';
import marked from 'marked';
import { ARTICLE_PAGE_LOADED, ARTICLE_PAGE_UNLOADED } from '../../constants';

const mapStateToProps = state => ({
  ...state.article,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: ARTICLE_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: ARTICLE_PAGE_UNLOADED })
});

class Item extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      api.Items.get(this.props.match.params.id),
      api.Comments.forItem(this.props.match.params.id)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.item) {
      return null;
    }

    const markup = { __html: marked(this.props.item.description, { sanitize: true }) };
    const canModify = this.props.currentUser &&
      this.props.currentUser.username === this.props.item.userName;
    return (
      <div className="article-page">

        <div className="banner">
          <div className="container">

            <h1>{this.props.item.name}</h1>
            <ItemMeta
              item={this.props.item}
              canModify={canModify} />

          </div>
        </div>

        <div className="container page">

          <div className="row article-content">
            <div className="col-xs-12">

              <div dangerouslySetInnerHTML={markup}></div>

              <ul className="tag-list">
                {
                  this.props.item.tagList.map(tag => {
                    return (
                      <li
                        className="tag-default tag-pill tag-outline"
                        key={tag}>
                        {tag}
                      </li>
                    );
                  })
                }
              </ul>

            </div>
          </div>

          <hr />

          <div className="article-actions">
          </div>

          <div className="row">
            <CommentContainer
              comments={this.props.comments || []}
              errors={this.props.commentErrors}
              slug={this.props.match.params.id}
              currentUser={this.props.currentUser} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
