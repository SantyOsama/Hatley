import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import * as Pages from "../Routes";
import * as Components from "../Components";
import Test from "../Redux/Test";
import NotifyOfAcceptOrDeclineForDeliveryOffer from "../Hub/NotifyOfAcceptOrDeclineForDeliveryOffer";
import NotifyNewOfferForUser from "../Hub/NotifyNewOfferForUser";
import NotifyNewOrderForDelivery from "../Hub/NotifyNewOrderForDelivery";
import NotifyChangeStatusForUser from "../Hub/NotifyChangeStatusForUser";
import NotificationDisplay from "../Hub/NotificationDisplay";
import { useSelector } from "react-redux";
const PrivateRoute = ({ allowedRoles }) => {
  const userType = useSelector((state) => state.auth.userType);
  // console.log(userType);
  return allowedRoles.includes(userType) ? (
    <Outlet />
  ) : userType === null ? (
    <Navigate to="/loginUser" replace />
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      {/*****************PAGES THAT PUBLIC FOR ALL USERS***************************/}
      <Route path="/test" element={<Test />} />
      <Route
        path="/NotifyNewOfferForUser"
        element={<NotifyNewOfferForUser />}
      />
      <Route
        path="/NotifyOfAcceptOrDeclineForDeliveryOffer"
        element={<NotifyOfAcceptOrDeclineForDeliveryOffer />}
      />
      <Route path="/NotificationDisplay" element={<NotificationDisplay />} />
      <Route
        path="/NotifyNewOrderForDelivery"
        element={<NotifyNewOrderForDelivery />}
      />
      <Route
        path="/NotifyChangeStatusForUser"
        element={<NotifyChangeStatusForUser />}
      />
      <Route path="/Notification" element={<Components.Notification />} />
      <Route path="/registerUser" element={<Components.RegisterUser2 />} />
      <Route
        path="/registerDelivery"
        element={<Components.RegisterDelivery2 />}
      />
      <Route
        path="/delivery/loginDelivery"
        element={
          <Components.LoginDelivery2
            title="Sign in as Delivery"
            link1="Forgot your password?"
            path1="/forgetPassword"
            link2="Login as User"
            path2="/home/loginUser"
            link3="Create an account"
            path3="/registerDelivery"
          />
        }
      />
      <Route
        path="/home/loginUser"
        element={
          <Components.LoginUser2
            title="Sign in as User"
            link1="Forgot your password?"
            path1="/forgetPassword"
            link2="Login as Delivery"
            path2="/delivery/loginDelivery"
            link3="Create an account"
            path3="/registerUser"
          />
        }
      />
      <Route
        path="/loginUser"
        element={
          <Components.LoginUser2
            title="Sign in as User"
            link1="Forgot your password?"
            path1="/forgetPassword"
            link2="Login as Delivery"
            path2="/delivery/loginDelivery"
            link3="Create an account"
            path3="/registerUser"
          />
        }
      />
      <Route path="/forgetPassword" element={<Components.ForgetPassword />} />
      <Route path="/donePage" element={<Pages.DonePage />} />
      <Route path="*" element={<Components.NotFoundPage />} />
      {/* <Route element={<PrivateRoute allowedRoles={["USER", ""]} />}>
        <Route path="/" element={<Pages.HomePageUser />} />
      </Route>
      <Route element={<PrivateRoute allowedRoles={["DELIVERY"]} />}>
        <Route path="/" element={<Pages.HomePageDelivery />} />
      </Route> */}
      <Route
        path="/"
        element={
          <Navigate
            to={
              useSelector((state) =>
                state.auth.userType === "DELIVERY"
                  ? "/delivery/home-delivery"
                  : "/home"
              ) || "/home"
            }
          />
        }
      />
      {/* *************************ALL not logged in**********************************/}
      <Route element={<PrivateRoute allowedRoles={["USER", null]} />}>
        <Route path="/home" element={<Pages.HomePageUser />} />
        <Route path="/home/aboutUs" element={<Pages.Aboutus />} />
        <Route path="/home/contact" element={<Pages.Contact />} />
        <Route path="/home/ourTeam" element={<Pages.OurTeam />} />
      </Route>
      {/*****************PAGES THAT PUBLIC FOR USER ONLY ***************************/}
      <Route element={<PrivateRoute allowedRoles={["USER"]} />}>
        <Route path="/home/makeOrder" element={<Pages.MakeOrder />} />
        <Route
          path="/home/trackingOrdersUser"
          element={<Pages.TrackingOrdersUser />}
        />
        <Route
          path="/home/notificationPage"
          element={<Pages.NotificationPage />}
        />
        <Route
          path="/home/profile/questions"
          element={<Pages.QuestionsPage />}
        />
        <Route
          path="/home/profile/information"
          element={<Pages.InformationPage />}
        />
        <Route path="/home/profile/delivery" element={<Pages.Deliveries />} />
        <Route path="/home/profile/settings" element={<Pages.Settings />} />
        <Route
          path="/home/profile/myOrderPage"
          element={<Pages.MyOrderPage />}
        />
      </Route>
      {/*****************PAGES THAT PUBLIC FOR DELIVERY ONLY ***************************/}
      <Route element={<PrivateRoute allowedRoles={["DELIVERY"]} />}>
        <Route
          path="/home-delivery/notification"
          element={<Pages.NotificationPageDelivery />}
        />
        <Route
          path="/delivery/home-delivery"
          element={<Pages.HomePageDelivery />}
        />
        <Route
          path="/delivery/home-delivery/trackingOrdersDelivery"
          element={<Pages.TrackingOrdersDeliveries />}
        />
        <Route path="delivery/home-delivery">
          <Route path="aboutUs" element={<Pages.AboutusDelivery />} />
          <Route path="contact" element={<Pages.ContactDelivery />} />
          <Route path="ourTeam" element={<Pages.OurTeamDelivery />} />
        </Route>
        <Route
          path="/home-delivery/profile-delivery/orders"
          element={<Pages.DeliveriesDelivery />}
        />
        <Route
          path="/home-delivery/profile-delivery/questions"
          element={<Pages.DeliveryQuestionsPage />}
        />
        <Route
          path="/home-delivery/profile-delivery/information"
          element={<Pages.DeliveryInformation />}
        />
        <Route
          path="/home-delivery/profile-delivery/ratings"
          element={<Pages.DeliveryRatings />}
        />
        <Route
          path="/home-delivery/profile-delivery/settings"
          element={<Pages.DeliverySettingsPage />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
