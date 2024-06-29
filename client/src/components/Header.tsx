import userStarIcon from '../assets/user-star.png'
import cartIcon from '../assets/cart.png'
import Cart, { CMethods } from './Cart';
import { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from "../app/hooks.ts";
import Search from "./Search.tsx";

const Header = () => {

  const token = useAppSelector((state) => state.user.token);
  const cartRef = useRef<CMethods>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleCart = (): void => {
    if (!token) return;
    if (cartRef.current) {
      cartRef.current.toggle();
    }
  };

  const toggleSignIn = () => {
    if (token) {
      doSignOut();
    } else {
      navigate("/signin");
    }
  };

  const doSignOut = () => {
    localStorage.clear();
    window.location.href = '/signin';
  };

  return (
    <>
      <header className="bg-black-common pb-2.5 lg:pb-0">
        <nav className="flex justify-between items-center w-full lg:px-12 px-6 py-2">
          <div className="flex items-center">
            <h1 className="text-3xl text-white font-bold cursor-pointer" onClick={() => {navigate("/")}}>
              <span className="hidden lg:inline">Management </span>
              <span className="lg:hidden">M</span>
              <span className="text-xs">Chuwa</span>
            </h1>
            {location.pathname === '/' && <Search className="hidden lg:block"/>}
          </div>
          <div className="flex items-center">
            <img src={userStarIcon} alt='' className="w-7 h-7"/>
            <span className="text-white cursor-pointer ml-2 text-base font-semibold" onClick={toggleSignIn}>
              {token ? "Sign Out" : "Sign In"}
            </span>
            <img src={cartIcon} alt='' onClick={toggleCart} className={`w-8 h-8 ml-6 ${token? 'cursor-pointer' : 'cursor-default'}`}/>
            <span className="text-white ml-2 text-base font-semibold">$0.00</span>
          </div>
        </nav>
        {location.pathname === '/' && <Search className="lg:hidden"/>}
      </header>
      <Cart ref={cartRef}/>
    </>
  )
}

export default Header;
