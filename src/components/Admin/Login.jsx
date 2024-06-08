/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useContext } from "react";
import { myContexts } from "../../contexts";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
const Login = (props) => {
  const {
    loginText,
    setLoginText,
    loginPassword,
    setLoginPassword,
    infoPerson,
    loginError,
    setLoginError,
    setLoginEnter,
    setOpen,
  } = useContext(myContexts);

  const SubmitLogin = (e) => {
    e.preventDefault();
    const findElement = infoPerson.find((el) => {
      return el.userName === loginText;
    });
    if (findElement) {
      if (
        findElement.userName === loginText &&
        findElement.password === loginPassword
      ) {
        setLoginEnter(findElement.userName);
        setLoginError("");
        setOpen(false);
        Swal.fire({
          title: "SUCCESSFULLY",
          html: `Welcome <i style="color:green ; margin: 0 5px">${findElement.fullName}</i> to Food App`,
          icon: "success",
          color: "rgb(58, 61, 66)",
          confirmButtonColor: "rgb(58, 61, 66)",
        });
      } else {
        setLoginError("The user name or password is wrong");
      }
    } else {
      setLoginError("The user name or password is wrong");
    }
  };
  return (
    <form
      className="login"
      action=""
      onSubmit={(e) => {
        SubmitLogin(e);
      }}
    >
      <div className="login-header">
        <span>Log in</span>
      </div>
      <div className="input-box">
        <input
          type="text"
          id="userName"
          className={`input-field ${loginError ? "border-error" : ""}`}
          onChange={(e) => setLoginText(e.target.value)}
          value={loginText}
          required
        />
        <label for="userName" className="label">
          User name
        </label>
        <PersonOutlineOutlinedIcon className="icon" />
      </div>

      <div className="input-box">
        <input
          type="password"
          id="passWord"
          className={`input-field ${loginError ? "border-error" : ""}`}
          onChange={(e) => setLoginPassword(e.target.value)}
          value={loginPassword}
          required
        />
        <label for="passWord" className="label">
          Password
        </label>
        <LockOutlinedIcon className="icon" />
      </div>
      {loginError ? (
        <div className="errorInput">
          <p>{loginError}</p>
        </div>
      ) : (
        ""
      )}

      <div className="input-box">
        <p className="sign-up">
          Don't have an account ? <a onClick={props.changedLogin}>Sign up</a>
        </p>
      </div>
      <input type="submit" value="Submit" className="input-submit" />
    </form>
  );
};

export default Login;
