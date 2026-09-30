
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useContext } from "react";
import { myContexts } from "../../contexts";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { supabase } from "../../supabase";

const Login = (props) => {
  const {
    loginText,
    setLoginText,
    loginPassword,
    setLoginPassword,
    loginError,
    setLoginError,
    setLoginEnter,
    setOpen,
  } = useContext(myContexts);

  const SubmitLogin =async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
        email: loginText,
        password: loginPassword,
      });

      if (error) {
        console.error("LOGIN ERROR:", error);
        setLoginError("The email or password is wrong");
        return;
      }

      const { data: profile, error: profileError } = await supabase
                  .from("users")
                  .select("username, full_name")
                  .eq("id", data.user.id)
                  .single();

      if (profileError) {
              console.error("PROFILE ERROR:", profileError);
               return;
          }

    setLoginEnter(profile.username);

     setLoginError("");
      setOpen(false);

      Swal.fire({
        title: "SUCCESSFULLY",
        html: `Welcome to <i style="color:green; margin: 0 5px">Food App</i>`,
        icon: "success",
        color: "rgb(58, 61, 66)",
        confirmButtonColor: "rgb(58, 61, 66)",
      });
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
          type="email"
          id="email"
          className={`input-field ${loginError ? "border-error" : ""}`}
          onChange={(e) => setLoginText(e.target.value)}
          value={loginText}
          required
        />
        <label htmlFor="email" className="label">
          Email
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
        <label htmlFor="passWord" className="label">
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
          Don't have an account ? <button type="button" onClick={props.changedLogin}>Sign up</button>
        </p>
      </div>
      <input type="submit" value="Submit" className="input-submit" />
    </form>
  );
};

export default Login;
