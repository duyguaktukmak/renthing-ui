import React from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { connect } from "react-redux";
import { APPROVED_ITEM, DENIED_ITEM } from "../constants";

const mapDispatchToProps = (dispatch) => ({
  approveItem: (payload) =>
    dispatch({
      type: APPROVED_ITEM,
      payload: api.Rent.resultRentOffer(payload),
    }),
  denyItem: (payload) =>
    dispatch({
      type: DENIED_ITEM,
      payload: api.Rent.resultRentOffer(payload),
    }),
});

const AwaitingItem = (props) => {
  const item = props.item;

  const approveItem = (ev) => {
    ev.preventDefault();
    const payload = {
      rentId: item.rentId,
      rentOfferResult: "ACCEPTED",
    };
    props.approveItem(payload);
  };

  const denyItem = (ev) => {
    ev.preventDefault();
    const payload = {
      rentId: item.rentId,
      rentOfferResult: "DENIED",
    };
    props.denyItem(payload);
  };

  if (props.comment !== undefined && props.comment !== null) {
    return (
      <div className="card">
        <div className="card-footer">
          <div className="info">{props.comment}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-footer">
        <div className="info">
          Item:
          <Link className="author" to={`/items/${item.itemId}`}>
            {item.itemName}
          </Link>
        </div>
        <div className="info">Offered User: {item.offeredUserName}</div>
        <div className="info">Offered Price: {item.offeredPrice}</div>
        <div className="info">
          Offered Start Time:
          {new Date(item.startDate).toTimeString()}
        </div>
        <div className="info">
          Offered End Interval:
          {new Date(item.endDate).toTimeString()}
        </div>

        <button
          className="btn btn-sm pull-xs-right btn-primary"
          type="button"
          onClick={approveItem}
          style={{ margin: "5px" }}
        >
          Approve
        </button>

        <button
          className="btn btn-sm pull-xs-right btn-danger"
          type="button"
          onClick={denyItem}
          style={{ margin: "5px" }}
        >
          Deny
        </button>
      </div>
    </div>
  );
};

export default connect(() => ({}), mapDispatchToProps)(AwaitingItem);
