import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import Header from "./components/Header";
import Home from "./views/Home";
import Hotel from "./views/Hotel";
import Hotels from "./views/Hotels";
import ReactPixel from "react-facebook-pixel";
import { useDispatch } from "react-redux";
import { fetchHotels } from "./store/actions/hotels";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    ReactPixel.init("256044018098132", {}, { autoConfig: true, debug: true });
    dispatch(fetchHotels());
  }, [dispatch]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/hotels/:id" element={<Hotel />} />
        <Route path="/hotels" element={<Hotels />} />
      </Routes>
    </>
  );
}

export default App;
