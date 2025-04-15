import { useContext, useState } from "react";
import { MetaContext } from "../context/PixelContext";
import { useParams, NavLink } from "react-router";
import UseDetailsInput from './UserDetailsInput'
const Product = () => {
  const { state } = useContext(MetaContext);
  
  const [userInfo, setUserInfo] = useState({});
  const { id } = useParams();
  const content = state.catalogContent.find((catalog) => catalog.id === id);
  

  if (!content) return "No catalog items found";
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <UserDetailsInput
        onChange={handleUserInfo}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
      <h3>{content.title}</h3>
      <img height="400px" width="400px" src={content.image_link} />
      <p>{content.description}</p>
      <p>{content.price}</p>
      <div style={{ display: "flex", columnGap: "0.25rem" }}>
        <NavLink to={window.location.origin}>Back</NavLink>
        <button>Add to cart</button>
        <button>Purchase</button>
      </div>
    </div>
  );
};

export default Product;
