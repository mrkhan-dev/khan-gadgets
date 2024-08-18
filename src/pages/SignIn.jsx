import {NavLink, useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";

const SignIn = () => {
  const {signIn} = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    await signIn(email, password);
    navigate("/");
  };

  return (
    <div>
      <section className="bg-white">
        <div className="container flex items-center justify-center mt-16 px-6 mx-auto">
          <form onSubmit={handleSignIn} className="w-full max-w-md">
            <div className="flex justify-center mx-auto">
              <img
                className="w-auto h-7 sm:h-8"
                src="https://merakiui.com/images/logo.svg"
                alt=""
              />
            </div>

            <div className="flex items-center justify-center mt-6">
              <NavLink
                className={({isActive}) =>
                  isActive
                    ? "w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500"
                    : "w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b"
                }
                to="/signIn"
              >
                sign in
              </NavLink>

              <NavLink
                className={({isActive}) =>
                  isActive
                    ? "w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500"
                    : "w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b"
                }
                to="/signUp"
                // className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 "
              >
                sign up
              </NavLink>
            </div>

            <div className="relative flex items-center mt-6">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>

              <input
                type="email"
                name="email"
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11    focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Email address"
              />
            </div>

            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>

              <input
                type="password"
                name="password"
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Password"
              />
            </div>

            <div className="mt-6">
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Sign Up
              </button>

              <div className="mt-6 text-center ">
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Already have an account?
                </a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
