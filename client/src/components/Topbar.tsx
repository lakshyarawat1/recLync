import { navBarConstants } from "../constants/navBarConstants";

const Topbar = () => {
  return (
    <div className="w-full h-[80px] items-center justify-center px-[20%] bg-[#171d25] flex gap-[35%]">
      <h1 className="text-slate-300 text-3xl tracking-widest font-bold">
        RECLYNC
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
    </div>
  );
};

export default Topbar;
