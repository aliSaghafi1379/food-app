import { useContext } from "react";
import { myContexts } from "../contexts";
import "../scss/shop.scss";
import { supabase } from "../supabase";
import Header from "./Header";

const Shop = () => {
  const { add, remove, personValue, setPersonValue } = useContext(myContexts);

  const total = personValue.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.price * currentValue.count;
  }, 0);

  const Payments = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { error } = await supabase
        .from("cart_items")
        .update({ count: 0 })
        .eq("user_id", user.id)
        .gt("count", 0);

      if (error) {
        console.error("PAYMENT ERROR:", error);
        return;
      }

      setPersonValue((oldArray) =>
        oldArray.map((item) => ({ ...item, count: 0 }))
      );
    };

  return (
    <>
      <Header />
      <div className="container-shop">
        {total > 0 ? (
          <>
            <table className="buy-list">
              <tbody>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Number</th>
                      <th>Total price</th>
                      <th></th>
                    </tr>
                    {personValue.map((todo) =>
                      todo.count > 0 ? (
                        <tr key={todo.id} className="buy-item">
                          <td>
                            <img src={todo.url} alt="" />
                          </td>
                          <td>
                            <p>{todo.title}</p>
                          </td>
                          <td>
                            <p>{todo.count}</p>
                          </td>
                          <td>
                            <p>${todo.price * todo.count}</p>
                          </td>
                          <td>
                            <span className="order">
                              <button onClick={() => add(todo.id, todo.count)}>
                                +
                              </button>

                              <button onClick={() => remove(todo.id, todo.count)}>
                                -
                              </button>
                            </span>
                          </td>
                        </tr>
                      ) : (
                        ""
                      )
                    )}
                 </tbody>   
            </table>
            <div className="pay">
              <div className="pay-box">
                <span>
                  <p>total</p>
                  <h3>$ {total}</h3>
                </span>
                <span>
                  <button onClick={Payments}>Payment</button>
                </span>
              </div>
            </div>
          </>
        ) : (
          <h1>Not Found</h1>
        )}
      </div>
    </>
  );
};

export default Shop;
