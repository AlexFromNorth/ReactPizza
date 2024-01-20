import Header from "./components/header/Header";
import "./scss/app.scss";
import { Suspense, createContext, useState } from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";

// -------------
// -------------
// lazy elements
// -------------
// -------------
import { lazy } from "react";
const Cart = lazy(()=>import( /* webpackChunkName: "Cart" */ "./pages/cart/Cart"))
const NotFound = lazy(()=>import( /* webpackChunkName: "NotFound" */ "./pages/NotFound"))
const FullPizza = lazy(()=>import( /* webpackChunkName: "FullPizza" */ "./pages/FullPizza"))


export const SearchContext = createContext<{ handlerLogo: boolean; setHandlerLogo: React.Dispatch<React.SetStateAction<boolean>> } | undefined>(undefined);

function App() {
  const [handlerLogo, setHandlerLogo] = useState(false)

  return (
    <div className="wrapper">
      
      <SearchContext.Provider value={{ handlerLogo, setHandlerLogo }}>
        <Header />
        <div className="content">
          {/* <div className="container"> */}
          <Routes>
            <Route path="*" element={<Suspense fallback={<div>Загрузка...</div>}><NotFound /></Suspense>} />
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Suspense fallback={<div>Загрузка...</div>}><Cart /></Suspense>} />
            <Route path="/pizza/:id" element={<Suspense fallback={<div>Загрузка...</div>}><FullPizza /></Suspense>} />
          </Routes>
          {/* </div> */}
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
