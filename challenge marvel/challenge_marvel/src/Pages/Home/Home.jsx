import {useEffect, useState} from 'react';

import {getChars} from '../../utils/fetchChars';
import Navbar from '../../components/navbar/navbar';
import Cards from '../../components/cards/cards';
import styles from './Home.module.css';
import Modal from '../../components/Modal/modal';
import Footer from '../../components/Footer/Footer';
import Pagination from '../../components/Pagination/pagination';
import loading from '../../assets/marvelLoading.gif';

const Home = () => {
  const [data, setdata] = useState ([]); //se almacena toda la data
  const [search, setSearch] = useState (''); //se almacena la palabra de busqueda
  const [datafilter, setDatafilter] = useState (data); //se almacena la data filtrada
  const [openModal, setOpenModal] = useState (false); // abre el modal
  const [charSelected, setCharSelected] = useState ({}); //guarda la informacion de la card seleccionada para el modal
  const [Listfavourite, setListFavourite] = useState (false); //determina si mostrar la data de la api o los guardados

  const [currentPage, setCurrentPage] = useState (1);
  const itemsPerPage = 20; // número de elementos por página

  const [darkMode, setDarkMode] = useState (false); //alterna el darkMode



  useEffect (
    () => {
    
        const CallCharacter = async () => {
          const data = await getChars (); //llamada a la api
          Listfavourite === false
            ? setdata (data)
            : setdata (JSON.parse (localStorage.getItem ('Favourites'))); // si clickeo en mis favoritos muestra los favoritos sino todos
        };
        CallCharacter ();    

    },
    [Listfavourite]
  );

  useEffect (
    () => {
      let datafiltered;
      if (search.includes ('http')) {
        datafiltered = data.filter (
          el => el.comics.collectionURI.includes (search) //Si lo buscado es un link
        );
      } else {
        datafiltered = data.filter (
          el => el.name.toLowerCase ().includes (search) //filtra lo buscado por searchBar
        );
      }
      setDatafilter (datafiltered);
    },
    [search, data]
  );

  //paginado
  const totalPages = Math.ceil (datafilter.length / itemsPerPage); //divide la data redondeando a un numero mayor para saber cuantas page son
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = datafilter.slice (startIndex, endIndex); //corta la data entre start y end

  const handlePageChange = page => {
    setCurrentPage (page);
  };

  return (
    <div
      className={darkMode === true ? styles.containDark : styles.containNoDark}
    >
      <Navbar
        search={search}
        setSearch={setSearch}
        setListFavourite={setListFavourite}
        Listfavourite={Listfavourite}
        setCurrentPage={setCurrentPage}
        setDarkMode={setDarkMode}
        darkMode={darkMode}
      />

      {data.length !== 0 // si hay data mapeala sino pone un loading
        ? <div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            <div className={styles.cardContain}>
              {search !== '' // en caso de haber algo en la barra de busqueda mapea la informacion filtrada
                ? currentItems.map ((el, indice) => (
                    <div key={indice}>

                      <Cards
                        setOpenModal={setOpenModal}
                        data={el}
                        setCharSelected={setCharSelected}
                      />
                    </div>
                  ))
                : currentItems.map ((el, indice) => ( // sino mapea todo
                    <div key={indice}>
                      <Cards
                        setOpenModal={setOpenModal}
                        data={el} //podria pasarle o los parametros necesarios para el mapeo o todo el objeto y luego manipularlo dentro del componente
                        setCharSelected={setCharSelected}
                      />
                    </div>
                  ))}
            </div>
            {/* <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            /> */}
          </div>
        : Listfavourite === false
            ? <div className={styles.loading}>
                <img src={loading} alt="gift loading" />
              </div>
            : ''}

      {/* En caso de estar vacia la lista de favoritos un mensaje  */}
      {data.length === 0 && Listfavourite === true
        ? <div
            className={styles.advice}
            data-aos="zoom-in"
            data-aos-duration="1500"
          >
            <p>Lista de favoritos vacia</p>
          </div>
        : ''}

      {/* Abre el modal al hacer click en un card */}
      {openModal === true
        ? <Modal setOpenModal={setOpenModal} character={charSelected} />
        : ''}

      <div className={styles.Footer}>
        <Footer />
      </div>

    </div>
  );
};

export default Home;
