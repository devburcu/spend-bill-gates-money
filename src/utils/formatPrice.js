function formatPrice(amount) {
    const formatNumber = (num, suffix) => {
      const formatted = (num).toFixed(1);
      // .0 ile bitiyorsa .0'ı kaldır, değilse olduğu gibi bırak
      return `$${formatted.endsWith('.0') ? parseInt(formatted) : formatted}${suffix}`;
    };
  
    if (amount >= 1_000_000_000) {
      return formatNumber(amount / 1_000_000_000, 'b');
    } else if (amount >= 1_000_000) {
      return formatNumber(amount / 1_000_000, 'm');
    } else if (amount >= 1_000) {
      return formatNumber(amount / 1_000, 'k');
    } else {
      return `$${amount}`;
    }
  }
  
  export default formatPrice;
  