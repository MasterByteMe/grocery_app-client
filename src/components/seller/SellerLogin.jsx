import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate } = useAppContext();

  //   state to store username and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // when the form will be submitted, well make the isSeller true, so the user will be logged in the seller dashboard
    setIsSeller(true);
  };

  // check if the seller is true go to seller page,if isSeller true go to seller dashboard
  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  //   if its not seller then display the form
  return (
    !isSeller && (
      <form
        className="min-h-screen flex items-center text-sm text-gray-600"
        onSubmit={onSubmitHandler}
      >
        <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
          <p className="text-2xl font-medium m-auto">
            <span className="text-primary">Seller</span>
            Login
          </p>
          <div className="w-full">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="enter your email"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary required"
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="enter your password"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary required"
            />
          </div>
          <button className="bg-primary text-white w-full py-2 rounded-md cursor-pointer">
            Login
          </button>
        </div>
      </form>
    )
  );
};

export default SellerLogin;
