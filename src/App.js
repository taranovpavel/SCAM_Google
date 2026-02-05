import classes from "./App.sass";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from "./page/MainPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
