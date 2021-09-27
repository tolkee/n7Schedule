import { useEffect } from "react";
import { navigate } from "gatsby";
import { DateTime } from "luxon";

export default () => {
  // useEffect(() => {
  //   const now = DateTime.local();
  //   navigate(`/${now.weekYear}/${now.weekNumber}`);
  // }, []);
  useEffect(() => {
    const now = DateTime.local();
    navigate(`/comingback`);
  }, []);
  return null;
};
