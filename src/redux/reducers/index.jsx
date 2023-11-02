import { combineReducers } from "redux";
import authReducer from "./auth";
import menu from "./menu";
import delete_menu from "./delete_menu";
import post_menu from "./post_menu";
import put_menu from "./put_menu";
import detail_menu from "./detail_menu";
import postComment from "./postComment";
import getComment from "./getComment";

const rootReducers = combineReducers({
  auth: authReducer,
  menu,
  postComment,
  getComment,
  delete_menu,
  post_menu,
  put_menu,
  detail_menu
});

export default rootReducers;