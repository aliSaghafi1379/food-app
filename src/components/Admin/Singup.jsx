/* eslint-disable jsx-a11y/anchor-is-valid */
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { ref, set } from "firebase/database";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { useContext, useEffect } from "react";
import { myContexts } from "../../contexts";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const SignUp = (props) => {
  const {
    setUserName,
    userName,
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    todos,
    infoPerson,
    singEmailError,
    setSingEmailError,
    singPasswordError,
    setSingPasswordError,
    singUserNameError,
    setSingUserNameError,
    setOpen,
    show,
    setShow,
  } = useContext(myContexts);

  const findElementUserName = infoPerson.find((el) => {
    return el.userName === userName;
  });
  const findElementPassword = infoPerson.find((el) => {
    return el.password === password;
  });
  const findElementEmail = infoPerson.find((el) => {
    return el.email === email;
  });
  const id = uuidv4();

  const submitInfo = (e) => {
    e.preventDefault();
    if (
      !findElementUserName &&
      !findElementPassword &&
      !findElementEmail &&
      !singPasswordError &&
      !singUserNameError
    ) {
      set(ref(db, `/InfoPerson/${userName}`), {
        id,
        userName,
        fullName,
        email,
        password,
      });
      if (todos) {
        // eslint-disable-next-line array-callback-return
        todos.map((todo) => {
          set(ref(db, `/InfoPerson/${userName}/Items/${todo.id}`), {
            id: todo.id,
            title: todo.title,
            url: todo.url,
            price: todo.price,
            details: todo.details,
            count: todo.count,
            // saved: todo.saved,
          });
        });
      }
      setUserName("");
      setFullName("");
      setEmail("");
      setPassword("");
      setSingUserNameError("");
      setSingEmailError("");
      setSingPasswordError("");
      setOpen(false);
      Swal.fire({
        title: "SUCCESSFULLY",
        icon: "success",
        color: "rgb(58, 61, 66)",
        confirmButtonColor: "rgb(58, 61, 66)",
      });
    } else {
      findElementUserName
        ? setSingUserNameError("* The user name is available *")
        : setSingUserNameError("");
      findElementEmail
        ? setSingEmailError("* The email is available *")
        : setSingEmailError("");
      if (!singPasswordError) {
        findElementPassword
          ? setSingPasswordError("* The password is available *")
          : setSingPasswordError("");
      }
    }
  };

  useEffect(() => {
    const specialChars = [
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "_",
      "-",
      "+",
      "=",
      "[",
      "{",
      "]",
      "}",
      ":",
      ";",
      "<",
      ">",
      " ",
      "`",
      "~",
      "?",
      "/",
      "|",
      ".",
      ",",
    ];
    for (let i = 0; i < password.length; i++) {
      if (specialChars.includes(password[i])) {
        setSingPasswordError("* You can only use a-z and A-Z and 0-9 *");
        break;
      } else {
        setSingPasswordError(
          `${password.length < 6 ? "* Password words should not be less than 6 *" : ""}`
        );
      }
    }
    for (let i = 0; i < userName.length; i++) {
      if (specialChars.includes(userName[i])) {
        setSingUserNameError("* You can only use a-z and A-Z and 0-9 *");
        break;
      } else {
        setSingUserNameError("");
      }
    }
  }, [
    password,
    setPassword,
    setSingPasswordError,
    setSingUserNameError,
    userName,
  ]);

  return (
    <form
      className="login"
      onSubmit={(e) => {
        submitInfo(e);
      }}
      action=""
    >
      <div className="login-header">
        <span>Sign up</span>
      </div>

      <div className="input-box">
        <input
          type="text"
          id="userName"
          className={`input-field ${singUserNameError ? "border-error" : ""}`}
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          required
        />
        <label for="userName" className="label">
          User name
        </label>
        <PersonOutlineOutlinedIcon className="icon" />
        {singUserNameError ? (
          <div className="errorInput">
            <p>{singUserNameError}</p>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="input-box">
        <input
          type="text"
          id="fullName"
          className="input-field"
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
          required
        />
        <label for="fullName" className="label">
          Full name
        </label>
        <BadgeOutlinedIcon className="icon" />
      </div>
      <div className="input-box">
        <input
          type="email"
          id="email"
          className={`input-field ${singEmailError ? "border-error" : ""}`}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <label for="email" className="label">
          Email
        </label>
        <AlternateEmailOutlinedIcon className="icon" />
        {singEmailError ? (
          <div className="errorInput">
            <p>{singEmailError}</p>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="input-box">
        <input
          type={`${show ? "text" : "password"}`}
          id="password"
          className={`input-field ${singPasswordError ? "border-error" : ""}`}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <label for={`${show ? "text" : "password"}`} className="label">
          Password
        </label>
        <span className="icon show-password">
          <LockOutlinedIcon />
          {!show ? (
            <VisibilityOutlinedIcon
              style={{ fontSize: 22, color: "gray", cursor: "pointer" }}
              onClick={() => setShow(!show)}
            />
          ) : (
            <VisibilityOffOutlinedIcon
              style={{ fontSize: 22, color: "gray", cursor: "pointer" }}
              onClick={() => setShow(!show)}
            />
          )}
        </span>
        {singPasswordError ? (
          <div className="errorInput">
            <p>{singPasswordError}</p>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="input-box">
        <p className="sign-up">
          Have an account ? <a onClick={props.changedLogin}>Log in</a>
        </p>
      </div>
      <input type="submit" value="Submit" className="input-submit" />
    </form>
  );
};

export default SignUp;
