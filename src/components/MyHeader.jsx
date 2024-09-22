import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import motivation from "../helper/data";
import MyStyledList from "./MyStyledList";
import { useTodoContext } from "../context/TodoProvider";

const MyHeader = ({view, handleStyle}) => {
  const [todo, setTodo] = useState([]);
  const [idx, setIdx] = useState(0);

  const {addTodo} = useTodoContext()

  const handleChange = (e) => {
    e.preventDefault();
    if (todo.trim() !== "") {
      const newTask = {
        id: uuidv4(),
        task: todo,
        taskStatus: false,
      };
      addTodo(newTask);
      setTodo("");
    } else {
      Swal.fire({
        title: "Alanı Doldurmadınız!!!",
        text: "Geçersiz giriş yaptınız!",
        icon: "error",
      });
    }
  };

  const updateSentence = () => {
    const randomIndex = Math.floor(Math.random() * motivation.length);
    setIdx(randomIndex);
  };
  // console.log(randomIndex);

  useEffect(() => {
    updateSentence();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Typography variant="h2">TO DO LIST</Typography>

      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">
          {motivation[idx]["quote"]} <span>-{motivation[idx]["author"]}</span>
        </Typography>
        <Button variant="contained" onClick={updateSentence}>
          Change it!
        </Button>
      </Box>
      <Container>
        <Stack
          sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}
          direction={{ sm: "column", md: "row" }}
          spacing={{ xs: 3, sm: 3, md: 2 }}
        >
          <MyStyledList view={view} handleStyle={handleStyle}/>
          <TextField
            id="standard-basic"
            label="Do it!"
            variant="standard"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            sx={{ width: "60%", minWidth: "350px" }}
          />
          <Button
            onClick={(e) => handleChange(e)}
            type="submit"
            variant="outlined"
          >
            Add Task
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default MyHeader;
