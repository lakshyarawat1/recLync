import { useEffect, useMemo, useState } from "react";
import Topbar from "../components/Topbar";
import { verifyToken } from "../api/authAPI";
import { getGamesData } from "../api/dataAPI";
import Loading from "../components/Loading";
import { Games } from "../types/Games";

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
          <div className="p-10 pt-36 opacity-60 flex flex-wrap gap-32">
            {games.map((game: Games) => {
              if (game.id == "AppID") return "";
              return (
                <div className="m-1 w-[35%] bg-white" key={game.id}>
                  <img
                    src={game.image}
                    className=" w-full object-cover"
                    alt="image"
                  />

                  <h1 className="text-lg">{game.name}</h1>
                  <p>Released : {game.released}</p>
                  <p>{game.requiredAge}</p>
                  <p>Price : {game.price}</p>
                  <p className="truncate max-w-[74rem] overflow-auto">
                    Description : {game.description}
                  </p>
                  <p>Website : {game.website}</p>
                  <p>
                    Support url and email : {game.supportURL}{" "}
                    {game.supportEmail}
                  </p>
                  <p>
                    Compatibility : {game.windows} {game.mac} {game.linux}
                  </p>
                  <p>
                    Positive : {game.positive}
                    Negative : {game.negative}
                  </p>

                  <p>Developer : {game.developers}</p>
                  <p>Publisher : {game.publishers}</p>
                  <p>Categories : {game.categories}</p>
                  <p>Genres : {game.genres}</p>
                  <p>Tags : {game.tags}</p>
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
