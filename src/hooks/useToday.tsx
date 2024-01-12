import { unixStartTime } from "../constants/constants";

export const useToday = () => {
  const now = new Date();
  const dateFromUnixTime = new Date(unixStartTime * 1000); // Convert Unix time to JavaScript Date
  const daysSince = Math.floor(
    (now.getTime() - dateFromUnixTime.getTime()) / (1000 * 3600 * 24)
  );

  return daysSince + 1;
};
