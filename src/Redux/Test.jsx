import { useSelector } from "react-redux";

const Test = () => {
  const token = useSelector((state) => state.auth.token);
  const email = useSelector((state) => state.auth.email);
  const userType = useSelector((state) => state.auth.userType);
  return (
    <div>
      <p>Token: {token}</p>
      <p>Email: {email}</p>
      <p>User Type: {userType}</p>
    </div>
  );
};

export default Test;
