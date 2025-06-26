function BalanceBar({ balance }) {
    return (
        <div className="balance-display">
            ${balance.toLocaleString()}
        </div>
    );
}
export default BalanceBar;
