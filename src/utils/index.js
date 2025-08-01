import axios from "axios";
import { Cookie } from "tough-cookie";
import ReactPixel from "react-facebook-pixel";
export const sendCAPI = async (
  data,
  accessToken,
  pixelId,
  testEventCode,
  event_id,
  eventType
) => {
  const { data: responseData } = await axios.get("https://api.ipify.org");
  const cookies = document.cookie.split(";").map(Cookie.parse);
  const fbp = cookies.find((cookie) => (cookie.key = "_fbp"));
  const eventData = [
    {
      event_name: eventType,
      event_time: Math.floor(new Date() / 1000),
      event_id,
      user_data: {
        ...data.userInfo,
        client_ip_address: responseData,
        client_user_agent: navigator.userAgent,
        fbp: fbp.value,
      },
      custom_data: data.dataParams,
      event_source_url: window.location.href,
      action_source: "website",
    },
  ];

  const requestData = {
    data: JSON.stringify(eventData),
    access_token: accessToken,
  };
  if (testEventCode) requestData.test_event_code = testEventCode;
  axios
    .post(
      `https://graph.facebook.com/v22.0/${pixelId}/events`,
      new URLSearchParams(requestData),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => console.log(response))
    .catch((error) => {
      console.error(error);
      window.alert(`FAILED TO SEND CAPI: ${error.response.data.error.message}`);
    });
};

export const sendPixel = ({ isCustom, dataParams, eventType, eventID, pixelId, userInfo }) => {
  ReactPixel.init(
    pixelId,
    Object.keys(userInfo).length > 0 ? userInfo : undefined,
    { debug: true, autoConfig: false }
  );

  if (isCustom) {
    ReactPixel.fbq("trackCustom", eventType, dataParams, { eventID });
  } else {
    ReactPixel.fbq("track", eventType, dataParams, { eventID });
  }
};

