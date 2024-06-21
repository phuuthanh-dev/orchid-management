import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Header-Footer/NavBar";
import Footer from "./components/Header-Footer/Footer";
import RouterCom from "./routes/RouterCom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <RouterCom />
      <Footer />
    </div>
  );
}

export default App;
