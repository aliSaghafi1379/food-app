import "../scss/header.scss";
import FoodBankSharpIcon from "@mui/icons-material/FoodBankSharp";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Admin from "./Admin/Admin";
import { memo, useContext } from "react";
import { myContexts } from "../contexts";
import { Link } from "react-router-dom";

const Header = () => {
  const IconSx = {
    color: "rgb(58, 61, 66)",
    fontSize: 30,
    cursor: "pointer",
    "&:hover": {
      color: "rgba(0, 55, 111 , .5)",
      transition: "all .4s",
    },
  };

  const {
    todos,
    setNewSearch,
    search,
    setSearch,
    loginEnter,
    setMenuPerson,
    menuPerson,
  } = useContext(myContexts);

  const searchFilter = (e) => {
    e.preventDefault();
    setNewSearch(
      todos.filter((todo) => {
        return todo.title === search;
      })
    );
  };

  return (
    <div className="container-header">
      <div className="header">
        <div className="header-left">
          <div className="header-logo">
            <Link to="/">
              <FoodBankSharpIcon
                sx={{
                  color: "rgb(58, 61, 66)",
                  fontSize: 55,
                }}
              />
            </Link>
            <span>
              <p>Food</p>
              <p>Application</p>
            </span>
          </div>
        </div>
        <form
          className="search"
          onSubmit={(e) => {
            searchFilter(e);
          }}
        >
          <input
            placeholder="search ..."
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon
            sx={{ color: "#00376F", cursor: "pointer", fontSize: 22 }}
            type="submit"
          />
        </form>
        <div className="header-right">
          <span className="log">
            {loginEnter ? (
              <p
                className="loginEnter"
                onClick={() => setMenuPerson(!menuPerson)}
              >
                {loginEnter}
              </p>
            ) : (
              <p>Guest</p>
            )}
            <Admin />
          </span>
          <span className="shop">
            <Link to="/shop">
              <ShoppingCartOutlinedIcon sx={IconSx} />
            </Link>
          </span>
        </div>
      </div>
      {/* <div className="header-content">
        <span className="header-title">
          <p>FOOD APP</p>
        </span>
        <div className="header-icon">
          <RamenDiningIcon
            sx={{
              color: "#00376F",
              fontSize: 180,
            }}
          />
          <FoodBankIcon
            sx={{
              color: "#00376F",
              fontSize: 450,
            }}
          />
          <LunchDiningIcon
            sx={{
              color: "#00376F",
              fontSize: 180,
            }}
          />
        </div>
      </div> */}
    </div>
  );
};

export default memo(Header);
