import { FC, useEffect, useState } from "react";
import InstanceOfAxios from "../../utils/intanceAxios";
import style from "./sells.module.css";
import { Sells } from "../../interfaces/interfaces";
import { Footer } from "../../components/Footer/Footer";
import { formatDateTime } from "../../utils/functions";

const SellPage: FC = () => {
  const [sells, setSells] = useState<Sells[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    try {
      const response: any = await InstanceOfAxios("/sell", "GET");
      if (Array.isArray(response)) {
        setSells(response);
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

  return (
    <div>
      {loading ? (
        <div>
          <p>loading</p>
        </div>
      ) : (
        <div className={style.containHome}>
          {sells.map((sell: Sells) => (
            <div key={sell._id}>
              <p className={style.title}>{sell.commerce.title}</p>
              <div className={style.cardContain}>
                {sell.products.map((product: any, index: number) => (
                  <div className={style.card} key={index}>
                    <div className={style.boxP}>
                      <p>{product.product.title}</p>
                    </div>
                    <div className={style.boxP}>
                      <p>${product.product.price}</p>
                    </div>
                    <div className={style.boxP}>
                      <p>{product.quantity} U.</p>
                    </div>
                  </div>
                ))}
                <div className={style.card}>
                  <div className={style.boxP}>
                    <p>Total</p>
                  </div>
                  <div className={style.boxP}>
                    <p>${sell.totalPrice}</p>
                  </div>
                    <div className={style.boxP}>
                      <p>{formatDateTime(sell.date)}</p>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className={style.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default SellPage;
