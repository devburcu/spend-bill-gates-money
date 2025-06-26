import formatPrice from "../utils/formatPrice";

// Büyük sayıları kısaltan yardımcı fonksiyon
function formatCount(count) {
    if (count >= 1_000_000_000) {
      return (count / 1_000_000_000).toFixed(1) + "B";
    }
    if (count >= 1_000_000) {
      return (count / 1_000_000).toFixed(1) + "M";
    }
    if (count >= 1_000) {
      return (count / 1_000).toFixed(1) + "K";
    }
    
    return count.toString();
  }

function Receipt({ products }) {
    const receiptItems = products.filter((p) => p.count > 0);

    if (receiptItems.length === 0) return null;

    const total = receiptItems.reduce(
        (sum, item) => sum + item.count * item.price,
        0
    );

    return (
        <div className="receipt-section">
            <h2 className="receipt-title">Your Receipt</h2>
            <div className="receipt-list">
                {receiptItems.map((item) => (
                    <div className="receipt-item" key={item.id}>
                        <span className="receipt-name">{item.title}</span>
                        <span className="receipt-count">x{formatCount(item.count)}</span>
                        <span className="receipt-price">
                            {formatPrice(item.price * item.count)}
                        </span>
                    </div>
                ))}
                <div className="receipt-total">
                    <span className="total-label">TOTAL</span>
                    <span className="total-amount">${total.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}

export default Receipt;
