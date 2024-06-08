/* eslint-disable array-callback-return */
import "../scss/items.scss";
import { CircularProgress, Rating } from "@mui/material";
import Details from "./Details";
import { useContext } from "react";
import { myContexts } from "../contexts";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkAddedTwoToneIcon from "@mui/icons-material/BookmarkAddedTwoTone";
import ManageAccountsTwoToneIcon from "@mui/icons-material/ManageAccountsTwoTone";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";
import BookmarkTwoToneIcon from "@mui/icons-material/BookmarkTwoTone";
import { Link } from "react-router-dom";

const Items = () => {
  const {
    loading,
    todos,
    newSearch,
    loginEnter,
    add,
    remove,
    personValue,
    menuPerson,
    setMenuPerson,
    setLoginEnter,
    handleOpen,
  } = useContext(myContexts);

  return (
    <div className="container">
      {menuPerson ? (
        <div className="menu-person">
          <a className="menu-child" href="/">
            <p>Saved</p>
            <BookmarkAddedTwoToneIcon />
          </a>
          <a className="menu-child" href="/">
            <p>Settings</p>
            <ManageAccountsTwoToneIcon />
          </a>
          <Link className="menu-child" to="/shop">
            <p>Shopping</p>
            <ShoppingCartTwoToneIcon />
          </Link>
          <a className="menu-child" onClick={() => setLoginEnter("")} href="/">
            <p>Exit</p>
            <ExitToAppTwoToneIcon />
          </a>
        </div>
      ) : (
        ""
      )}
      <div className="items" onClick={() => setMenuPerson(false)}>
        {loading && (
          <div className="loading">
            <p>loading...</p>
            <CircularProgress sx={{ color: "rgb(58, 61, 66)" }} />
          </div>
        )}
        {/* !newSearch.length > 0 ? todos : newSearch */}
        {(!newSearch.length > 0
          ? loginEnter === ""
            ? todos
            : personValue
          : newSearch
        ).map((todo) => (
          <div className="item" key={todo.id}>
            <div className="img-item">
              <img src={todo.url} alt="" />

              {todo.count > 0 ? (
                <span className="order-2">
                  <button onClick={() => add(todo.id, todo.count)}>+</button>
                  <p>{todo.count}</p>
                  <button onClick={() => remove(todo.id, todo.count)}>
                    {todo.count < 2 ? (
                      <DeleteIcon sx={{ fontSize: 16 }} />
                    ) : (
                      "-"
                    )}
                  </button>
                </span>
              ) : (
                <span className="order-1">
                  <button
                    onClick={() =>
                      loginEnter === ""
                        ? handleOpen()
                        : add(todo.id, todo.count)
                    }
                  >
                    +
                  </button>
                </span>
              )}
              <div className="saved">
                <BookmarkTwoToneIcon sx={{ fontSize: 28 }} />
              </div>
            </div>
            <div className="content-item">
              <span className="title-price">
                <p>{todo.title}</p>
                <p>
                  <i>$ {todo.price}</i>
                </p>
              </span>
              <span className="details">
                <p>{todo.details}</p>
              </span>
              <span className="order-details">
                <Details />
              </span>

              <span className="rate">
                <Rating
                  sx={{ fontSize: 22 }}
                  name="half-rating"
                  defaultValue={3.5}
                  precision={0.5}
                  readOnly
                />
                <p>(6 comments)</p>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
