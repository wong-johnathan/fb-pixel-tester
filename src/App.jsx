import { useContext, useState, useEffect } from "react";
import { MetaContext } from "./context/PixelContext";
import { ConfigInput } from "./components/ConfigInput";
import EventDetailsInput from "./components/EventDetailsInput";
import UserDetailsInput from "./components/UserDetailsInput";
import { useNavigate } from "react-router";
import { faker } from "@faker-js/faker";
import { sendCAPI, sendPixel } from "./utils";
import sha256 from "js-sha256";
import OfflineRecordGenerator from "./components/OfflineRecordGenerator";
import axios from "axios";
import GenerateCatalog from "./components/GenerateCatalog";

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

  const sendEvent = ({ customData, type } = {}) => {
    const eventID = faker.string.uuid();

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
      ? `User details are sent hashed<br>With user details: {${Object.entries(
          userInfo
        ).map(([key, value]) => `${key}:${value}`)}}`
      : "With no user details";

    let methodMessage =
      type === "both" ? "Sending CAPI & Pixel" : `Sending ${type}`;
    const message = `${methodMessage}<br/>${startMessage}<br/>${dataParamsMessage}<br/>${userMessage}`;

    setMessage(message);

    switch (type) {
      case "pixel":
        sendPixel({
          isCustom: customData ? true : false,
          dataParams: _dataParams,
          eventType: customData ? customData.eventType : eventType,
          eventID,
          pixelId: state.pixelId,
          userInfo,
        });
        break;
      case "capi":
        handleSendCAPI({
          eventType: customData ? customData.eventType : eventType,
          eventID,
          dataParams: _dataParams,
        });
        break;
      default:
        sendPixel({
          isCustom: customData ? true : false,
          dataParams: _dataParams,
          eventType: customData ? customData.eventType : eventType,
          eventID,
          pixelId: state.pixelId,
          userInfo,
        });
        handleSendCAPI({
          eventType: customData ? customData.eventType : eventType,
          eventID,
          dataParams: _dataParams,
        });
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
    setMessage();
    navigate(`/${faker.string.uuid()}`);
  };

  const handleSendCAPI = ({ eventID, dataParams, eventType }) => {
    const hashedUserInfo = {};
    Object.entries(userInfo).forEach(([key, value]) => {
      hashedUserInfo[key] = [sha256(String(value))];
    });
    sendCAPI(
      { userInfo: hashedUserInfo, dataParams, eventType },
      state.accessToken,
      state.pixelId,
      state.testEventCode,
      eventID,
      eventType
    );
  };

  const randomCatalogItem = () => {
    const randomIndex = Math.floor(Math.random() * state.catalogContent.length);
    navigate(`/product/${state.catalogContent[randomIndex].id}`);
  };

  return (
    <>
      <div
        style={{
          width: "auto",
          padding: "1rem",
          maxWidth: "800px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <h3 style={{ textAlign: "center" }}>Signal, Pixel, Catalog Tester</h3>
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
            <span dangerouslySetInnerHTML={{ __html: message }} />
            <hr />
          </>
        )}
        <OfflineRecordGenerator />
        <hr />

        <GenerateCatalog />
        <hr />
        {state.catalogContent.length > 0 && (
          <div style={{ textAlign: "center" }}>
            <button style={{ width: "100%" }} onClick={randomCatalogItem}>
              Go to random catalog item
            </button>
          </div>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          paddingBottom: "1.5rem",
          left:"50%",
          transform:"translateX(-50%)"
        }}
      >
        <div style={{ display: "flex", columnGap:'2rem' }}>
          <a href="https://github.com/wong-johnathan/fb-pixel-tester/blob/master/readme.md">
            Instructions
          </a>
          <span>|</span>
          <a href="https://github.com/wong-johnathan/fb-pixel-tester/tree/master">
            Git
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
