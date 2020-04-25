import React from "react";

// ICONS
import coinsIcon from "../assets/img/coins.png";
import bitcoinIcon from "../assets/img/bitcoin_icon.png";
import usdIcon from "../assets/img/usd.png";

const UserInfo = (props) => {
  const { user, rate } = props;

  const balance =
    user && rate
      ? ((1 / rate) * user.coins).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      : "";

  return (
    <section className="user-info">
      <div className="user flex align-center">
        <div className="user-img ratio-square">
          <img src="https://robohash.org/{{user._id}}" alt="Profile" />
        </div>
        <h2>Hello {user.name}!</h2>
      </div>

      <div className="coins flex align-center">
        <img className="icon" src={coinsIcon} alt="Coin" />
        {<h3>Coins: {user.coins}</h3>}
      </div>

      <div className="bitRate flex align-center">
        <img className="icon" src={bitcoinIcon} alt="BitCoin" />
        {<h3>BTC: {rate}</h3>}
      </div>

      {balance && (
        <div className="balance flex align-center">
          <img className="icon" src={usdIcon} alt="USD" />
          {<h3>Balance: {balance}</h3>}
        </div>
      )}
    </section>
  );
};

export default UserInfo;
