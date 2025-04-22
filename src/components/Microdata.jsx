import {faker} from '@faker-js/faker'
const Microdata = () =>{
  return <div itemScope itemType="http://schema.org/Product">
  <meta itemProp="brand" content="facebook"/>
  <meta itemProp="name" content={faker.commerce.productName()}/>
  <meta itemProp="description" content={faker.commerce.productDescription()}/>
  <meta itemProp="productID" content={faker.string.uuid()}/>
  <meta itemProp="url" content="https://gossamer-outgoing-advantage.glitch.me/microdata"/>
  <meta itemProp="image" content={faker.image.urlPicsumPhotos()}/>
  <div itemProp="value" itemScope itemType="http://schema.org/PropertyValue">
    <span itemProp="propertyID" content="item_group_id"></span>
    <meta itemProp="value" content="fb_tshirts"></meta>
  </div>
  <div itemProp="offers" itemScope itemType="http://schema.org/Offer">
    <link itemProp="availability" href="http://schema.org/InStock"/>
    <link itemProp="itemCondition" href="http://schema.org/NewCondition"/>
    <meta itemProp="price" content={faker.commerce.price({ min: 10, max: 300 })}/>
    <meta itemProp="priceCurrency" content="USD"/>
  </div>
</div>
}

export default Microdata