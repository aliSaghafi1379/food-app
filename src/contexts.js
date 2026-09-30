import { createContext, useEffect, useState } from "react";
import { supabase } from "./supabase";

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
  sessionData:[],
  setSessionData:[]
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
  const [session, setSession] = useState(null);
  const [authLoading , setAuthLoading]=useState(true)


  // Sessions
  useEffect(() => {
    const loadAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      if (!session) {
        setInfoPerson([]);
        setLoginEnter("");
        setAuthLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("GET PROFILE ERROR:", error);
        setAuthLoading(false);
        return;
      }

      setInfoPerson([data]);
      setLoginEnter(data.username);
      setUserName(data.username);
      setFullName(data.full_name);
      setEmail(data.email);

      setAuthLoading(false);
    };

    loadAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);

      if (event === "SIGNED_OUT") {
        setInfoPerson([]);
        setLoginEnter("");
        setUserName("");
        setFullName("");
        setEmail("");
        setAuthLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // گرفتن غذاها از Supabase
  useEffect(() => {
    const getItems = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("items")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("GET ITEMS ERROR:", error);
        setTodos([]);
      } else {
        setTodos(data || []);
        if (data && data.length > 0) {
            setLoading(false);
                }
      }
    };

    getItems();
  }, []);

  // کاربر فعلی
  const findElement = infoPerson[0]

  // گرفتن سبد خرید کاربر
  useEffect(() => {
      const getCart = async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const user = session?.user;

        // اگر کاربر لاگ‌اوت است
        if (!user) {
          setPersonValue([]);

          setTodos((oldTodos) =>
            oldTodos.map((item) => ({
              ...item,
              count: 0,
            }))
          );

          return;
        }

        const { data, error } = await supabase
          .from("cart_items")
          .select(`
            count,
            item_id,
            items (*)
          `)
          .eq("user_id", user.id);

        if (error) {
          console.error("GET CART ERROR:", error);
          setPersonValue([]);
          return;
        }

        const cart = (data || []).map((item) => ({
          ...item.items,
          count: item.count,
        }));

        setPersonValue(cart);

        // تعدادهای کاربر فعلی را روی محصولات اعمال می‌کنیم
        setTodos((oldTodos) =>
          oldTodos.map((item) => {
            const cartItem = cart.find(
              (cartProduct) => cartProduct.id === item.id
            );

            return {
              ...item,
              count: cartItem ? cartItem.count : 0,
            };
          })
        );
      };

      getCart();
    }, [loginEnter]);

  // اضافه کردن به سبد
  const add = async (id, countItem) => {
    
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const newCount = (countItem ?? 0) + 1 ;

    const { error } = await supabase
      .from("cart_items")
      .upsert(
        {
          user_id: user.id,
          item_id: id,
          count: newCount,
        },
        {
          onConflict: "user_id,item_id",
        }
      );

    if (error) {
      console.error("ADD CART ERROR:", error);
      return;
    }

    setPersonValue((oldArray) => {
        const exists = oldArray.some((item) => item.id === id);

        if (exists) {
          return oldArray.map((item) =>
            item.id === id
              ? { ...item, count: newCount }
              : item
          );
        }

        const product = todos.find((item) => item.id === id);

        if (!product) return oldArray;

        return [
          ...oldArray,
          {
            ...product,
            count: newCount,
          },
        ];
      });
      setTodos((oldTodos) =>
          oldTodos.map((item) =>
            item.id === id
              ? { ...item, count: newCount }
              : item
          )
        );
  };

  // کم کردن از سبد
  const remove = async (id, countItem) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const newCount = countItem - 1;

    if (newCount < 0) return;

    const { error } = await supabase
      .from("cart_items")
      .update({
        count: newCount,
      })
      .eq("user_id", user.id)
      .eq("item_id", id);

    if (error) {
      console.error("REMOVE CART ERROR:", error);
      return;
    }

    setPersonValue((oldArray) =>
      oldArray.map((item) =>
        item.id === id
          ? { ...item, count: newCount }
          : item
      )
    );

    setTodos((oldTodos) =>
        oldTodos.map((item) =>
          item.id === id
            ? { ...item, count: newCount }
            : item
        )
      );
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
        session,
        setSession,
        authLoading,
        setAuthLoading
      }}
    >
      {children}
    </myContexts.Provider>
  );
};

export default Contexts;