import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { UserContext } from "./contexts/UserContext";
import AppRouter from "./router/AppRouter";
import ButtonAppBar from "./components/temp";

function App() {
  const temp = {
    id: "",
    fname: "Kanchina",
    lname: "China",
    email: "123@123",
    password: "123",
  };
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        {/* <Navbar /> */}
        <ButtonAppBar/>
        <AppRouter />
      </UserContext.Provider>
    </div>
  );
}

export default App;
