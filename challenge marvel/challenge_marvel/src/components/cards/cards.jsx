import {useEffect, useState} from 'react';
import styles from './cards.module.css';

const Cards = ({data, setOpenModal, setCharSelected}) => {
  const [inFavourite, setInFavourite] = useState (false);

  //Chequea al montar la card que se encuentre en favoritos para pintar la star
  useEffect (
    () => {
      let favourite = JSON.parse (localStorage.getItem ('Favourites')) || []; //pinta los favoritos de las cards
      let pos = favourite.findIndex (el => el.name === data.name);
      if (pos > -1) {
        setInFavourite (true);
      } else {
        setInFavourite (false);
      }
    },
    [data]
  );

  //Agrega a favoritos
  const AddFavourites = title => {
    let favourite = JSON.parse (localStorage.getItem ('Favourites')) || [];
    let pos = favourite.findIndex (el => el.name === title);
    if (pos <= 0) {
      //si devuelve -1 no va agregarlo a favoritos
      favourite.push (data);
      localStorage.setItem ('Favourites', JSON.stringify (favourite));
      setInFavourite (true);
    }
  };

  //Elimina de favoritos a la card
  const DeleteFavourites = title => {
    let favourite = JSON.parse (localStorage.getItem ('Favourites')) || [];
    let favoriteFilter = favourite.filter (
      el => el.name.toLowerCase () !== title.toLowerCase ()
    );
    localStorage.setItem ('Favourites', JSON.stringify (favoriteFilter));
    setInFavourite (false);
  };

  return (
    <div className={styles.contain} data-aos="zoom-in" data-aos-duration="1500">
      <div className={styles.favourite}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-star"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          stroke-width="1"
          stroke="gainsboro"
          fill={inFavourite === true ? 'gainsboro' : 'none'}
          stroke-linecap="round"
          stroke-linejoin="round"
          onClick={
            !inFavourite
              ? () => {
                  AddFavourites (data.name);
                }
              : () => {
                  DeleteFavourites (data.name);
                }
          }
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
        </svg>

      </div>

      <div>
        <img
          src={data.thumbnail.path + '.' + data.thumbnail.extension}
          alt={`${data.name}`}
          onClick={() => setOpenModal (true) & setCharSelected (data)}
        />
      </div>

      <div className={styles.title}>
        <p>{data.name}</p>
      </div>
    </div>
  );
};

export default Cards;
