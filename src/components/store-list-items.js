import React from "react";

const StoreListItem = ({ store, onStoreSelect }) => {
  const id = `stores_${store.id}`;

  return (
    <div
      onClick={() => {
        onStoreSelect(store);
      }}
      key={store.id}
      className="column"
      id={id}
    >
      {store.name}
    </div>
  );
};

export default StoreListItem;
