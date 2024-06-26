import { useEffect, useState } from "react";
import style from "./order.module.css";
import { Restaurant } from "../../interfaces/interfaces"; // Asumo que tienes una interfaz para los productos
import InstanceOfAxios from "../../utils/intanceAxios";
import { Footer } from "../../components/Footer/Footer";

const Order = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCommerce, setSelectedCommerce] = useState<Restaurant | null>(
    null
  );
  const [order, setOrder] = useState<
    { product: Restaurant; quantity: number }[]
  >([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response: any = await InstanceOfAxios("/restaurant", "GET");
        if (Array.isArray(response)) {
          setRestaurants(response);
          setLoading(false);
        } else {
          console.error("Error: Response is not an array:", response);
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleSelectCommerce = (commerce: Restaurant | null) => {
    setSelectedCommerce(commerce);
  };

  const handleAddToOrder = (product: Restaurant) => {
    const existingProductIndex = order.findIndex(
      (item) => item.product.title === product.title
    );

    if (existingProductIndex !== -1) {
      // Si el producto ya está en el pedido, incrementamos la cantidad en uno
      const updatedOrder = [...order];
      updatedOrder[existingProductIndex] = {
        ...updatedOrder[existingProductIndex],
        quantity: updatedOrder[existingProductIndex].quantity + 1,
      };
      setOrder(updatedOrder);
    } else {
      // Si el producto no está en el pedido, lo agregamos como un nuevo elemento con cantidad 1
      setOrder([...order, { product, quantity: 1 }]);
    }
  };

  const handleDeleteProduct = (productId: Restaurant) => {
    const existingProductIndex = order.findIndex(
      (item) => item.product.title === productId.title
    );

    if (existingProductIndex !== -1) {
      const existingProduct = order[existingProductIndex];

      if (existingProduct.quantity === 1) {
        // Si la cantidad es 1, eliminamos el producto del pedido
        setOrder((prevOrder) =>
          prevOrder.filter((item) => item.product.title !== productId.title)
        );
      } else {
        // Si la cantidad es mayor que 1, simplemente reducimos la cantidad en uno
        const updatedOrder = [...order];
        updatedOrder[existingProductIndex] = {
          ...existingProduct,
          quantity: existingProduct.quantity - 1,
        };
        setOrder(updatedOrder);
      }
    }
  };

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.title.toLowerCase().includes(filter.toLowerCase())
  );

  const HandleSubmit = async () => {
    await InstanceOfAxios("/sell/create", "POST", {
      selectedCommerce,
      products: order,
    });
    handleSelectCommerce(null);
    setOrder([]);
  };

  return (
    <>
      <div className={style.containOrder}>
        <div
          className={
            selectedCommerce === null ? style.backArrowNone : style.backArrow
          }
          onClick={() => {
            handleSelectCommerce(null);
            setOrder([]);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
            <path d="M5 12l6 6" />
            <path d="M5 12l6 -6" />
          </svg>
          <p>Back to commerce's</p>
        </div>
        {selectedCommerce === null ? (
          <div className={style.DivComerce}>
            <div className={style.DivComerce_section}>
              <p>Commerce's</p>
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search commerce..."
              />
            </div>

            <div className={style.DivComerce_titles}>
              {filteredRestaurants.map((commerce: Restaurant) => (
                <div key={commerce._id}>
                  <p onClick={() => handleSelectCommerce(commerce)}>
                    {commerce.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={style.DivListorder}>
            <div className={style.divCards}>
              <p className={style._title}>Products</p>
              {selectedCommerce.products.map((product: Restaurant) => (
                <div key={product._id} className={style.subDivCards}>
                  <p>{product.title}</p>
                  <p>${product.price}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    onClick={() => handleAddToOrder(product)}
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                    <path d="M9 12h6" />
                    <path d="M12 9v6" />
                  </svg>
                </div>
              ))}
            </div>
            <div className={style.order}>
              <p className={style._title}>Order</p>
              {order.map((item, index) => (
                <div key={index} className={style.subDivOrder}>
                  <p>{item.product.title}</p>
                  <p>${item.product.price}</p>
                  <p>{item.quantity}u</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    onClick={() => handleDeleteProduct(item.product)}
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M10 10l4 4m0 -4l-4 4" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        )}
        <div
          className={
            selectedCommerce === null ? style.TotalDivNone : style.TotalDiv
          }
        >
          <p>Total</p>
          <p>
            $
            {order.reduce(
              (acc, curr) => acc + curr.product.price * curr.quantity,
              0
            )}
          </p>
          <p></p>
        </div>
        <div
          className={
            selectedCommerce === null
              ? style.buttonLoadOrderNone
              : style.buttonLoadOrder
          }
        >
          <button
            onClick={HandleSubmit}
            disabled={order.length > 0 ? false : true}
          >
            Send
          </button>
        </div>
      </div>
      <div className={style.footer}>
        <Footer />
      </div>
    </>
  );
};

export default Order;
