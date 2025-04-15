import { useContext, useState, useEffect } from "react";
import { MetaContext } from "../context/PixelContext";
import { useParams, NavLink, useNavigate } from "react-router";
import UserDetailsInput from "./UserDetailsInput";
import { sendPixel } from "../utils";
import { faker } from "@faker-js/faker";
const Product = () => {
  const navigate = useNavigate()
  const { state } = useContext(MetaContext);
  const [loading,setLoading] = useState(true);

  const [userInfo, setUserInfo] = useState({});
  const { id } = useParams();
  const content = state.catalogContent.find((catalog) => catalog.id === id);
  useEffect(()=>{
    if(!content) return
    setLoading(true)
    const img = new Image();
    img.src = content.image_link
    img.onload = () => {
      setLoading(false);
    };
  },[id,content])
  const handleUserInfo = (e) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleAddToCart = () => {
    const eventID = faker.string.uuid();
    const [price, currency] = content.price.split(" ");
    const dataParams = {
      content_ids: [content.id],
      quantity: 1,
      currency,
      value: price,
    };
    sendPixel({
      dataParams,
      eventType: "ViewContent",
      eventID,
      pixelId: state.pixelId,
      userInfo,
    });
    sendPixel({
      dataParams,
      eventType: "AddToCart",
      eventID,
      pixelId: state.pixelId,
      userInfo,
    });
  };

  const handlePurchase = () => {
    const eventID = faker.string.uuid();
    const [price, currency] = content.price.split(" ");
    const dataParams = {
      content_ids: [content.id],
      quantity: 1,
      currency,
      value: price,
    };
    sendPixel({
      dataParams,
      eventType: "ViewContent",
      eventID,
      pixelId: state.pixelId,
      userInfo,
    });
    sendPixel({
      dataParams,
      eventType: "Purchase",
      eventID,
      pixelId: state.pixelId,
      userInfo,
    });
  };

  const handleRandomProduct = () => {
    const randomIndex = Math.floor(Math.random() * state.catalogContent.length);
    navigate(`/product/${state.catalogContent[randomIndex].id}`);
  };

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
        maxWidth: "800px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <UserDetailsInput
        onChange={handleUserInfo}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
      <h3>{content.title}</h3>
      {loading ? "Loading Image...":<img height="400px" width="400px" src={content.image_link} />}
      <p>{content.description}</p>
      <p>{content.price}</p>
      <div style={{ display: "flex", columnGap: "0.25rem" }}>
        <NavLink to={window.location.origin}>Back</NavLink>
        <button onClick={handleRandomProduct}>Random Product</button>
        <button onClick={handleAddToCart}>Add to cart</button>
        <button onClick={handlePurchase}>Purchase</button>
      </div>
    </div>
  );
};

export default Product;
