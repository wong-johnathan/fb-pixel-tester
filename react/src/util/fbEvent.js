import ReactPixel from "react-facebook-pixel";
export const fbEvent = ({ event, object }) => {
  ReactPixel.track(event, { content_type: "hotel", ...object });
};
