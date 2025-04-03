import { useContext, useEffect, useState } from "react";
import { MetaContext } from "./context/PixelContext";
import { ConfigInput } from "./components/ConfigInput";
import ReactPixel from "react-facebook-pixel";
import EventDetailsInput from "./components/EventDetailsInput";
import UserDetailsInput from "./components/UserDetailsInput";
import {
  CustomData,
  EventRequest,
  ServerEvent,
  UserData,
} from "facebook-nodejs-business-sdk";

function App() {
  const { state, updateState } = useContext(MetaContext);
  const handleUpdate = (e) => {
    updateState({ ...state, [e.target.id]: e.target.value });
  };

  const [eventType, setEventType] = useState("ViewContent");
  const [dataParams, setDataParams] = useState({});
  const [userInfo, setUserInfo] = useState({});

  const prepareParamsData = (data) => {
    Object.keys(data).forEach((key) => {
      if (key === "content_ids") {
        data[key] = String(data[key]).split(",");
      }
    });
    return data;
  };

  const sendEvent = () => {
    if (Object.keys(userInfo).length > 0) {
      ReactPixel.init(state.pixelId, userInfo);
      ReactPixel.track(eventType, prepareParamsData(dataParams));
      console.log(
        `Sending tracking event: ${eventType}\nWith user details: {${Object.entries(
          userInfo
        ).map(
          ([key, value]) => `${key}:${value}`
        )}}\nWith data params: {${Object.entries(
          prepareParamsData(dataParams)
        ).map(([key, value]) => `${key}:${value}`)}}`
      );
    } else {
      ReactPixel.init(state.pixelId);
      ReactPixel.track(eventType, prepareParamsData(dataParams));
      console.log(
        `Sending tracking event: ${eventType}\nWith no user details\nWith data params: {${Object.entries(
          prepareParamsData(dataParams)
        ).map(([key, value]) => `${key}:${value}`)}}`
      );
    }
    setDataParams({});
  };

  const sendCAPI = () => {
    const userData = new UserData();
    if (userInfo.en) userData.setEmail(userInfo.en);
    if (userInfo.fn) userData.setFirstName(userInfo.fn);
    if (userInfo.ln) userData.setLastName(userInfo.ln);
    if (userInfo.ph) userData.setPhone(userInfo.ph);

    const customData = new CustomData();
    if (dataParams.content_ids)
      customData.setContentIds(dataParams.content_ids.split(","));
    if (dataParams.currency) customData.setCurrency(dataParams.currency);
    if (dataParams.quantity) customData.setNumItems(dataParams.quantity);
    if (dataParams.value) customData.setValue(dataParams.value);
    if (dataParams.content_type)
      customData.setContentType(dataParams.content_type);

    const serverEvent = new ServerEvent();
    serverEvent.setEventName(eventType);
    serverEvent.setEventTime(Math.floor(new Date() / 1000));
    serverEvent.setEventSourceUrl(window.location.href);
    serverEvent.setActionSource("website");
    serverEvent.setUserData(userData);
    serverEvent.setCustomData(customData);

    const eventRequest = new EventRequest(state.accessToken, state.pixelId);
    eventRequest.setEvents([serverEvent]);
    if(state.testEventCode) eventRequest.setTestEventCode(state.testEventCode)
    eventRequest.execute().then(
      (response) => {
        console.log("Response: ", response);
      },
      (err) => {
        console.error("Error: ", err);
      }
    );
    setDataParams({});
  };

  const handleEventSelect = (e) => {
    setEventType(e.target.value);
  };

  const handleDataParams = (e) => {
    setDataParams((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleUserInfo = (e) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div
      style={{
        width: "auto",
        padding: "1rem",
        maxWidth: "800px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <ConfigInput state={state} handleUpdate={handleUpdate} />
      <hr />
      <UserDetailsInput
        onChange={handleUserInfo}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
      <hr />
      <EventDetailsInput
        handleDataParams={handleDataParams}
        handleEventSelect={handleEventSelect}
        dataParams={dataParams}
        eventType={eventType}
        sendEvent={sendEvent}
        sendCAPI={sendCAPI}
      />
    </div>
  );
}

export default App;
