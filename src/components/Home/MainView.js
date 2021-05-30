import ItemList from "../ItemList";
import React from "react";
import api from "../../api";
import { connect } from "react-redux";
import { CHANGE_TAB } from "../../constants";

const YourLeasedItemsTab = (props) => {
  if (props.token) {
    const clickHandler = (ev) => {
      ev.preventDefault();
      props.onTabClick(
        "feed",
        api.Items.feedLeasedByUser,
        api.Items.feedLeasedByUser()
      );
    };

    return (
      <li className="nav-item">
        <a
          href=""
          className={props.tab === "feed" ? "nav-link active" : "nav-link"}
          onClick={clickHandler}
        >
          Your Leased Items
        </a>
      </li>
    );
  }
  return null;
};

const YourRentedItemsTab = (props) => {
  if (props.token) {
    const clickHandler = (ev) => {
      ev.preventDefault();
      props.onTabClick(
        "feed-rented",
        api.Items.feedRentedByUser,
        api.Items.feedRentedByUser()
      );
    };

    return (
      <li className="nav-item">
        <a
          href=""
          className={
            props.tab === "feed-rented" ? "nav-link active" : "nav-link"
          }
          onClick={clickHandler}
        >
          Your Rented Items
        </a>
      </li>
    );
  }
  return null;
};

const YourApproveWaitingItemsTab = (props) => {
  if (props.token) {
    const clickHandler = (ev) => {
      ev.preventDefault();
      props.onTabClick(
        "feed-waiting",
        api.Items.feedApproveWaitingByUser,
        api.Items.feedApproveWaitingByUser()
      );
    };

    return (
      <li className="nav-item">
        <a
          href=""
          className={
            props.tab === "feed-waiting" ? "nav-link active" : "nav-link"
          }
          onClick={clickHandler}
        >
          Your Approve Waiting Items
        </a>
      </li>
    );
  }
  return null;
};

const YourOfferedItemsTab = (props) => {
  if (props.token) {
    const clickHandler = (ev) => {
      ev.preventDefault();
      props.onTabClick(
        "feed-offered",
        api.Items.feedOfferedByUser,
        api.Items.feedOfferedByUser()
      );
    };

    return (
      <li className="nav-item">
        <a
          href=""
          className={
            props.tab === "feed-offered" ? "nav-link active" : "nav-link"
          }
          onClick={clickHandler}
        >
          Your Offered Items
        </a>
      </li>
    );
  }
  return null;
};

const GlobalFeedTab = (props) => {
  const clickHandler = (ev) => {
    ev.preventDefault();
    props.onTabClick("all", api.Items.all, api.Items.all());
  };
  return (
    <li className="nav-item">
      <a
        href=""
        className={props.tab === "all" ? "nav-link active" : "nav-link"}
        onClick={clickHandler}
      >
        Top Feed
      </a>
    </li>
  );
};

const TagFilterTab = (props) => {
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

const mapStateToProps = (state) => ({
  ...state.itemList,
  tags: state.home.tags,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onTabClick: (tab, pager, payload) =>
    dispatch({ type: CHANGE_TAB, tab, pager, payload }),
});

const MainView = (props) => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <YourLeasedItemsTab
            token={props.token}
            tab={props.tab}
            onTabClick={props.onTabClick}
          />

          <YourRentedItemsTab
            token={props.token}
            tab={props.tab}
            onTabClick={props.onTabClick}
          />

          <YourApproveWaitingItemsTab
            token={props.token}
            tab={props.tab}
            onTabClick={props.onTabClick}
          />

          <YourOfferedItemsTab
            token={props.token}
            tab={props.tab}
            onTabClick={props.onTabClick}
          />

          <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />

          <TagFilterTab tag={props.tag} />
        </ul>
      </div>

      <ItemList
        pager={props.pager}
        items={props.items}
        loading={props.loading}
        itemsCount={props.itemsCount}
        currentPage={props.currentPage}
        isOffer={props.isOffer}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
