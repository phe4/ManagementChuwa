import { useParams } from "react-router-dom";

const ProductsEdit = () => {

  const { id} = useParams();

  return (
    <>
      <h1>Edit</h1>
      <p>{id}</p>
    </>
  );
};

export default ProductsEdit;