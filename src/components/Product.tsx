import { useContext, useState, useEffect } from "react";
import { MetaContext } from "../context/PixelContext";
import { useParams, NavLink, useNavigate } from "react-router";
import UserDetailsInput from "./UserDetailsInput";
import { sendPixel } from "../utils";
import { faker } from "@faker-js/faker";
import type { UserInfo } from "../types";

const Product = () => {
  const navigate = useNavigate();
  const { state } = useContext(MetaContext);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo>({});
  const { id } = useParams<{ id: string }>();
  const content = state.catalogContent.find((catalog) => catalog.id === id);

  useEffect(() => {
    if (!content) return;
    setLoading(true);
    const img = new Image();
    img.src = content.image_link;
    img.onload = () => setLoading(false);
  }, [id, content]);

  const handleUserInfo = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const firePixel = (eventType: string) => {
    const eventID = faker.string.uuid();
    const [price, currency] = content!.price.split(" ");
    const dataParams = { content_ids: [content!.id], quantity: 1, currency, value: price };
    sendPixel({ dataParams, eventType: "ViewContent", eventID, pixelId: state.pixelId, userInfo });
    sendPixel({ dataParams, eventType, eventID, pixelId: state.pixelId, userInfo });
  };

  const handleRandomProduct = () => {
    const randomIndex = Math.floor(Math.random() * state.catalogContent.length);
    navigate(`/product/${state.catalogContent[randomIndex].id}`);
  };

  if (!content)
    return (
      <div className="product-page">
        <div className="card" style={{ textAlign: "center", color: "var(--text-muted)" }}>
          No catalog items found.
        </div>
      </div>
    );

  return (
    <div className="product-page">
      <UserDetailsInput onChange={handleUserInfo} userInfo={userInfo} setUserInfo={setUserInfo} />
      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <h2 className="product-title">{content.title}</h2>
        {loading ? (
          <div className="product-loading">Loading image…</div>
        ) : (
          <img className="product-image" src={content.image_link} alt={content.title} />
        )}
        <p className="product-desc">{content.description}</p>
        <p className="product-price">{content.price}</p>
        <div className="btn-group">
          <NavLink to={window.location.origin} className="btn btn-ghost">← Back</NavLink>
          <button className="btn btn-secondary" onClick={handleRandomProduct}>Random Product</button>
          <button className="btn btn-primary" onClick={() => firePixel("AddToCart")}>Add to Cart</button>
          <button className="btn btn-success" onClick={() => firePixel("Purchase")}>Purchase</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
