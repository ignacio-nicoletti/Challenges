import { useEffect } from "react";
import "./App.css";
import Home from "./Pages/Home/Home";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
