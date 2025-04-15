import { useContext } from "react";
import { MetaContext } from "../context/PixelContext";
import {useParams} from 'react-router'
const Product = () => {
  const { state } = useContext(MetaContext);
  const {id} = useParams();
  const content = state.catalogContent.find(catalog=>catalog.id===id)
  console.log(content)
  
  if(!content) return "No catalog items found"
  return <div style={{width:"100vw", height:"100vh", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"row"}}>
    <h3>{content.title}</h3>
    <img height="400px" width="400px" src={content.image_link}/>
  </div>
};

export default Product;
