import React, { useState } from "react";
import { products as initialProducts } from "./data/products";
import ProductCard from "./Components/ProductCard";
import BalanceBar from "./Components/BalanceBar";
import Receipt from "./Components/Receipt";
import '../src/App.css'

const INITIAL_BALANCE = 100000000000;

function App() {
  const [products, setProducts] = useState(initialProducts);

  const totalSpent = products.reduce(
    (sum, item) => sum + item.count * item.price,
    0
  );

  const balance = INITIAL_BALANCE - totalSpent;

  const handleInputChange = (productId, newCount) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, count: newCount }
          : product
      )
    );
  };

  const handleBuy = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, count: product.count + 1 }
          : product
      )
    );
  };

  const handleSell = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId && product.count > 0
          ? { ...product, count: product.count - 1 }
          : product
      )
    );
  };
  return (
    <>
      <header className="header">
        <div className="container">
          <img className="header-image" src="https://neal.fun/spend/billgates.jpg" alt="Bill Gates" />
          <h1 className="app-title">Spend Bill Gates' Money</h1>
        </div>
      </header>
      <div className="main-content">
        <BalanceBar balance={balance} />
      </div>

      <div className="products">
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuy={handleBuy}
              onSell={handleSell}
              onInputChange={handleInputChange}
              balance={balance}
              totalSpent={totalSpent}
              initialBalance={INITIAL_BALANCE}
            />
          ))}
        </div>
      </div>

      <Receipt products={products} />

    </>
  );
}

export default App;
