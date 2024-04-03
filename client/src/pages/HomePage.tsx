import Topbar from "../components/Topbar";

const HomePage = () => {
  return (
    <>
      <div className="h-screen bg-gradient-to-r from-[#184352] to-[#184352]">
        <img
          src="/home_bg.jpeg"
          className="h-screen absolute w-full object-cover opacity-20 "
        />
        <Topbar />
      </div>
    </>
  );
};

export default HomePage;
