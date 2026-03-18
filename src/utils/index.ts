import axios from "axios";
import { Cookie } from "tough-cookie";
import ReactPixel from "react-facebook-pixel";
import type { SendPixelParams, SendCAPIData } from "../types";

export const sendCAPI = async (
  data: SendCAPIData,
  accessToken: string,
  pixelId: string,
  testEventCode: string,
  event_id: string,
  eventType: string,
): Promise<void> => {
  const { data: responseData } = await axios.get("https://api.ipify.org");
  const cookies = document.cookie.split(";").map((str) => Cookie.parse(str));
  const fbp = cookies.find((cookie) => (cookie!.key = "_fbp"));

  const eventData = [
    {
      event_name: eventType,
      event_time: Math.floor(Date.now() / 1000),
      event_id,
      user_data: {
        ...data.userInfo,
        client_ip_address: responseData,
        client_user_agent: navigator.userAgent,
        fbp: fbp?.value,
      },
      custom_data: data.dataParams,
      event_source_url: window.location.href,
      action_source: "website",
    },
  ];

  const requestData: Record<string, string> = {
    data: JSON.stringify(eventData),
    access_token: accessToken,
  };
  if (testEventCode) requestData.test_event_code = testEventCode;

  axios
    .post(
      `https://graph.facebook.com/v22.0/${pixelId}/events`,
      new URLSearchParams(requestData),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    )
    .then((response) => console.log(response))
    .catch((error: { response: { data: { error: { message: string } } } }) => {
      console.error(error);
      window.alert(`FAILED TO SEND CAPI: ${error.response.data.error.message}`);
    });
};

export const sendPixel = ({
  isCustom,
  dataParams,
  eventType,
  eventID,
  pixelId,
  userInfo,
}: SendPixelParams): void => {
  ReactPixel.init(
    pixelId,
    Object.keys(userInfo).length > 0
      ? (userInfo as Record<string, string>)
      : undefined,
    { debug: true, autoConfig: false },
  );

  if (isCustom) {
    ReactPixel.fbq("trackCustom", eventType, dataParams, { eventID });
  } else {
    ReactPixel.fbq("track", eventType, dataParams, { eventID });
  }
};
