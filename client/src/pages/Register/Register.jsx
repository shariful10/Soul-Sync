import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import registerImg from "../../assets/images/workout.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const RegisterTest = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { createUser, signInWithGoogle, updateUserProfile } =
    useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data, data.confirmPassword);
    if (data.password !== data.confirmPassword) {
      setError("Password do not match");
      setSuccess("");
      return;
    }
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        updateUserProfile(loggedUser, data.name, data.photo)
          .then(() => {
            const saveUser = {
              name: data.name,
              email: data.email,
              photo: data.photo,
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
              .then((data) => {
                if (data.insertedId) {
                  toast.success("Registration Success!", {
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
              });
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        setError(err.message);
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

  return (
    <div className="py-20 container mx-auto min-h-screen md:flex justify-center items-center">
      <Helmet>
        <title>Soul Sync | Register</title>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 p-5">
        <div className="text-center lg:text-left my-10 md:my-0 bg-cover">
          <img
            src={registerImg}
            alt=""
            className="h-full mx-auto w-full object-contain"
          />
        </div>
        {/* form Start */}
        <div className="card w-full md:max-w-[550px] md:mx-auto border border-neutral-300 px-4 py-8 md:p-10">
          <h1 className="text-center text-4xl font-bold">Register</h1>
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
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                {...register("name", { required: true })}
                type="text"
                placeholder="Name"
                className="input input-bordered"
              />
              {errors.name?.type === "required" && (
                <span className="my-5 text-center text-red-500 font-medium border border-orange-400 p-2 rounded">
                  Name is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                {...register("email", { required: true })}
                type="email"
                placeholder="email"
                className="input input-bordered"
              />
              {errors.email?.type === "required" && (
                <span className="my-5 text-center text-red-500 font-medium border border-orange-400 p-2 rounded">
                  A Valid Email is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&/?*])(?=.*[0-9])(?=.*[a-z])/i,
                })}
                placeholder="password"
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <span className="my-5 text-center text-red-500 font-medium border border-orange-400 p-2 rounded">
                  Password is required
                </span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="my-5 text-center text-red-500 font-medium border border-orange-400 p-2 rounded">
                  Password must be minimum 8 character
                </span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="my-5 text-center text-red-500 font-medium border border-orange-400 p-2 rounded">
                  Password should be less than 20 character
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="my-5 text-center text-red-500 font-medium border border-orange-400 p-2 rounded">
                  Password should container 1 Uppercase 1 Lowercase 1 Number and
                  1 Special Character
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                name="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                placeholder="password"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                name="photo"
                type="text"
                {...register("photo", { required: true })}
                placeholder="PHOTO URL"
                className="input input-bordered"
              />
              {errors.photo?.type === "required" && (
                <span className="my-5 text-center text-red-500 font-medium border border-orange-400 p-2 rounded">
                  A valid photo url is required
                </span>
              )}
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Register"
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
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primaryOrange font-semibold hover:text-primary duration-300"
            >
              Login
            </Link>
          </p>
        </div>
        {/* Form End */}
      </div>
    </div>
  );
};

export default RegisterTest;
