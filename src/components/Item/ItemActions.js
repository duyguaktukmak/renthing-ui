import { Link } from 'react-router-dom';
import React from 'react';
import api from '../../api';
import { connect } from 'react-redux';
import { DELETE_ITEM } from '../../constants';

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload =>
    dispatch({ type: DELETE_ITEM, payload })
});

const ItemActions = props => {
  const item = props.item;
  const del = () => {
    props.onClickDelete(api.Items.del(item.id))
  };
  if (props.canModify) {
    return (
      <span>

        <Link
          to={`/editor/${item.id}`}
          className="btn btn-outline-secondary btn-sm">
          <i className="ion-edit"></i> Edit ITem
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a"></i> Delete Item
        </button>

      </span>
    );
  }

  return (
    <span>
    </span>
  );
};

export default connect(() => ({}), mapDispatchToProps)(ItemActions);
