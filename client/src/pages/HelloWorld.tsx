import { useEffect, useState } from "react";
import axios from "axios";

const HelloWorld = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/test")
      .then((response) => {
        setMessage(response.data);
      })

      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default HelloWorld;
