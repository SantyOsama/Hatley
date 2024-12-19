// VerticalLinks.js
import React from "react";
import { Link } from "react-router-dom";
import ".//VerticalLinks.css";
function VerticalLinks({
  link1 = "",
  path1 = "",
  link2 = "",
  path2 = "",
  link3 = "",
  path3 = "",
}) {
  return (
    <div className="vertical-links mt-4">
      <Link to={path1}>{link1}</Link>
      <Link to={path2}>{link2}</Link>
      <Link to={path3}>{link3}</Link>

      {/*<a href="/">{Forgot_your_password}</a>
      <a href="/">{Create_an_account}</a>
      <a href="/">{Login_as_Delivery}</a>*/}
    </div>
  );
}

export default VerticalLinks;
