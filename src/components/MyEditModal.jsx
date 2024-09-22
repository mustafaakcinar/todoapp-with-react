import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#FAFDC7",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  border: "none",
  borderRadius: "1rem",
};

export default function MyEditModal({editTodo, handleClose, open }) {

  const [deneme, setDeneme] = useState(editTodo)
  
    return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
              display: "flex",
              flexDirection: "column",
            }}
            noValidate
            autoComplete="off"
          >
            <Typography variant="h5">Edit your task</Typography>
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard" 
              value={deneme.task} 
              onChange={(e) => setDeneme({...deneme, task:e.target.value})}
            />
            <Button size="small" variant="contained" color="primary">
              <EditIcon />
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
