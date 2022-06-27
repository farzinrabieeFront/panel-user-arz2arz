import "animate.css/animate.min.css";
import "react-toastify/dist/ReactToastify.css";
import Routing from "./routes/Routing";
import { ToastContainer } from "react-toastify";

function App() {
  return [
    <Routing />
    ,
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  ]
}

export default App;
