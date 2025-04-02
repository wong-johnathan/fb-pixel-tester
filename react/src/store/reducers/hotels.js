// import hotels from "../../dumpData/hotels.json";

const reducer = (state = [], actions) => {
  switch (actions.type) {
    case "FETCH_HOTELS":
      return actions.payload;
    default:
      return state;
  }
};

export default reducer;
