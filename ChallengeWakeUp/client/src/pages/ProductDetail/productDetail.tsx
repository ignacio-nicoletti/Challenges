import { FC, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Restaurant } from "../../interfaces/interfaces";
import InstanceOfAxios from "../../utils/intanceAxios";
import style from "./productDetail.module.css";

const ProductDetail: FC = () => {
  const { id } = useParams();
  const [restaurantDetail, setRestaurantDetail] = useState<Restaurant>();
  const [loading, setLoading] = useState<boolean>(true);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [inputsData, setInputData] = useState({
    title: "",
    price: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const property = event.target.name;
    const value = event.target.value;
    setInputData({ ...inputsData, [property]: value });
  };

  const fetchProducts = async () => {
    try {
      const response: any = await InstanceOfAxios(`/restaurant/${id}`, "GET");

      setRestaurantDetail(response.restaurant);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await InstanceOfAxios(`/restaurant/${id}`, "PUT", { inputsData });
    setAddModal(false);
    setInputData({
      title: "",
      price: 0,
    });
    fetchProducts();
  };

  const handleDeleteProduct = async (productId: string) => {
    console.log(productId);
    
    try {
      await InstanceOfAxios(`/restaurant/${id}`, "PUT",{dataDelete:productId});
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <div className={style.contain}>
        {loading === true ? (
          <div>
            <p>loading</p>
          </div>
        ) : (
          <div>
            <div className={style.cardContain}>
              <div className={style.subCardContain}>
                <h1>{restaurantDetail?.title}</h1>
                <p>Adress: {restaurantDetail?.adress}</p>
              </div>
            </div>
            <div className={style.menuContain}>
              <div className={style.menuCardContain}>
                <p className={style.menuTitle}>MENU</p>
                {restaurantDetail?.products?.map((el: any) => (
                  <div className={style.Menucard}>
                    <div className={style.BoxP}>
                      <p>{el.title}</p>
                    </div>
                    <div className={style.BoxP}>
                      <p>${el.price}</p>
                    </div>
                    <div className={style.BoxP}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        onClick={() => handleDeleteProduct(el)}
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                        <path d="M10 10l4 4m0 -4l-4 4" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setAddModal(true);
                }}
                className={style.buttonAdd}
              >
                Add Products
              </button>
            </div>
          </div>
        )}
        {addModal == true ? (
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
                    setAddModal(false);
                  }}
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M10 10l4 4m0 -4l-4 4" />
                </svg>
              </div>
              <h3>Add Product</h3>
              <form onSubmit={handleAddProduct}>
                <div className={style.containAdd}>
                  <div className={style.containAddInput}>
                    <p>Title</p>
                    <input type="text" name="title" onChange={handleChange} />
                  </div>
                  <div className={style.containAddInput}>
                    <p>Price</p>
                    <input type="number" name="price" onChange={handleChange} />
                  </div>
                  <button
                    type="submit"
                    disabled={
                      inputsData.price < 1 || inputsData.title === ""
                        ? true
                        : false
                    }
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
