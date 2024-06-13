import { Outlet } from "react-router-dom";
import Header from '../components/Header';
import Footer from "../components/Footer";

const App = () => {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <Header/>
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer/>
    </div>
  )
}

export default App
