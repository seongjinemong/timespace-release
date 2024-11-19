import { useState, useEffect } from "react";

import axios from "axios";
import { stringify } from "postcss";

export default function Test() {
  const [data, setData] = useState(null);

  useEffect(async () => {
    async function fetchProfile() {
      const res = await axios.get(
        "https://timetableapi.seongjinemong.app/user.profile"
      );

      return res.data;
    }

    try {
      const res = await fetchProfile();
      setData(res);
    } catch (error) {
      console.error(error);
    }

    console.log(res);
  }, []);

  return <div>{data ? stringify(data) : "Loading..."}</div>;
}
