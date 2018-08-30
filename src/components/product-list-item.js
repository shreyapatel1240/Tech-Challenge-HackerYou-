import React from "react";
import noImage from "../images/No_image.png";
import { Link } from "react-router-dom";

const ProductListItem = ({ product, onProductSelect }) => {
  let img_src;
  let cssClass;
  if (product.image_thumb_url) {
    img_src = product.image_thumb_url;
  } else {
    img_src = noImage;
    cssClass = "no-image";
  }
  return (
    <div
      onClick={() => {
        if (onProductSelect) onProductSelect(product);
      }}
      key={product.id}
      className="product-list-item"
    >
      <Link to={`/beer/${product.id}`}>
        <img src={img_src} alt={product.name} className={cssClass} />
        {product.name}
        <br />
        {product.package}
        <br />
        Price: <span className="price">${product.price_in_cents / 100}</span>
      </Link>
    </div>
  );
};

export default ProductListItem;
