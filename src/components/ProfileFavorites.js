import { Profile, mapStateToProps } from './Profile';
import React from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { connect } from 'react-redux';
import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED
} from '../constants';

const mapDispatchToProps = dispatch => ({
  onLoad: (pager, payload) =>
    dispatch({ type: PROFILE_PAGE_LOADED, pager, payload }),
  onUnload: () =>
    dispatch({ type: PROFILE_PAGE_UNLOADED })
});

class ProfileFavorites extends Profile {
  componentWillMount() {
    this.props.onLoad(page => api.Items.favoritedBy(this.props.match.params.username, page), Promise.all([
      api.Profile.get(this.props.match.params.username),
      api.Items.favoritedBy(this.props.match.params.username)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  renderTabs() {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link"
            to={`/@${this.props.profile.username}`}>
            My Items
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link active"
            to={`/@${this.props.profile.username}/favorites`}>
            Favorited Items
          </Link>
        </li>
      </ul>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFavorites);
