import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

// ilk önce contextimizi oluşturduk
const TodoContext = createContext();

// contextimizi direk kullanabilmek için custom bir hook kullanıldı.

export const useTodoContext = () => {
  return useContext(TodoContext);
};


//! api url miz herkese görünmemesi için env dosyası kullanarak gizledik
const mockAPI_URL = process.env.REACT_APP_MOCK_API_URL;

const TodoProvider = ({ children }) => {

  // gelecek olan datamızı tutmak için bir state oluşturduk gelecek olan verilerimizi bunun içerisine yerleştireceğiz.
  const [todoList, setTodoList] = useState([]);

  // sayfa ilk yüklendiğinde veriler bir kere getirilmesi için useEffect hookunu kullandık
  useEffect(() => {
    getTodos();
  }, []);

   // ? then catch ile de yapabilirdik burada async await yapısını tercih edilmiş

  const getTodos = async () => {
    //* burada kontrol edip verilerin yerini gördükten sonra destur işlemi yapılabilir
    //? res.data şeklinde erişmemiz gerekiyordu burada destur yöntemiyle direk dataya eriştik
    try {
      const { data } = await axios.get(mockAPI_URL);
      // console.log(data);
      setTodoList(data);
    } catch (error) {
      Swal.fire({
        title: "UPPS Something wrong",
        text: `${error.message}`,
        icon: "error",
      })
    }
  };

  //!!   API den veri silmek için gerekli olan metot bunu yaparken id göndererek istediğimiz verinin silindiğinden emin oluyoruz bu yüzden id lerin uniq olması önemlidir

  const deleteTodo = async (id) => {
    try{
    await axios.delete(`${mockAPI_URL}/${id}`);
    getTodos();
  } catch(error){
    Swal.fire({
      title: "UPPS Something wrong",
      text: `${error.message}`,
      icon: "error",
    })
  }
  }
  

  // !  editlenmiş verilerin gönderilmesi için gereken kısım buraya da editlenmiş veriyi ve yine id yi kullanarak güncelleme işlemini yapıyoruz

  const editTask = async (editTodo) => {
    try {
      await axios.put(`${mockAPI_URL}/${editTodo.id}`, editTodo);
    getTodos();
    } catch (error) {
      Swal.fire({
        title: "UPPS Something wrong",
        text: `${error.message}`,
        icon: "error",
      })
    }
  };

  // ! yeni data ekleme kısmı yeni datayı bu şekilde gönderiyoruz
  const addTodo = async (newTask) => {
    try {
      await axios.post(mockAPI_URL, newTask);
    getTodos();
    } catch (error) {
      Swal.fire({
        title: "Alanı Doldurmadınız!!!",
        text: "Geçersiz giriş yaptınız!",
        icon: "error",
      });
    }
  };

  //^ burada oluşturduğumuz context ile çocukları sarmallayarak istediğimiz veriyi istediğimiz sayfaya gönderip orada kullanacağız

  // ? kullanılacak veriler value içerisinde gönderilir.
  return <TodoContext.Provider value={{todoList, setTodoList, addTodo, editTask,deleteTodo}}>{children}</TodoContext.Provider>;
};

export default TodoProvider;
