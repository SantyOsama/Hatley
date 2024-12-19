import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import axios from "axios";
import { useSelector } from "react-redux";

const NotifyNewOfferForUser = () => {
  const [connection, setConnection] = useState(null);
  const [offers, setOffers] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://hatley.runasp.net/NotifyNewOfferForUser", {
        accessTokenFactory: () => token,
      })
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, [token]);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Connected to SignalR hub");

          connection.on("NotifyNewOfferForUser", (view, check) => {
            console.log("New offer received:", view, check);

            const adjustedView = {
              ...view,
              delivery_photo: view.delivery_photo.replace(
                "D:\\Sites\\site4609\\wwwroot\\wwwroot\\",
                "https://hatley.runasp.net/"
              ),
            };

            setOffers((prevOffers) => [
              ...prevOffers,
              { view: adjustedView, check },
            ]);
          });

          connection.onclose(async () => {
            console.log("Disconnected from SignalR hub");
            try {
              await connection.start();
              console.log("Reconnected to SignalR hub");
            } catch (err) {
              console.error("Error while reconnecting:", err);
            }
          });
        })
        .catch((err) =>
          console.error("Error while starting connection: ", err)
        );
    }

    return () => {
      if (connection) {
        connection.stop().then(() => console.log("Connection stopped"));
      }
    };
  }, [connection]);

  const handleAccept = async (offer) => {
    const { order_id, offer_value, delivery_email } = offer.view;
    const url = `https://hatley.runasp.net/api/Offer/User/Accept?orderid=${order_id}&price_of_offer=${offer_value}&delivery_email=${delivery_email}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setOffers((prevOffers) =>
          prevOffers.filter((o) => o.view.order_id !== order_id)
        );
      }
    } catch (error) {
      console.error("Error accepting offer:", error);
    }
  };

  const handleDecline = async (offer) => {
    const { order_id, offer_value, delivery_email } = offer.view;
    const url = `https://hatley.runasp.net/api/Offer/User/Decline?orderid=${order_id}&price_of_offer=${offer_value}&delivery_email=${delivery_email}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setOffers((prevOffers) =>
          prevOffers.filter((o) => o.view.order_id !== order_id)
        );
      }
    } catch (error) {
      console.error("Error declining offer:", error);
    }
  };

  return (
    <>
      <h1>Received Offers</h1>
      <div>
        {offers.map((offer, index) => (
          <div key={index}>
            <h2>Offer {index + 1}</h2>
            <p>
              <strong>Order ID:</strong> {offer.view.order_id}
            </p>
            <p>
              <strong>Offer ID:</strong> {offer.view.offer_id}
            </p>
            <p>
              <strong>Delivery Email:</strong> {offer.view.delivery_email}
            </p>
            <p>
              <strong>Delivery Name:</strong> {offer.view.delivery_name}
            </p>
            <p>
              <strong>Delivery Photo:</strong>
              <img
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                src={offer.view.delivery_photo}
                alt="Delivery"
              />
            </p>
            <p>
              <strong>Delivery Avg Rate:</strong> {offer.view.delivery_avg_rate}
            </p>
            <p>
              <strong>Delivery Count Rate:</strong>{" "}
              {offer.view.delivery_count_rate}
            </p>
            <p>
              <strong>Offer Value:</strong> {offer.view.offer_value}
            </p>
            <p>
              <strong>User Email:</strong> {offer.check.email}
            </p>
            <p>
              <strong>Type:</strong> {offer.check.type}
            </p>
            <button onClick={() => handleAccept(offer)}>Accept</button>
            <button onClick={() => handleDecline(offer)}>Decline</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default NotifyNewOfferForUser;
