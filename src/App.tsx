import React from "react";
import "./App.scss";
import { Route, BrowserRouter as  Router, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NewDrinkForm from "./pages/NewDrinkForm/NewDrinkForm";
import Navbar from "./components/Navbar/Navbar";
import "./styles/global.scss";
import CocktailDetails from "./pages/CocktailDetails/CocktailDetails";
function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="new-drink-form" element={<NewDrinkForm />} />
          <Route path="cocktail/:id" element={<CocktailDetails/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
