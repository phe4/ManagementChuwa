import { useNavigate, Link } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const login = () => {
    navigate("/products");
  };

  return (
    <div className="bg-white shadow rounded w-11/12 max-w-lg max-h-9/10 overflow-y-auto flex flex-col items-center justify-center px-9">
      <h2 className="text-black-common text-2xl md:text-3xl font-bold pt-10 pb-8 text-center">Sign in to your account</h2>
      <div className="flex flex-col w-full">
        <label className="text-base font-normal text-gray">Email</label>
        <input className="h-12 border border-solid border-gray-border rounded px-1.5 outline-0"/>
        <span className="text-sm font-normal text-red text-right">Invalid Email Input</span>
      </div>
      <div className="flex flex-col w-full mt-2.5">
        <label className="text-base font-normal text-gray">Password</label>
        <div className="relative w-full">
          <input type="password" className="w-full h-12 border border-solid border-gray-border rounded pl-2.5 pr-12 outline-0"/>
          <span className="absolute right-3 inset-y-1/4 text-sm font-normal text-gray underline cursor-pointer">Show</span>
        </div>
        <span className="text-sm font-normal text-red text-right">Invalid Email Input</span>
      </div>
      <button className="bg-blue text-white rounded w-full text-base font-semibold py-3 my-4" onClick={login}>Sign In</button>
      <div className="flex flex-col md:flex-row md:justify-between w-full pb-12">
        <p className="text-sm font-normal text-gray md:text-left text-center">
          Don’t have an account?
          <Link className="font-medium text-sm text-blue underline" to="/signup">Sign Up</Link>
        </p>
        <Link className="font-medium text-sm text-blue underline md:text-left text-center mt-3 md:mt-0" to="/signup">Forgot password?</Link>
      </div>
    </div>
  )
}

export default Signin;
