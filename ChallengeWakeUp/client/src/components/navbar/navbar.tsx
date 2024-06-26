import { FC, useState } from "react";
import { Link } from "react-router-dom";
import style from "./navbar.module.css";

const Navbar: FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(true);

  return (
    <div className={style.contain}>
      <div className={style.mobile}>
        {!showMenu ? (
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
            onClick={() => setShowMenu(true)}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
          </svg>
        ) : (
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
            onClick={() => setShowMenu(false)}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
        )}
      </div>

      <div className={showMenu ? style.options : style.optionsNone}>
        <Link to="/order" className={style.link}>
          Order
        </Link>
        <Link to="/" className={style.link}>
          Restaurants
        </Link>
        <Link to="/sells" className={style.link}>
          Sells
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
