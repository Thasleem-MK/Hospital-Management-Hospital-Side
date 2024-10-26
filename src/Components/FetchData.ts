import { apiClient } from "./Axios";

export const fetchData = async (
  dispatch: any,
  setHospitalData: (data: any) => void
) => {
  await apiClient
    .get("/api/hospital/details", {
      withCredentials: true,
    })
    .then((result) => {
      dispatch(setHospitalData(result.data.data));
    })
    .catch((err) => {
      console.log("Sample");
      console.log(err);
      // window.location.assign("/login");
    });
};
