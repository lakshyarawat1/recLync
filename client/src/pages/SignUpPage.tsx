import { useState } from "react";
import Topbar from "../components/Topbar";
import { signUp } from "../api/authAPI";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const res = signUp(username, password);

    console.log(res);
  };

  return (
    <>
      <Topbar />
      <div className="bg-[#171d25] h-screen ">
        <img
          src="/login-background.jpeg"
          className="w-full h-full absolute object-cover opacity-50 "
        />
        <div className="absolute  top-[35%] left-[35%]">
          <h1 className="text-white opacity-90 text-3xl font-extrabold tracking-widest my-2">
            Sign Up
          </h1>
          <div className=" bg-[#171d25] p-10 rounded-xl shadow-2xl">
            <div>
              <div className="flex flex-col gap-2">
                <label className="text-blue-600 text-sm font-bold tracking-wider uppercase">
                  Enter Username
                </label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  className="bg-slate-700 h-10 w-80 text-white opacity-80 font-semibold text-xl tracking-widest"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-400 text-xs tracking-widest mt-3 uppercase">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="bg-slate-700 h-10 w-80 text-white opacity-80 font-semibold text-xl tracking-widest"
                />
              </div>
              {/* <div>
                <label className="text-slate-400 text-xs tracking-widest mt-3">
                  {" "}
                  Remember ?{" "}
                </label>
                <input type="checkbox" value="remember" />
              </div> */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-[#3fe2ff] mt-4 text-white text-xl tracking-widest to-blue-700 h-12"
              >
                Sign Up
              </button>
            </div>
            <div>
              <p className="text-white text-xs mt-3">
                Already have an account ?{" "}
                <a
                  href="/login"
                  className="text-blue-400 hover:cursor-pointer hover:underline"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
