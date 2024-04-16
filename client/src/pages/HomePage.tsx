import { useEffect, useMemo, useState } from "react";
import Topbar from "../components/Topbar";
import { verifyToken } from "../api/authAPI";
import { getGamesData } from "../api/dataAPI";
import Loading from "../components/Loading";
import { Games } from "../types/Games";
import { FaLinux, FaWindows } from "react-icons/fa";
import { MdDesktopMac } from "react-icons/md";
import { getTags } from "../utils/streamUtils";

const HomePage = () => {
  const token = sessionStorage.getItem("token") ?? "";

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useMemo(async () => {
    await verifyToken(token)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        sessionStorage.removeItem("token");
        window.location.href = "/login";
      });
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      await getGamesData()
        .then((res) => {
          setGames(res);
          setLoading(false);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className=" bg-gradient-to-r from-[#184352] to-[#184352] h-full -z-10">
        <img
          src="/home_bg.jpeg"
          className="h-screen fixed w-full object-cover opacity-20 "
        />
        <Topbar />
        <div className="">
          <div className="p-10  pt-36 opacity-60 flex flex-wrap gap-24">
            {games.map((game: Games) => {
              if (game.id == "AppID") return "";

              const tags = getTags(game.tags);

              return (
                <div className="m-1 w-[40%] bg-white rounded-xl" key={game.id}>
                  <img
                    src={game.image}
                    className=" w-full object-cover rounded-xl"
                    alt="image"
                  />

                  <h1 className="text-4xl text-center my-2">{game.name}</h1>
                  <div className="p-10">
                    <div className="flex gap-[45%] ">
                      <p>Released : {game.released}</p>
                      <p className="text-xs text-blue-600">
                        Age :{" "}
                        <span className="border-2 border-blue-600 px-1">
                          {game.requiredAge}+
                        </span>
                      </p>
                    </div>
                    <p>Price : $ {game.price}</p>
                    <p className="truncate max-w-[48rem] overflow-auto">
                      About : {game.description}
                    </p>

                    <div className="flex gap-5">
                      <span>
                        {game.windows ? (
                          <FaWindows className=" bg-black text-slate-100 p-3 rounded-full hover:bg-slate-100 hover:text-black hover:scale-110 my-4 h-12 w-12" />
                        ) : (
                          ""
                        )}
                      </span>
                      <span>
                        {game.mac ? (
                          <MdDesktopMac className=" bg-black text-slate-100 p-3 rounded-full hover:bg-slate-100 hover:text-black hover:scale-110 my-4 h-12 w-12" />
                        ) : (
                          ""
                        )}
                      </span>
                      <span>
                        {game.linux ? (
                          <FaLinux className=" bg-black text-slate-100 p-3 rounded-full hover:bg-slate-100 hover:text-black hover:scale-110 my-4 h-12 w-12" />
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                    <p className="flex gap-8 bg-blue-300 w-1/3 text-center p-2 rounded-lg border-blue-700 border">
                      <span className="text-green-700">+ {game.positive} </span>
                      <span className="text-red-600">-{game.negative}</span>
                    </p>

                    {/* <p>Developer : {game.developers}</p> */}
                    <p className="text-xs my-5 text-blue-600">{game.website}</p>

                    {/* <p>Publisher : {game.publishers}</p> */}
                    <p>Category : {game.categories}</p>
                    <p>Genres : {game.genres}</p>
                    <div className="text-xs max-h-50">
                      {tags.map((tag) => (
                        <div className="">#{tag}</div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
