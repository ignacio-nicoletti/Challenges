import { FC, FormEvent, useEffect, useState } from "react";
import { Restaurant } from "../../interfaces/interfaces";
import InstanceOfAxios from "../../utils/intanceAxios";
import style from "./home.module.css";
import imageRest from "../../Assets/restaurant.jpg";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";

const Home: FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalAddBar, setModalAddBar] = useState<boolean>(false);
  const [inputsData, setInputData] = useState({
    title: "",
    adress: "",
  });

  const fetchProducts = async () => {
    try {
      const response: any = await InstanceOfAxios("/restaurant", "GET");
      if (Array.isArray(response)) {
        setRestaurants(response);
        setLoading(false);
      } else {
        console.error("Error: Response is not an array:", response);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const property = event.target.name;
    const value = event.target.value;
    setInputData({ ...inputsData, [property]: value });
  };

  const handleAddBar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await InstanceOfAxios(`/restaurant/create`, "POST", { inputsData });
    setModalAddBar(false);
    setInputData({
      title: "",
      adress: "",
    });
    fetchProducts();
  };
  
  const handleDeleteBar = async (restaurant: Restaurant) => {
    try {
        await InstanceOfAxios(`/restaurant/${restaurant._id}`, "DELETE");
        fetchProducts();
    } catch (error) {
        console.error("Error deleting restaurant:", error);
    }
};

  return (
    <div>
      {loading === true ? (
        <div>
          <p>loading</p>
        </div>
      ) : (
        <div className={style.containHome}>
          <div className={style.buttonAdd} onClick={() => setModalAddBar(true)}>
            <p>Add Bar's</p>
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
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
              <path d="M9 12h6" />
              <path d="M12 9v6" />
            </svg>
          </div>
          <div className={style.containCards}>
            {restaurants.map((el: Restaurant) => (
              <div className={style.card}>
                <div className={style.divButtonDelete}>
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
                    onClick={() => handleDeleteBar(el)}
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M10 10l4 4m0 -4l-4 4" />
                  </svg>
                </div>
                <img src={imageRest} alt="" />
                <h3>{el.title}</h3>
                <p>Adress: {el.adress}</p>
                <button>
                  <Link to={`/restaurant/${el._id}`} className={style.link}>
                    View products
                  </Link>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {modalAddBar === true ? (
        <div className={style.containModal}>
          <div className={style.modalContent}>
            <div className={style.cancelModal}>
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
                onClick={() => {
                  setModalAddBar(false);
                }}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M10 10l4 4m0 -4l-4 4" />
              </svg>
            </div>
            <h3>Add commerce</h3>
            <form onSubmit={handleAddBar}>
              <div className={style.containAdd}>
                <div className={style.containAddInput}>
                  <p>Title </p>
                  <input type="text" name="title" onChange={handleChange} />
                </div>
                <div className={style.containAddInput}>
                  <p>Adress </p>
                  <input type="text" name="adress" onChange={handleChange} />
                </div>
                <button type="submit">Add commerce</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className={style.footer}>
        <Footer />
      </div>
    </div>
  );
};
export default Home;
