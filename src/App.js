import "./App.css";
import TodoProvider from "./context/TodoProvider";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <TodoProvider>
      <HomePage />
    </TodoProvider>
  );
}

export default App;
