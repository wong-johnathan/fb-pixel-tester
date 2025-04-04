import { useContext, useState } from "react";
import { MetaContext } from "./context/PixelContext";
import { ConfigInput } from "./components/ConfigInput";
import ReactPixel from "react-facebook-pixel";
import EventDetailsInput from "./components/EventDetailsInput";
import UserDetailsInput from "./components/UserDetailsInput";
import { NavLink, useNavigate } from "react-router";
import { faker } from "@faker-js/faker";

export const prepareParamsData = (data) => {
  Object.keys(data).forEach((key) => {
    if (key === "content_ids") {
      data[key] = String(data[key]).split(",");
    }
  });
  return data;
};

function App() {
  const navigate = useNavigate();
  const { state, updateState } = useContext(MetaContext);
  const handleUpdate = (e) => {
    updateState({ ...state, [e.target.id]: e.target.value });
  };

  const [eventType, setEventType] = useState("ViewContent");
  const [dataParams, setDataParams] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [message, setMessage] = useState();

  const sendEvent = ({ customData = undefined }) => {
    
    const _eventType 
    const dataParams = customData
      ? customData.dataParams
      : prepareParamsData(dataParams);

    const startMessage = customData
      ? `Sending tracking event: ${eventType}`
      : `Sending custom event: ${customData.eventType}`;

    const dataParamsMessage = `With data params: {${Object.entries(
      dataParams
    ).map(([key, value]) => `${key}:${value}`)}}`;

    const userMessage = Object.keys(userInfo.length > 0)
      ? `With user details: {${Object.entries(userInfo).map(
          ([key, value]) => `${key}:${value}`
        )}}`
      : "With no user details";

    const message = `${startMessage}<br/>${dataParamsMessage}<br/>${userMessage}`;

    ReactPixel.init(
      state.pixelId,
      Object.keys(userInfo).length > 0 ? userInfo : undefined
    );
    

    if (Object.keys(userInfo).length > 0) {
      ReactPixel.init(state.pixelId, userInfo);
      ReactPixel.track(eventType, dataParams);
      setMessage(
        `${startMessage}<br/>With user details: {${Object.entries(userInfo).map(
          ([key, value]) => `${key}:${value}`
        )}}<br/>With data params: {${Object.entries(dataParams).map(
          ([key, value]) => `${key}:${value}`
        )}}`
      );
    } else {
      ReactPixel.init(state.pixelId);
      ReactPixel.track(eventType, dataParams);
      setMessage(
        `${startMessage}<br/>With no user details<br/>With data params: {${Object.entries(
          dataParams
        ).map(([key, value]) => `${key}:${value}`)}}`
      );
    }
    setDataParams({});
  };

  const sendCustomEvent = (customData) => {
    if (Object.keys(userInfo).length > 0) {
      ReactPixel.init(state.pixelId, userInfo);
      ReactPixel.trackCustom(customData.eventType, customData.dataParams);
      setMessage(
        `Sending custom tracking event: ${
          customData.eventType
        }<br/>With user details: {${Object.entries(userInfo).map(
          ([key, value]) => `${key}:${value}`
        )}}<br/>With data params: {${Object.entries(customData.dataParams).map(
          ([key, value]) => `${key}:${value}`
        )}}`
      );
    } else {
      ReactPixel.init(state.pixelId);
      ReactPixel.trackCustom(customData.eventType, customData.dataParams);
      setMessage(
        `Sending custom tracking event: ${
          customData.eventType
        }<br/>With no user details<br/>With data params: {${Object.entries(
          customData.dataParams
        ).map(([key, value]) => `${key}:${value}`)}}`
      );
    }
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

  const randomUrlNavigate = () => {
    navigate(`/${faker.string.uuid()}`);
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
        sendCustomEvent={sendCustomEvent}
      />
      <hr />
      <div style={{ textAlign: "center" }}>
        <button style={{ width: "100%" }} onClick={randomUrlNavigate}>
          Random Url
        </button>
      </div>
      <hr />
      {message && (
        <>
          <span>User details are sent hashed..</span>
          <br />
          <span dangerouslySetInnerHTML={{ __html: message }} />
        </>
      )}
    </div>
  );
}

export default App;
