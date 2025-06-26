import React, { useState, useEffect } from "react";

function ProductCard({ product, onBuy, onSell, onInputChange, balance, initialBalance,totalSpent }) {
  const maxCountUI = product.id === "42" ? 1 : product.id === "45" ? 30 : Infinity;

  // Local state input için
  const [inputValue, setInputValue] = useState(product.count);

  // Parent state değişince local state güncellensin
  useEffect(() => {
    setInputValue(product.count);
  }, [product.count]);

  // Input değiştiğinde, sadece sayı ve negatif kontrolü yap, parent'ı güncelleme
  const handleInputChange = (e) => {
    let val = e.target.value;
  
    if (val === "") {
      setInputValue(val);
      onInputChange(product.id, 0);
      return;
    }
  
    let intVal = parseInt(val);
    if (isNaN(intVal) || intVal < 0) intVal = 0;
  
    const otherProductsTotal = totalSpent - product.count * product.price;
    const maxAffordableCount = Math.floor((initialBalance - otherProductsTotal) / product.price);
  
    let maxCount =
      product.id === "42"
        ? 1
        : product.id === "45"
          ? 30
          : maxAffordableCount;
  
    if (intVal > maxCount) {
      intVal = maxCount;
    }
  
    setInputValue(intVal);
    onInputChange(product.id, intVal);
  };
  
  

  // Inputa tıklanınca, 0 ise sil
  const handleFocus = () => {
    if (inputValue === 0) {
      setInputValue("");
    }
  };

  // Inputtan çıkınca sınırı uygula ve parent'a bildir
  const handleBlur = () => {
    if (inputValue === "") {
      setInputValue(0);
    }
  };
  

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <h2 className="product-title">{product.title}</h2>
      <p className="product-price">${product.price.toLocaleString()}</p>

      <div className="controls">
        <button
          className="btn-sell"
          onClick={() => onSell(product.id)}
          disabled={product.count === 0}
        >
          Sell
        </button>

        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="input-count"
          min="0"
          max={maxCountUI}
          inputMode="numeric"
          pattern="[0-9]*"
        />

        <button
          className="btn-buy"
          onClick={() => onBuy(product.id)}
          disabled={
            balance < product.price ||
            (product.id === "42" && product.count >= 1) ||
            (product.id === "45" && product.count >= 30)
          }
        >
          Buy
        </button>
      </div>
    </div>
  );
}

export default ProductCard;