import {useEffect, useState} from 'react';
import styles from './modal.module.css';
import {getComic} from '../../utils/fetchChars';

const Modal = ({character, setOpenModal}) => {
  const [dataComic, setDataComic] = useState ([]);


  useEffect (
    () => {
      const CallComics = async () => {

        
        const data = await getComic (character.comics.collectionURI);

        setDataComic (data);
      };
      CallComics ();
    },
    [character]
  );


  return (
    <div className={styles.modalContain}>
      <div className={styles.modal}>
        <div className={styles.title}>
          <p>{character.name}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-x"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            onClick={() => setOpenModal (false)}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
        </div>
        <div className={styles.scroll}>

          {dataComic.map ((el,indice) => (
            <div className={styles.ContainComic} key={indice}>
              <div className={styles.image}>
                <img
                  src={el.thumbnail.path + '.' + character.thumbnail.extension}
                  alt="imagen"
                />
              </div>

              <div className={styles.informacionComic}>
                <div className={styles.titleComic}>
                  <p>{el.title}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-star"
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                  </svg>
                </div>
                <p>{el.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
