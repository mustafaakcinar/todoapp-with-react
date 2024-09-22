import { Box } from "@mui/material";
import { useState } from "react";
import MyHeader from "../components/MyHeader";
import MyTodoList from "../components/MyTodoList";
import { useTodoContext } from "../context/TodoProvider";

const HomePage = () => {
  const [view, setView] = useState("list");
  const { todoList, setTodoList } = useTodoContext();

  const handleStyle = (event, nextView) => {
    setView(nextView);
  };
  
  return (
    <Box>
      <MyHeader view={view} setView={setView} handleStyle={handleStyle} />
      <MyTodoList todos={todoList} view={view} />
    </Box>
  );
};

export default HomePage;
