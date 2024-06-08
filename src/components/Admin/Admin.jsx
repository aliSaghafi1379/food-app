import { useContext } from "react";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import "../../scss/admin.scss";
import { myContexts } from "../../contexts";
import ModalBox from "./Modal";

const Admin = () => {
  const IconSx = {
    color: "rgb(58, 61, 66)",
    fontSize: 30,
    cursor: "pointer",
    "&:hover": {
      color: "rgba(0, 55, 111 , .5)",
      transition: "all .4s",
    },
  };

  const { handleOpen } = useContext(myContexts);

  return (
    <>
      <SensorOccupiedIcon sx={IconSx} onClick={handleOpen} />
      <ModalBox />
    </>
  );
};

export default Admin;
