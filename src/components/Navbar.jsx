import {Link} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {LuUserCircle} from "react-icons/lu";
// import {LuUserCircle} from "react-icons/lu";

const Navbar = () => {
  const {user} = useAuth();

  return (
    <div className="navbar h-20 bg-black md:px-44 shadow-lg fixed z-10">
      <div className="flex-1">
        <Link to="/">
          <h1 className="text-2xl text-[#04F300] font-semibold">
            Khan<span className="text-orange-600">Gadgets</span>
          </h1>
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            {/* <div className="w-10 rounded-full">
              {user.photoURL ? (
                <img src={user.photoURL} alt="image" />
              ) : (
                <LuUserCircle className="h-full w-full" />
              )}
            </div> */}
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
