import axios from "axios";
export const fetchHotels = () => async (dispatch) => {
  try {
    const response = await axios.get(
      process.env.NODE_ENV === "development"
        ? "http://localhost:3001/hotellist"
        : "https://shop.john-domain.xyz/hotellist"
    );
    dispatch({ type: "FETCH_HOTELS", payload: response.data });
  } catch (e) {}
};
