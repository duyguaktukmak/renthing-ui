import ListErrors from "./ListErrors";
import React from "react";
import api from "../api";
import { connect } from "react-redux";
import {
  EDITOR_PAGE_LOADED,
  ITEM_CREATED,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR,
} from "../constants";

const mapStateToProps = (state) => ({
  ...state.editor,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload) => dispatch({ type: EDITOR_PAGE_LOADED, payload }),
  onSubmit: (payload) => dispatch({ type: ITEM_CREATED, payload }),
  onUnload: (payload) => dispatch({ type: EDITOR_PAGE_UNLOADED }),
  onUpdateField: (key, value) =>
    dispatch({ type: UPDATE_FIELD_EDITOR, key, value }),
});

class Editor extends React.Component {
  constructor() {
    super();

    const updateFieldEvent = (key) => (ev) =>
      this.props.onUpdateField(key, ev.target.value);
    this.changeName = updateFieldEvent("name");
    this.changeDescription = updateFieldEvent("description");
    this.changePrice = updateFieldEvent("price");

    this.submitForm = (ev) => {
      ev.preventDefault();
      const item = {
        name: this.props.name,
        description: this.props.description,
        price: this.props.price,
      };

      const promise = api.Items.create(item);
      this.props.onSubmit(promise);
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.slug !== nextProps.match.params.slug) {
      if (nextProps.match.params.slug) {
        this.props.onUnload();
        return this.props.onLoad(api.Items.get(this.props.match.params.slug));
      }
      this.props.onLoad(null);
    }
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      return this.props.onLoad(api.Items.get(this.props.match.params.id));
    }
    this.props.onLoad(null);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <ListErrors errors={this.props.errors}></ListErrors>

              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Item Name"
                      value={this.props.name}
                      onChange={this.changeName}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Item Description"
                      value={this.props.description}
                      onChange={this.changeDescription}
                    ></textarea>
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Item Price / Per 30 minutes"
                      value={this.props.price}
                      onChange={this.changePrice}
                    />
                  </fieldset>

                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={this.props.inProgress}
                    onClick={this.submitForm}
                  >
                    Create Rent Item
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
