import Topbar from "../components/Topbar";

const LoginPage = () => {
  return (
    <>
      <div className="bg-[#171d25] h-screen ">
        <img
          src="/login-background.jpeg"
          className="w-full h-full absolute object-cover opacity-50 "
        />{" "}
        <Topbar />
        <div className="absolute  top-[35%] left-[35%]">
          <h1 className="text-white opacity-90 text-3xl font-extrabold tracking-widest my-2">
            Sign In
          </h1>
          <div className=" bg-[#171d25] p-10 rounded-xl shadow-2xl">
            <form>
              <div className="flex flex-col gap-2">
                <label className="text-blue-600 text-sm font-bold tracking-wider uppercase">
                  Sign In With Account
                </label>
                <input
                  type="text"
                  className="bg-slate-700 h-10 w-80 text-white opacity-80 font-semibold text-xl tracking-widest"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-400 text-xs tracking-widest mt-3 uppercase">
                  Password
                </label>
                <input
                  type="password"
                  className="bg-slate-700 h-10 w-80 text-white opacity-80 font-semibold text-xl tracking-widest"
                />
              </div>
              <div>
                <label className="text-slate-400 text-xs tracking-widest mt-3">
                  {" "}
                  Remember ?{" "}
                </label>
                <input type="checkbox" value="remember" />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 mt-4 text-white text-xl tracking-widest h-12"
              >
                Sign In
              </button>
            </form>
            <div>
              <p className="text-white text-xs mt-3">
                Don't have an account?{" "}
                <a
                  href="/signUp"
                  className="text-blue-400 hover:cursor-pointer hover:underline"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
