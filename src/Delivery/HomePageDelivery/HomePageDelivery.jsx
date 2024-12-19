import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  Spinners,
  NavbarDelivery,
  OrderForDelivery,
  Header,
} from "../../Components";
import * as signalR from "@microsoft/signalr";
import NotificationDisplay from "../../Hub/NotificationDisplay";

function HomePageDelivery() {
  const [relatedApiOrders, setRelatedApiOrders] = useState([]);
  const [unrelatedApiOrders, setUnrelatedApiOrders] = useState([]);
  const [relatedHubOrders, setRelatedHubOrders] = useState([]);
  const [unrelatedHubOrders, setUnrelatedHubOrders] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const userEmail = useSelector((state) => state.auth.email);
  const storedOrderType = useSelector((state) => state.auth.userType);
  const [isLoading, setIsLoading] = useState(false);

  const sortOrders = (orders) => {
    return orders.sort((a, b) => b.order_id - a.order_id);
  };

  const fetchRelatedOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://hatley.runasp.net/api/Order/related/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRelatedApiOrders(sortOrders(response.data));
      console.log(response.data);
    } catch (error) {
      Swal.fire("", "There was an error fetching the related orders!", "error");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const fetchUnrelatedOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://hatley.runasp.net/api/Order/unrelated/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUnrelatedApiOrders(sortOrders(response.data));
      console.log(response.data);
    } catch (error) {
      Swal.fire(
        "",
        "There was an error fetching the unrelated orders!",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchRelatedOrders();
    fetchUnrelatedOrders();
  }, [fetchRelatedOrders, fetchUnrelatedOrders]);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://hatley.runasp.net/NotifyNewOrderForDelivery")
      .withAutomaticReconnect()
      .build();

    connection.on(
      "NotifyOrderForDeliveryHup",
      (
        orderData,
        user_Name,
        user_photo,
        user_Orders_Count,
        delivers_emails,
        orderType
      ) => {
        console.log(orderData);
        const newOrder = {
          orderData,
          user_Name,
          user_Orders_Count,
          delivers_emails,
          orderType,
          user_photo,
        };
        if (
          delivers_emails.includes(userEmail) &&
          orderType.toUpperCase() === storedOrderType.toUpperCase()
        ) {
          setRelatedHubOrders((prevRelatedHubOrders) => {
            const updatedRelatedHubOrders = prevRelatedHubOrders.filter(
              (order) => order.orderData.order_id !== orderData.order_id
            );
            return sortOrders([newOrder, ...updatedRelatedHubOrders]);
          });
          setRelatedApiOrders((prevRelatedApiOrders) =>
            sortOrders(
              prevRelatedApiOrders.filter(
                (order) => order.order_id !== orderData.order_id
              )
            )
          );
        } else {
          setUnrelatedHubOrders((prevUnrelatedHubOrders) => {
            const updatedUnrelatedHubOrders = prevUnrelatedHubOrders.filter(
              (order) => order.orderData.order_id !== orderData.order_id
            );
            return sortOrders([newOrder, ...updatedUnrelatedHubOrders]);
          });
          setUnrelatedApiOrders((prevUnrelatedApiOrders) =>
            sortOrders(
              prevUnrelatedApiOrders.filter(
                (order) => order.order_id !== orderData.order_id
              )
            )
          );
        }
      }
    );

    connection
      .start()
      .then(() => console.log("Connected to SignalR hub"))
      .catch((err) => console.error("Error connecting to SignalR hub", err));

    return () => {
      connection
        .stop()
        .then(() => console.log("Disconnected from SignalR hub"))
        .catch((err) =>
          console.error("Error disconnecting from SignalR hub", err)
        );
    };
  }, [userEmail, storedOrderType]);

  return (
    <>
      <NavbarDelivery />
      <NotificationDisplay />
      {isLoading ? (
        <Spinners />
      ) : (
        <>
          <div>
            <div className="m-5">
              <Header text={"Orders near you"} />
            </div>
            {relatedApiOrders.map((order, index) => (
              <OrderForDelivery
                key={order.order_id}
                name={order.name}
                price={order.price}
                to={order.order_zone_to}
                from={order.order_zone_from}
                OrderDetails={order.description}
                orderId={order.order_id}
                photo={order.photo}
                rating={order.avg_rate}
                count={order.orders_count}
                time={order.order_time}
              />
            ))}
          </div>
          <div>
            <div className="m-5">
              {/* <Header text={"Related Hub Orders"} /> */}
            </div>
            {relatedHubOrders.map((order, index) => (
              <OrderForDelivery
                key={order.orderData.order_id}
                name={order.user_Name}
                price={order.orderData.price}
                to={order.orderData.order_zone_to}
                from={order.orderData.order_zone_from}
                OrderDetails={order.orderData.description}
                orderId={order.orderData.order_id}
                photo={order.user_photo}
                rating={order.orderData.rating}
                count={order.user_Orders_Count}
                time={order.orderData.order_time}
              />
            ))}
          </div>
          <div>
            <div className="m-5">
              <Header text={"Orders may be near you"} />
            </div>
            {unrelatedApiOrders.map((order, index) => (
              <OrderForDelivery
                key={order.order_id}
                name={order.name}
                price={order.price}
                to={order.order_zone_to}
                from={order.order_zone_from}
                OrderDetails={order.description}
                orderId={order.order_id}
                photo={order.photo}
                rating={order.avg_rate}
                count={order.orders_count}
                time={order.order_time}
              />
            ))}
          </div>
          <div>
            <div className="m-5">
              {/* <Header text={"Unrelated Hub Orders"} /> */}
            </div>
            {unrelatedHubOrders.map((order, index) => (
              <OrderForDelivery
                key={order.orderData.order_id}
                name={order.user_Name}
                price={order.orderData.price}
                to={order.orderData.order_zone_to}
                from={order.orderData.order_zone_from}
                OrderDetails={order.orderData.description}
                orderId={order.orderData.order_id}
                photo={order.user_photo}
                rating={order.orderData.rating}
                count={order.user_Orders_Count}
                time={order.orderData.order_time}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default HomePageDelivery;
