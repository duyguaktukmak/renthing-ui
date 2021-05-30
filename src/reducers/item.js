import {
  ITEM_LOADED,
  ITEM_UNLOADED,
  ADD_COMMENT,
  DELETE_COMMENT,
  ITEM_OFFERED,
  DENIED_ITEM,
  APPROVED_ITEM
} from "../constants";

export default (state = {}, action) => {
  switch (action.type) {
    case ITEM_LOADED:
      return {
        ...state,
        item: action.payload[0],
        comments: action.payload[1].comments,
      };
    case APPROVED_ITEM:
      const redirectUrl = `/`;
      return { ...state, redirectTo: redirectUrl };
    case DENIED_ITEM:
      return {
        ...state,
        comment: "Your deny sent to offered person!"
      };
    case ITEM_UNLOADED:
      return {};
    case ITEM_OFFERED:
      return {
        ...state,
        itemOffered: true,
      };
    case ADD_COMMENT:
      return {
        ...state,
        commentErrors: action.error ? action.payload.errors : null,
        comments: action.error
          ? null
          : (state.comments || []).concat([action.payload.comment]),
      };
    case DELETE_COMMENT:
      const commentId = action.commentId;
      return {
        ...state,
        comments: state.comments.filter((comment) => comment.id !== commentId),
      };
    default:
      return state;
  }
};
