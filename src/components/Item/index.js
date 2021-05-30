import ItemMeta from "./ItemMeta";
import CommentContainer from "./CommentContainer";
import React from "react";
import api from "../../api";
import { connect } from "react-redux";
import marked from "marked";
import {
  ITEM_LOADED,
  ITEM_UNLOADED,
  UPDATE_FIELD_AUTH,
  ITEM_OFFERED,
} from "../../constants";

const RentingPortion = (props) => {
  const price = props.price;
  const comment = props.comment;
  if (props.token && props.canOffer && !props.itemOffered) {
    return (
      <div>
        <hr />
        <div className="container page">
          <form onSubmit={props.onSubmit(price, comment)}>
            <legend>Want to Rent? Give offer right now!</legend>
            <br />
            <fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Offered Price"
                  value={props.price}
                  onChange={props.changePrice}
                />
              </fieldset>
              <fieldset className="form-group">
                <label for="startTime">Start Time:</label>
                <input
                  type="datetime-local"
                  id="startTime"
                  name="start"
                  placeholder="date"
                  style={{
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderTopWidth: 0,
                    margin: "20px",
                  }}
                  value={props.startTime}
                  onChange={props.changeStartTime}
                />
                <label for="endTime">End Time:</label>
                <input
                  type="datetime-local"
                  id="endTime"
                  name="end"
                  style={{
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderTopWidth: 0,
                    margin: "20px",
                  }}
                  value={props.endTime}
                  onChange={props.changeEndTime}
                />
              </fieldset>
              <fieldset className="form-group">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Write your comments"
                  value={props.comment}
                  onChange={this.changeComment}
                ></textarea>
              </fieldset>
              <button
                className="btn btn-lg btn-primary pull-xs-right"
                type="submit"
              >
                Rent Offer
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }

  if (props.itemOffered) {
    return (
      <div>
        <hr />
        <div className="container page" style={{ textAlign: "center" }}>
          <h2>Item Rent Offer Successfully Sent!</h2>
          <h3>We'll keep you updated when renter replies.</h3>
        </div>
      </div>
    );
  }
  return null;
};

const mapStateToProps = (state) => ({
  ...state.item,
  currentUser: state.common.currentUser,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload) => dispatch({ type: ITEM_LOADED, payload }),
  onUnload: () => dispatch({ type: ITEM_UNLOADED }),
  onChangePrice: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "price", value }),
  onChangeComment: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "comment", value }),
  onChangeStartTime: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "startTime", value }),
  onChangeEndTime: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "endTime", value }),
  onSubmit: (payload) => {
    api.Rent.rentRequest(payload);
    dispatch({ type: ITEM_OFFERED });
  },
});

class Item extends React.Component {
  constructor() {
    super();
    this.changePrice = (ev) => this.props.onChangePrice(ev.target.value);
    this.changeComment = (ev) => this.props.onChangeComment(ev.target.value);
    this.changeStartTime = (ev) =>
      this.props.onChangeStartTime(ev.target.value);
    this.changeEndTime = (ev) => this.props.onChangeEndTime(ev.target.value);

    this.submitForm = (price, comment, startTime, endTime) => (ev) => {
      ev.preventDefault();
      const rentRequest = {
        price,
        comment,
        startTime,
        endTime,
        itemId: this.props.match.params.id,
      };
      this.props.onSubmit(rentRequest);
    };
  }

  componentWillMount() {
    this.props.onLoad(
      Promise.all([
        api.Items.get(this.props.match.params.id),
        api.Comments.forItem(this.props.match.params.id),
      ])
    );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.item) {
      return null;
    }

    const markup = {
      __html: marked(this.props.item.description, { sanitize: true }),
    };
    const canOffer =
      this.props.currentUser &&
      this.props.currentUser.username !== this.props.item.userUserName;

    const price = this.props.price;
    const comment = this.props.comment;

    return (
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{this.props.item.name}</h1>
            <h2>{this.props.item.price} TL / per 30 mins </h2>
            <ItemMeta item={this.props.item} canOffer={canOffer} />
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-xs-12">
              <ul className="tag-list">
                {this.props.item.imagePath !== null &&
                this.props.item.imagePath !== undefined
                  ? this.props.item.imagePath.split(",").map((img) => {
                      {
                        return (
                          <li>
                            <img
                              src={img}
                              alt={img}
                              width="100"
                              height="100"
                              style={{ margin: "15px" }}
                            />
                          </li>
                        );
                      }
                    })
                  : null}
              </ul>
              <br />
            </div>
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-xs-12">
              <div dangerouslySetInnerHTML={markup}></div>

              <div>Available Times</div>

              <ul className="tag-list">
                {this.props.item.availableTimes.map((time, idx) => {
                  return (
                    <li className="tag-default tag-pill tag-outline" key={idx}>
                      {new Date(time.startDate).toDateString()} -{" "}
                      {new Date(time.endDate).toDateString()}
                    </li>
                  );
                })}
              </ul>
              <br />
            </div>
          </div>
        </div>

        <RentingPortion
          token={this.props.token}
          canOffer={canOffer}
          onSubmit={this.submitForm}
          itemOffered={this.props.itemOffered}
        />

        <hr />
        <div className="article-actions"></div>
        <div className="row">
          <CommentContainer
            comments={this.props.comments || []}
            errors={this.props.commentErrors}
            slug={this.props.match.params.id}
            currentUser={this.props.currentUser}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
