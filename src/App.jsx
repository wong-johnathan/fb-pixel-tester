import { useContext, useState, useEffect } from "react";
import { MetaContext } from "./context/PixelContext";
import { ConfigInput } from "./components/ConfigInput";
import ReactPixel from "react-facebook-pixel";
import EventDetailsInput from "./components/EventDetailsInput";
import UserDetailsInput from "./components/UserDetailsInput";
import { useNavigate } from "react-router";
import { faker } from "@faker-js/faker";
import { sendCAPI } from "./utils";
import sha256 from "js-sha256";

const prepareParamsData = (data) => {
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

  const sendEvent = ({ customData } = {}) => {
    const _dataParams = customData
      ? prepareParamsData(customData.dataParams)
      : prepareParamsData(dataParams);

    const startMessage = customData
      ? `Sending custom event: ${customData.eventType}`
      : `Sending tracking event: ${eventType}`;

    const dataParamsMessage = `With data params: {${Object.entries(
      _dataParams
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

    if (customData) {
      ReactPixel.trackCustom(customData.eventType, _dataParams);
    } else ReactPixel.track(eventType, _dataParams);
    setMessage(message);
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

  const handleSendCAPI = () => {
    const hashedUserInfo = {};
    Object.entries(userInfo).forEach(([key, value]) => {
      hashedUserInfo[key] = sha256(String(value));
    });

    sendCAPI(
      { userData: hashedUserInfo, dataParams, eventType },
      state.accessToken,
      state.pixelId
    );
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
      <button onClick={handleSendCAPI}>Test capi</button>
    </div>
  );
}

export default App;
