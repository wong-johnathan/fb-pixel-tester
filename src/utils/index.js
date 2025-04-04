import axios from "axios";
import tough from "tough-cookie";
export const sendCAPI = async (data, accessToken, pixelId) => {
  const { data: responseData } = await axios.get("https://api.ipify.org");
  const cookie = tough.parse(document.cookie);
  const fbp = cookie.getAttribute("_fbp");
  const eventData = [
    {
      event_name: "Purchase",
      event_time: Math.floor(new Date() / 1000),
      user_data: {
        em: [
          "309a0a5c3e211326ae75ca18196d301a9bdbd1a882a4d2569511033da23f0abd",
        ],
        ph: [
          "254aa248acb47dd654ca3ea53f48c2c26d641d23d7e2e93a1ec56258df7674c4",
          "6f4fcb9deaeadc8f9746ae76d97ce1239e98b404efe5da3ee0b7149740f89ad6",
        ],
        client_ip_address: responseData,
        client_user_agent: navigator.userAgent,
        fbp,
      },
      custom_data: {
        currency: "usd",
        value: 123.45,
        contents: [
          {
            id: "product123",
            quantity: 1,
            delivery_category: "home_delivery",
          },
        ],
      },
      event_source_url: window.location.href,
      action_source: "website",
    },
  ];
  console.log(eventData);
  // axios
  //   .post(
  //     `https://graph.facebook.com/v22.0/${pixelId}/events`,
  //     new URLSearchParams({
  //       data: JSON.stringify(eventData),
  //       access_token: accessToken,
  //     }),
  //     {
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //     }
  //   )
  //   .then((response) => console.log(response))
  //   .catch((error) => console.error(error));
};
