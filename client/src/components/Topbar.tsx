import { navBarConstants } from "../constants/navBarConstants";

const Topbar = () => {
  return (
    <div className="w-full h-[80px] fixed items-center justify-center px-[20%] bg-[#000000] flex gap-[25%] opacity-50 z-10">
      <h1 className="text-slate-300 text-3xl tracking-widest font-bold">
        <a href="/">RECLYNC</a>
      </h1>
      <div className="text-slate-300 flex gap-10 font-semibold tracking-widest ">
        {navBarConstants.map((item, index) => {
          return (
            <div
              key={index}
              className="hover:text-blue-500 cursor-pointer hover:underline"
            >
              {item.name}
            </div>
          );
        })}
      </div>
      {sessionStorage.getItem("token") ? (
        <div className="flex gap-2 w-full">
          {" "}
          <div
            className="line-clamp-1 bg-blue-500 rounded-xl cursor-pointer px-8 hover:scale-110 py-2"
            onClick={() => (window.location.href = "/set-preferences")}
          >
            Preferences
          </div>
          <div
            className="bg-red-500 rounded-xl cursor-pointer px-12 hover:scale-110 py-2"
            onClick={() => {
              sessionStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            Signout
          </div>
          
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Topbar;
