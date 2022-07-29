import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { store } from "./store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Provider>

    </>
  );
}

export default App;
