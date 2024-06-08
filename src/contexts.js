import { onValue, ref, update } from "firebase/database";
import { createContext, useEffect, useState } from "react";
import { db } from "./firebase";

export const myContexts = createContext({
  todos: [],
  setTodos: [],
  loading: [],
  setLoading: [],
  search: [],
  setSearch: [],
  newSearch: [],
  setNewSearch: [],
  title: [],
  setTitle: [],
  price: [],
  setPrice: [],
  details: [],
  setDetails: [],
  count: [],
  setCount: [],
  userName: [],
  setUserName: [],
  fullName: [],
  setFullName: [],
  setEmail: [],
  email: [],
  password: [],
  setPassword: [],
  setLoginPassword: [],
  loginPassword: [],
  loginText: [],
  setLoginText: [],
  infoPerson: [],
  setInfoPerson: [],
  loginError: [],
  setLoginError: [],
  loginEnter: [],
  setLoginEnter: [],
  itemInfoPerson: [],
  setItemInfoPerson: [],
  personValue: [],
  setPersonValue: [],
  open: [],
  setOpen: [],
  menuPerson: [],
  setMenuPerson: [],
  singEmailError: [],
  setSingEmailError: [],
  singPasswordError: [],
  setSingPasswordError: [],
  singUserNameError: [],
  setSingUserNameError: [],
  show: [],
  setShow: [],
});

const Contexts = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [infoPerson, setInfoPerson] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(null);
  const [newSearch, setNewSearch] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [count, setCount] = useState(0);
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginText, setLoginText] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginEnter, setLoginEnter] = useState("");
  const [singUserNameError, setSingUserNameError] = useState("");
  const [singPasswordError, setSingPasswordError] = useState("");
  const [singEmailError, setSingEmailError] = useState("");
  const [personValue, setPersonValue] = useState([]);
  const [open, setOpen] = useState(false);
  const [menuPerson, setMenuPerson] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    onValue(ref(db, "/Items"), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      if (data !== null) {
        // eslint-disable-next-line array-callback-return
        Object.values(data).map((todo) => {
          setTodos((oldArray) => [...oldArray, todo]);
        });
        setLoading(false);
      }
    });
  }, [setLoading, setTodos]);

  useEffect(() => {
    onValue(ref(db, "/InfoPerson"), (snapshot) => {
      setInfoPerson([]);
      const data = snapshot.val();
      if (data !== null) {
        // eslint-disable-next-line array-callback-return
        Object.values(data).map((infoo) => {
          setInfoPerson((oldArray) => [...oldArray, infoo]);
        });
      }
    });
  }, [setInfoPerson]);

  const findElement = infoPerson.find((el) => {
    return el.userName === loginEnter;
  });

  useEffect(() => {
    if (findElement) {
      setPersonValue(Object.values(findElement.Items));
    }
  }, [findElement]);

  const add = (id, countItem) => {
    const plus = countItem + 1;
    update(ref(db, `/InfoPerson/${findElement.userName}/Items/${id}`), {
      count: plus,
    });
  };
  const remove = (id, countItem) => {
    const low = countItem - 1;
    if (low >= 0) {
      update(ref(db, `/InfoPerson/${findElement.userName}/Items/${id}`), {
        count: low,
      });
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <myContexts.Provider
      value={{
        todos,
        setTodos,
        loading,
        setLoading,
        search,
        setSearch,
        newSearch,
        setNewSearch,
        details,
        setDetails,
        title,
        setTitle,
        price,
        setPrice,
        count,
        setCount,
        userName,
        setUserName,
        fullName,
        setFullName,
        email,
        setEmail,
        password,
        setPassword,
        loginText,
        setLoginText,
        loginPassword,
        setLoginPassword,
        infoPerson,
        setInfoPerson,
        loginError,
        setLoginError,
        loginEnter,
        setLoginEnter,
        add,
        remove,
        findElement,
        personValue,
        setPersonValue,
        open,
        setOpen,
        menuPerson,
        setMenuPerson,
        handleOpen,
        handleClose,
        singEmailError,
        setSingEmailError,
        singPasswordError,
        setSingPasswordError,
        singUserNameError,
        setSingUserNameError,
        show,
        setShow,
      }}
    >
      {children}
    </myContexts.Provider>
  );
};

export default Contexts;
