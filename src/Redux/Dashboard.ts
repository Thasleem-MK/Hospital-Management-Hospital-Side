import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const InitialState = {
  _id: "",
  name: "",
  address: "",
  phone: "",
  emergencyContact: "",
  email: "",
  latitude: null,
  longitude: null,
  password: "",
  about: "",
  image: { imageUrl: "", deleteHash: "" },
  working_hours: [
    {
      day: "Monday",
      opening_time: "",
      closing_time: "",
      is_holiday: false,
    },
    {
      day: "Tuesday",
      opening_time: "",
      closing_time: "",
      is_holiday: false,
    },
    {
      day: "Wednesday",
      opening_time: "",
      closing_time: "",
      is_holiday: false,
    },
    {
      day: "Thursday",
      opening_time: "",
      closing_time: "",
      is_holiday: false,
    },
    {
      day: "Friday",
      opening_time: "",
      closing_time: "",
      is_holiday: false,
    },
    {
      day: "Saturday",
      opening_time: "",
      closing_time: "",
      is_holiday: false,
    },
    {
      day: "Sunday",
      opening_time: "",
      closing_time: "",
      is_holiday: false,
    },
  ],
  reviews: [],
  specialties: [],
  booking: [],
};

const Dashboard = createSlice({
  name: "dashboard",
  initialState: InitialState,
  reducers: {
    setHospitalData: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
  },
});
// Action creators are generated for each case reducer function
export const { setHospitalData } = Dashboard.actions;
export default Dashboard.reducer;
