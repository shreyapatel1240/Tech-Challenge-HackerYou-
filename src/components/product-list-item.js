import React from "react";
import noImage from "../images/No_image.png";

const ProductListItem = ({ product, onProductSelect }) => {
  let img_src;
  if (product.image_thumb_url) {
    img_src = product.image_thumb_url;
  } else {
    img_src = noImage;
  }
  return (
    <div
      onClick={() => onProductSelect(product)}
      key={product.id}
      className="column"
    >
      <img src={img_src} alt={product.name} />
      {product.name}
      <br />
      {product.package}
    </div>
  );
};

export default ProductListItem;
