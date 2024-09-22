import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

// ilk önce contextimizi oluşturduk
const TodoContext = createContext();

// contextimizi direk kullanabilmek için custom bir hook oluşturduk burada returnu contextimizin useContext kullanmını döndürmesini sağladık

export const useTodoContext = () => {
  return useContext(TodoContext);
};

const mockAPI_URL = "https://66e440c4d2405277ed13b06f.mockapi.io/todos";

const TodoProvider = ({ children }) => {
  // gelecek olan datamızı tutmak için bir state oluşturduk gelecek olan verilerimizi bunun içerisine yerleştireceğiz.
  const [todoList, setTodoList] = useState([]);

  // sayfa ilk yüklendiğinde veriler bir kere getirilmesi için useEffect hookunu kullandık
  useEffect(() => {
    getTodos();
  }, []);

  // ^ axios get from mockAPI herhangi bir şey yazmasakta get olarak kullanabilirdik burada yazmayı tercih ettik
  // ? then catch ile de yapabilirdik ben async await yapısını tercih ettim

  const getTodos = async () => {
    //* burada kontrol edip verilerin yerini gördükten sonra destur yöntemi ile direk datayı almayı tercih ettim yoksa res veya response kullanarakta erişebilirdik.
    //? res.data şeklinde erişmemiz gerekiyordu burada destur yöntemiyle direk dataya eriştik
    try {
      const { data } = await axios.get(mockAPI_URL);
      console.log(data);
      setTodoList(data);
    } catch (error) {
      console.log(error);
    }
  };

  //!!   API den veri silmek için gerekli olan metot bunu yaparken id göndererek istediğimiz verinin silindiğinden emin oluyoruz bu yüzden id lerin uniq olması önemlidir

  const deleteTodo = async (id) => {
    await axios.delete(`${mockAPI_URL}/${id}`);
    getTodos();
  };

  // !  editlenmiş verilerin gönderilmesi için gereken kısım buraya da editlenmiş veriyi ve yine id yi kullanarak güncelleme işlemini yapıyoruz

  const editTask = async (editTodo) => {
    await axios.put(`${mockAPI_URL}/${editTodo.id}`, editTodo);
    getTodos();
  };

  // ! yeni data ekleme kısmı yeni datayı bu şekilde gönderiyoruz
  const addTodo = async (newTask) => {
    await axios.post(mockAPI_URL, newTask);
    getTodos();
  };

  //^ burada oluşturduğumuz context ile çocukları sarmallayarak istediğimiz veriyi istediğimiz sayfaya gönderip orada kullanacağız

  // ? kullanılacak veriler value içerisinde gönderilir.
  return <TodoContext.Provider value={{todoList, setTodoList, addTodo, editTask,deleteTodo}}>{children}</TodoContext.Provider>;
};

export default TodoProvider;
