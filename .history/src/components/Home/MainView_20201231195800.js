import ItemList from '../ItemList';
import React from 'react';
import api from '../../api';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants';

const YourFeedTab = props => {
  if (props.token) {
    const clickHandler = ev => {
      ev.preventDefault();
      props.onTabClick('feed', api.Items.feed, api.Items.feed());
    }

    return (
      <li className="nav-item">
        <a  href=""
            className={ props.tab === 'feed' ? 'nav-link active' : 'nav-link' }
            onClick={clickHandler}>
          Your Feed
        </a>
      </li>
    );
  }
  return null;
};

const GlobalFeedTab = props => {
  const clickHandler = ev => {
    ev.preventDefault();
    props.onTabClick('all', api.Items.all, api.Items.all());
  };
  return (
    <li className="nav-item">
      <a
        href=""
        className={ props.tab === 'all' ? 'nav-link active' : 'nav-link' }
        onClick={clickHandler}>
        Top Feed
      </a>
    </li>
  );
};

const TagFilterTab = props => {
  if (!props.tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <a href="" className="nav-link active">
        <i className="ion-pound"></i> {props.tag}
      </a>
    </li>
  );
};

const mapStateToProps = state => ({
  ...state.itemList,
  tags: state.home.tags,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload })
});

const MainView = props => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">

          <YourFeedTab
            token={props.token}
            tab={props.tab}
            onTabClick={props.onTabClick} />

          <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />

          <TagFilterTab tag={props.tag} />

        </ul>
      </div>

      <ItemList
        pager={props.pager}
        items={props.items}
        loading={props.loading}
        itemsCount={props.itemsCount}
        currentPage={props.currentPage} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
