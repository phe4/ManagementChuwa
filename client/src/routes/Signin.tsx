import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const login = () => {
    navigate("/products");
  };

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Signin
      </h1>
      <button onClick={login}>Login</button>
    </>
  )
}

export default Signin;
