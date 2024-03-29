import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import svg from "../../assets/images/login/login.svg";
import { AuthContext } from "../contexts/AuthProvider";
import SocialLogin from "../Shared/SocialLogin";
import TitleHooks from "../Shared/TitleHooks";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const { logIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const navigate = useNavigate();

  TitleHooks("Log in");

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    logIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);

        const currentUser = {
          email: user.email,
        };

        fetch("https://react-assignment-four-server.vercel.app/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("sports-token", data.token);
          });

        setError("");
        form.reset();
        toast.success("Successfully loged in");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="hero bg-[#F6FAFF] my-20 dark:bg-black rounded-lg">
      <div className="hero-content grid md:grid-cols-2 flex-col lg:flex-row ">
        <div className="text-center lg:text-left">
          <img className="w-3/4" src={svg} alt="" />
        </div>
        <div className="card bg-[#A2CBD2] flex-shrink-0 w-full border dark:border-white sm:w-4/5 md:11/12 dark:bg-black shadow-2xl">
          <h1 className="text-3xl mt-4 font-bold dark:text-white text-center">
            Login now!
          </h1>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-white">Email</span>
              </label>
              <input
                required
                name="email"
                type="text"
                placeholder="email"
                className="input input-bordered dark:bg-black dark:border-white"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-white">Password</span>
              </label>
              <input
                required
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered dark:bg-black dark:border-white"
              />

              <label className="label">
                <Link
                  href=""
                  className="label-text-alt link link-hover dark:text-white"
                >
                  Forgot password?
                </Link>
              </label>
            </div>
            <p className="text-red-600">{error}</p>
            <div className="form-control mt-3">
              <button>
                <input
                  className="btn border-none bg-gradient-to-r from-cyan-500 to-blue-500 w-full"
                  type="submit"
                  value="Log In"
                />
              </button>
            </div>
          </form>
          <div className="flex items-center pb-3 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <p className="px-3 text-sm dark:text-gray-400">
              Login with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>
          <SocialLogin></SocialLogin>
          <p className="text-center mb-5 dark:text-white">
            New to Sports photgraphy{" "}
            <Link className="font-bold text-orange-600" to="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
