import { useContext, useState } from "react";
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
    if (key === "content_ids") data[key] = String(data[key]).split(",");
  });
  return data;
};

function App() {
  const navigate = useNavigate();
  const { state, updateState } = useContext(MetaContext);
  const handleUpdate = (e) => updateState({ ...state, [e.target.id]: e.target.value });

  const [activeTab, setActiveTab] = useState("tester");
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
      ? `Event: ${customData.eventType}`
      : `Event: ${eventType}`;

    const dataParamsMessage = `Params: {${Object.entries(_dataParams)
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ")}}`;

    const userMessage =
      Object.keys(userInfo).length > 0
        ? `User: {${Object.entries(userInfo)
            .map(([k, v]) => `${k}: ${v}`)
            .join(", ")}} (sent hashed)`
        : "User: none";

    const methodMessage = type === "both" ? "Sent via: CAPI + Pixel" : `Sent via: ${type}`;
    setMessage(`${methodMessage}\n${startMessage}\n${dataParamsMessage}\n${userMessage}`);

    switch (type) {
      case "pixel":
        sendPixel({
          isCustom: !!customData,
          dataParams: _dataParams,
          eventType: customData ? customData.eventType : eventType,
          eventID,
          pixelId: state.pixelId,
          userInfo,
        });
        break;
      case "capi":
        handleSendCAPI({ eventType: customData ? customData.eventType : eventType, eventID, dataParams: _dataParams });
        break;
      default:
        sendPixel({
          isCustom: !!customData,
          dataParams: _dataParams,
          eventType: customData ? customData.eventType : eventType,
          eventID,
          pixelId: state.pixelId,
          userInfo,
        });
        handleSendCAPI({ eventType: customData ? customData.eventType : eventType, eventID, dataParams: _dataParams });
    }
    setDataParams({});
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
      eventType,
    );
  };

  const randomUrlNavigate = () => {
    setMessage();
    navigate(`/${faker.string.uuid()}`);
  };

  const randomCatalogItem = () => {
    const randomIndex = Math.floor(Math.random() * state.catalogContent.length);
    navigate(`/product/${state.catalogContent[randomIndex].id}`);
  };

  const TABS = [
    { id: "config", label: "Config" },
    { id: "tester", label: "Event Tester" },
    { id: "tools", label: "Tools" },
  ];

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Signal <span>&amp;</span> Pixel Tester</h1>
        <nav className="tab-nav">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn${activeTab === tab.id ? " active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="app-main">
        {activeTab === "config" && (
          <ConfigInput state={state} handleUpdate={handleUpdate} />
        )}

        {activeTab === "tester" && (
          <>
            <UserDetailsInput onChange={(e) => setUserInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))} userInfo={userInfo} setUserInfo={setUserInfo} />
            <EventDetailsInput
              handleDataParams={(e) => setDataParams((prev) => ({ ...prev, [e.target.id]: e.target.value }))}
              handleEventSelect={(e) => setEventType(e.target.value)}
              dataParams={dataParams}
              eventType={eventType}
              sendEvent={sendEvent}
            />
            {message && <pre className="message-log">{message}</pre>}
          </>
        )}

        {activeTab === "tools" && (
          <>
            <OfflineRecordGenerator />
            <GenerateCatalog />
            <div className="card">
              <p className="card-title">Navigation</p>
              <div className="btn-group">
                <button className="btn btn-secondary" onClick={randomUrlNavigate}>Random URL</button>
                {state.catalogContent.length > 0 && (
                  <button className="btn btn-secondary" onClick={randomCatalogItem}>Random Catalog Item</button>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="app-footer">
        <a href="https://github.com/wong-johnathan/fb-pixel-tester/blob/master/readme.md" target="_blank" rel="noreferrer">Instructions</a>
        <div className="footer-sep" />
        <a href="https://github.com/wong-johnathan/fb-pixel-tester/tree/master" target="_blank" rel="noreferrer">GitHub</a>
      </footer>
    </div>
  );
}

export default App;
