import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";

const Details = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const handleOpenDetails = () => setOpenDetails(true);
  const handleCloseDetails = () => setOpenDetails(false);

  const styleDetails = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "white",
    border: "none",
    boxShadow: 24,
    borderRadius: 3,
    p: 6,
  };
  return (
    <>
      <Button variant="contained" color="success" onClick={handleOpenDetails}>
        Details
      </Button>
      <Modal open={openDetails} onClose={handleCloseDetails}>
        <Box sx={styleDetails}>
          <div className="details">
            <div className="detail">
              <div>
                <img src="" alt="" />
              </div>
              <div>
                <span>
                  <p></p>
                  <p></p>
                </span>
                <span></span>
              </div>
            </div>
            <div className="comments"></div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Details;
