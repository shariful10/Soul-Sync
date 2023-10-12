import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import loginImg from "../../assets/images/workout.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { signInUser, signInWithGoogle, resetUserPassword } =
    useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const { register, handleSubmit, watch } = useForm();
  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        if (result.user) {
          toast.success("Login Success!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setError("");
          navigate(from, { replace: true });
        }
      })
      .catch((err) => {
        toast.warning(err.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setSuccess("");
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        // console.log(user);
        const saveUser = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          role: "Student",
        };
        fetch("http://localhost:5000/users/", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then(() => {
            setError("");
          });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleResetPassword = () => {
    const email = watch("email");
    resetUserPassword(email)
      .then(() => {
        toast.success("Reset link sent to your email", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        console.log(err.message);
        toast.warning(err.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="py-16 container mx-auto min-h-screen md:flex justify-center items-center">
      <Helmet>
        <title>Soul Sync | Login</title>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 p-5">
        <div className="text-center lg:text-left my-10 md:my-0 bg-cover">
          <img
            src={loginImg}
            alt=""
            className="h-full mx-auto w-full object-contain"
          />
        </div>
        {/* form Start */}
        <div className="card w-full md:max-w-[550px] md:mx-auto border border-neutral-300 px-4 py-8 md:p-10">
          <h1 className="text-center text-4xl font-bold">Login</h1>
          {error && (
            <span className="my-5 text-center text-orange-400 font-medium border border-orange-400 p-2 rounded">
              {error}
            </span>
          )}
          {success && (
            <span className="my-5 text-center text-blue-600 font-medium border border-blue-500 p-2 rounded">
              {success}
            </span>
          )}
          <form className="card-body p-0" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                {...register("email")}
                type="email"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="password"
                className="input input-bordered pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              <label className="label">
                <a
                  href="#"
                  className="label-text-alt link link-hover"
                  onClick={handleResetPassword}
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Login"
                className="btn btn-primary border-0 bg-bgPrimary rounded-lg text-white font-semibold text-xl hover:bg-[#4B2E24]"
              ></input>
            </div>
          </form>
          <div className="text-center my-4 space-y-5">
            <p>Or Sign In With</p>
            <div className="flex items-center justify-center gap-5 text-xl">
              <button
                className="p-4 text-bgPrimary bg-gray-200 rounded-full hover:bg-bgPrimary hover:text-[#f12121] duration-300"
                onClick={handleGoogleSignIn}
              >
                <FaGoogle />
              </button>
            </div>
          </div>
          <p className="text-center text-lg ">
            New to SoulSync?{" "}
            <Link
              to="/register"
              className="text-primaryOrange font-semibold hover:text-primary duration-300"
            >
              Register
            </Link>
          </p>
        </div>
        {/* Form End */}
      </div>
    </div>
  );
};

export default Login;
