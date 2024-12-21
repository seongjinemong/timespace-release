import axios from "axios";
import { toast } from "react-toastify";

const fetchTimetable = async () => {
  try {
    const res = await axios.get(
      import.meta.env.VITE_SERVER_URL + "/timetable",
      {
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      const timeData = res.data.data;

      // console.log(timeData); // 불러온 거 확인

      if (timeData != undefined) return timeData; // <--------------- 필요한 피일별로 수정
      toast.success("GET timetable successful!");
    } else {
      toast.error("GET failed!");
    }
  } catch (e) {
    toast.error(e.message);
  }
};

export { fetchTimetable };
