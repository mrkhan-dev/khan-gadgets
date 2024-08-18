import {Link, useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {LuUserCircle} from "react-icons/lu";

const Navbar = () => {
  const {user, logOut} = useAuth();
  console.log(user?.displayName);
  console.log(user?.photoURL);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate("/signUp");
  };
  return (
    <div className="navbar h-20 bg-black md:px-6 shadow-lg fixed z-10">
      <div className="flex-1">
        <Link to="/">
          <h1 className="text-2xl text-[#04F300] font-semibold">
            Khan<span className="text-orange-600">Gadgets</span>
          </h1>
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="image" />
              ) : (
                <LuUserCircle className="h-full text-white w-full" />
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu btn  menu-sm dropdown-content bg-base-100 rounded-md z-[1] mt-3 w-24 p-2 shadow"
          >
            {user ? (
              <button onClick={handleLogout}>Log Out</button>
            ) : (
              <Link to="signIn">
                <button>Login</button>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
