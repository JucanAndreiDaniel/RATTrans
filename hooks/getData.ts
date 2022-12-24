import axios from "axios";

export const getData = async (param: string) => {
  try {
    return await axios.get(
      "http://86.125.113.218:61978/html/timpi/trasee.php?param1=" + param
    );
  } catch (err) {
    console.log(err);
  }
};
