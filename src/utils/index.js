import axios from "axios";
import { Cookie } from "tough-cookie";
export const sendCAPI = async (data, accessToken, pixelId) => {
  const { data: responseData } = await axios.get("https://api.ipify.org");
  const cookies = document.cookie.split(";").map(Cookie.parse);
  const fbp = cookies.find((cookie) => (cookie.key = "_fbp"));

  const eventData = [
    {
      event_name: data.eventType,
      event_time: Math.floor(new Date() / 1000),
      user_data: {
        ...data.userInfo,
        client_ip_address: responseData,
        client_user_agent: navigator.userAgent,
        fbp: fbp.value,
      },
      custom_data: { ...data.paramsParams },
      event_source_url: window.location.href,
      action_source: "website",
    },
  ];
  console.log(eventData);
  axios
    .post(
      `https://graph.facebook.com/v22.0/${pixelId}/events`,
      new URLSearchParams({
        data: JSON.stringify(eventData),
        access_token: accessToken,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => console.log(response))
    .catch((error) => console.error(error));
};
