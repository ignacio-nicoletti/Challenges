import axios from "axios";

const public_key = "0cc960625ee7722e285f4d5ce5c5cfed";
// const private_key = "d263fc106fb644b3753f7dbf02c169bf92df62da";
const timestamp = "1";
const hash = "fd4dff99dc9cdeb4b6e86243b862cd79";// https://passwords-generator.org/md5-hash  (pagina de hasheo)

export const getChars = async () => {
  try {
    const response = await axios.get(
      `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${public_key}&hash=${hash}&limit=100`
    );

    return response.data.data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getComic = async (url) => {
  try {
    const response = await axios.get(
      `${url}?ts=${timestamp}&apikey=${public_key}&hash=${hash}`
    );
console.log(response);
    return response.data.data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

//se puede resumir cada funcion de peticion en una instancia de axios pasandole, su metodo, url y demas informacion necesaria