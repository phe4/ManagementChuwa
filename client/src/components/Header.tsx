import userStarIcon from '../assets/user-star.png'
import cartIcon from '../assets/cart.png'
import Cart, { CMethods } from './Cart';
import { useRef, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from "../app/hooks.ts";

const Header = () => {

  const token = useAppSelector((state) => state.user.token);
  const cartRef = useRef<CMethods>(null);
  const navigate = useNavigate();

  interface SProps {
    className: string
  }

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

  const SearchTemplate: FC<SProps> = ({ className }) => {
    return (
      <div className={`${className} relative rounded-md lg:w-96 lg:mx-12 mx-6`}>
        <input type="text" name="search"
               className="block w-full rounded-sm border-0 text-gray-light placeholder:text-gray-light text-base font-normal h-11 px-2.5 focus:outline-0"
               placeholder="Search"/>
        <div className="absolute inset-y-0 right-2.5 cursor-pointer flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
               className="size-6 text-gray-light text-base">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="bg-black-common pb-2.5 lg:pb-0">
        <nav className="flex justify-between items-center w-full lg:px-12 px-6 py-2">
          <div className="flex items-center">
            <h1 className="text-3xl text-white font-bold">
              <span className="hidden lg:inline">Management </span>
              <span className="lg:hidden">M</span>
              <span className="text-xs">Chuwa</span>
            </h1>
            <SearchTemplate className="hidden lg:block"/>
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
        <SearchTemplate className="lg:hidden"/>
      </header>
      <Cart ref={cartRef}/>
    </>
  )
}

export default Header;
