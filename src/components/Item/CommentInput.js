import React from "react";
import agent from "../../api";
import { connect } from "react-redux";
import { ADD_COMMENT } from "../../constants";

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (payload) => dispatch({ type: ADD_COMMENT, payload }),
});

class CommentInput extends React.Component {
  constructor() {
    super();
    this.state = {
      body: "",
    };

    this.setBody = (ev) => {
      this.setState({ body: ev.target.value });
    };

    this.createComment = (ev) => {
      ev.preventDefault();
      const payload = agent.Comments.create(this.props.slug, {
        body: this.state.body,
      });
      this.setState({ body: "" });
      this.props.onSubmit(payload);
    };
  }

  render() {
    return (
      <form className="card comment-form" onSubmit={this.createComment}>
        <div className="card-block">
          <textarea
            className="form-control"
            placeholder="Write a comment..."
            value={this.state.body}
            onChange={this.setBody}
            rows="3"
          ></textarea>
        </div>
        <div className="card-footer">
          {this.props.currentUser.username}
          <button className="btn btn-sm btn-primary" type="submit">
            Post Comment
          </button>
        </div>
      </form>
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(CommentInput);
