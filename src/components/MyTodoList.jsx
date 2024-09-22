import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useTodoContext } from "../context/TodoProvider";
import MyEditModal from "./MyEditModal";
import { useState } from "react";

const MyTodoList = ({ view }) => {
  const [editTodo, setEditTodo] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = (id) => {
    setOpen(true);
    const choosenTask = todoList.filter((item) => item.id === id);
    setEditTodo(choosenTask[0]);
  };

  const handleClose = () => setOpen(false);

  const { deleteTodo, todoList } = useTodoContext();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          flexDirection: "column",
        }}
      >
        {view === "list" ? (
          <List
            className="listed-todo"
            dense
            sx={{
              width: "100%",
              maxWidth: 700,
              bgcolor: "background.paper",
              backgroundColor: "transparent",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {todoList.map(({ id, task, taskStatus }) => {
              const labelId = `checkbox-list-secondary-label-${id}`;
              return (
                <ListItem
                  key={id}
                  disablePadding
                  sx={{
                    textDecoration: taskStatus ? "line-through" : "none",
                    padding: "0.3rem",
                    backgroundColor: "#FAFDC7",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ListItemButton>
                    <ListItemText
                      sx={{ fontSize: "2rem" }}
                      id={labelId}
                      primary={`${task}`}
                    />
                  </ListItemButton>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "0.5rem",
                      gap: "0.5rem",
                    }}
                  >
                    <Button
                      onClick={() => handleOpen(id)}
                      size="small"
                      variant="contained"
                      color="primary"
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      onClick={() => deleteTodo(id)}
                      size="small"
                      variant="contained"
                      color="error"
                    >
                      <DeleteOutlineIcon />
                    </Button>
                  </Box>
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              margin: "1rem 0",
              flexWrap: "wrap",
            }}
          >
            {todoList.map(({ id, task, taskStatus }) => (
              <Card
                key={id}
                sx={{
                  width: 250,
                  height: 250,
                  backgroundColor: "#FAFDC7",
                  border: "1px solid red",
                  textAlign: "center",
                  fontSize: "2rem",
                  wordBreak: "break-word",
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    display: "none", // WebKit tabanlı tarayıcılarda kaydırma çubuğunu gizle
                  },
                  textDecoration: taskStatus ? "line-through" : "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: "10px",
                }}
              >
                <CardContent>
                  <Typography variant="body1">{task}</Typography>
                </CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "0.5rem",
                    gap: "0.5rem",
                  }}
                >
                  <Button
                    onClick={() => handleOpen(id)}
                    size="small"
                    variant="contained"
                    color="primary"
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    onClick={() => deleteTodo(id)}
                    size="small"
                    variant="contained"
                    color="error"
                  >
                    <DeleteOutlineIcon />
                  </Button>
                </Box>
              </Card>
            ))}
          </Box>
        )}
      </Box>
      <MyEditModal handleClose={handleClose} open={open} editTodo={editTodo} />
    </>
  );
};

export default MyTodoList;
