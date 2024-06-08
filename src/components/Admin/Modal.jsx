import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import Login from "./Login";
import SignUp from "./Singup";
import { useContext, useState } from "react";
import { myContexts } from "../../contexts";

const ModalBox = () => {
  const { open, handleClose } = useContext(myContexts);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "white",
    border: "3px solid rgb(58, 61, 66)",
    boxShadow: 24,
    borderRadius: 3,
    width: "400px",
    "@media only screen and (max-width: 600px)": {
      width: "100%",
    },
  };
  const [change, setChange] = useState(false);
  const changedLogin = () => setChange(!change);
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <div className="form">
          {!change ? (
            <Login changedLogin={changedLogin} />
          ) : (
            <SignUp changedLogin={changedLogin} />
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default ModalBox;
