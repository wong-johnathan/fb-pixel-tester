import { useContext, useState, useEffect, ChangeEvent } from "react";
import { MetaContext } from "./context/PixelContext";
import { ConfigInput } from "./components/ConfigInput";
import EventDetailsInput from "./components/EventDetailsInput";
import UserDetailsInput from "./components/UserDetailsInput";
import { useNavigate } from "react-router";
import { faker } from "@faker-js/faker";
import { sendCAPI, sendPixel } from "./utils";
import { sha256 } from "js-sha256";
import OfflineRecordGenerator from "./components/OfflineRecordGenerator";
import GenerateCatalog from "./components/GenerateCatalog";
import type { UserInfo, MetaState } from "./types";

const prepareParamsData = (data: Record<string, unknown>): Record<string, unknown> => {
  const result = { ...data };
  Object.keys(result).forEach((key) => {
    if (key === "content_ids") result[key] = String(result[key]).split(",");
  });
  return result;
};

interface CustomData {
  eventType: string;
  dataParams: Record<string, string>;
}

interface SendEventOptions {
  customData?: CustomData;
  type: string;
}

const TABS = [
  { id: "config", label: "Config" },
  { id: "tester", label: "Event Tester" },
  { id: "tools", label: "Tools" },
  { id: "instructions", label: "Instructions" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function App() {
  const navigate = useNavigate();
  const { state, updateState } = useContext(MetaContext);

  const handleUpdate = (e: ChangeEvent<HTMLInputElement>) =>
    updateState({ ...state, [e.target.id]: e.target.value } as MetaState);

  const [activeTab, setActiveTab] = useState<TabId>("tester");

  const [theme, setTheme] = useState<"dark" | "light">(() => {
    return (localStorage.getItem("theme") as "dark" | "light") ?? "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const [eventType, setEventType] = useState("ViewContent");
  const [dataParams, setDataParams] = useState<Record<string, string | number>>({});
  const [userInfo, setUserInfo] = useState<UserInfo>({});
  const [message, setMessage] = useState<string>();

  const sendEvent = ({ customData, type }: SendEventOptions) => {
    const eventID = faker.string.uuid();
    const _dataParams = customData
      ? prepareParamsData(customData.dataParams)
      : prepareParamsData(dataParams);

    const currentEventType = customData ? customData.eventType : eventType;
    const methodMessage = type === "both" ? "Sent via: CAPI + Pixel" : `Sent via: ${type}`;
    const dataParamsMessage = `Params: {${Object.entries(_dataParams)
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ")}}`;
    const userMessage =
      Object.keys(userInfo).length > 0
        ? `User: {${Object.entries(userInfo)
            .map(([k, v]) => `${k}: ${v}`)
            .join(", ")}} (sent hashed)`
        : "User: none";

    setMessage(`${methodMessage}\nEvent: ${currentEventType}\n${dataParamsMessage}\n${userMessage}`);

    switch (type) {
      case "pixel":
        sendPixel({ isCustom: !!customData, dataParams: _dataParams, eventType: currentEventType, eventID, pixelId: state.pixelId, userInfo });
        break;
      case "capi":
        handleSendCAPI({ eventType: currentEventType, eventID, dataParams: _dataParams });
        break;
      default:
        sendPixel({ isCustom: !!customData, dataParams: _dataParams, eventType: currentEventType, eventID, pixelId: state.pixelId, userInfo });
        handleSendCAPI({ eventType: currentEventType, eventID, dataParams: _dataParams });
    }
    setDataParams({});
  };

  const handleSendCAPI = ({ eventID, dataParams, eventType }: { eventID: string; dataParams: Record<string, unknown>; eventType: string }) => {
    const hashedUserInfo: Record<string, string[]> = {};
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
    setMessage(undefined);
    navigate(`/${faker.string.uuid()}`);
  };

  const randomCatalogItem = () => {
    const randomIndex = Math.floor(Math.random() * state.catalogContent.length);
    navigate(`/product/${state.catalogContent[randomIndex].id}`);
  };

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
        <button
          className="theme-toggle"
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </header>

      <main className="app-main">
        {activeTab === "config" && <ConfigInput state={state} handleUpdate={handleUpdate} />}

        {activeTab === "tester" && (
          <>
            <UserDetailsInput
              onChange={(e) => setUserInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
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

        {activeTab === "instructions" && (
          <div className="instructions">
            <div className="instructions-hero">
              <h2 className="instructions-title">Signal, Pixel &amp; Catalog Tester</h2>
              <p className="instructions-subtitle">
                A tool for testing Meta Pixel and CAPI payloads, generating offline custom events, and creating catalog CSV files.
                All data is stored locally via <code>localStorage</code> — your credentials never leave the browser.
              </p>
            </div>

            <div className="instructions-section">
              <h3 className="instructions-heading">Requirements</h3>
              <ol className="instructions-list">
                <li><strong>Meta Pixel ID</strong> — found in your Meta Events Manager</li>
                <li><strong>Access Token</strong> — a system user token with <code>ads_management</code> permission</li>
                <li><strong>Event Test Code</strong> <span className="instructions-optional">(optional)</span> — from Events Manager → Test Events. If omitted, events fire as normal production traffic.</li>
                <li><strong>Catalog Link</strong> <span className="instructions-optional">(optional)</span> — a publicly published Google Sheets CSV URL</li>
              </ol>
            </div>

            <div className="instructions-section">
              <h3 className="instructions-heading">Getting Started</h3>
              <ol className="instructions-list">
                <li>Go to the <strong>Config</strong> tab and enter your Pixel ID and Access Token.</li>
                <li>Optionally add an Event Test Code to route events to the test channel.</li>
                <li>Switch to the <strong>Event Tester</strong> tab to send events.</li>
              </ol>
            </div>

            <div className="instructions-section">
              <h3 className="instructions-heading">Event Tester Features</h3>
              <ul className="instructions-list">
                <li><strong>Generate Random</strong> — fills in fake PII (email, name, phone) to send with the event.</li>
                <li><strong>Clear User Info</strong> — removes all PII so events fire without user data.</li>
                <li><strong>Send Pixel</strong> — fires a browser-side pixel event via the FB SDK.</li>
                <li><strong>Send CAPI</strong> — sends a server-side Conversions API event directly from the browser.</li>
                <li><strong>Send Both</strong> — fires both pixel and CAPI simultaneously (recommended for deduplication testing).</li>
              </ul>
              <p className="instructions-note">All PII is SHA-256 hashed before being sent to CAPI.</p>
            </div>

            <div className="instructions-section">
              <h3 className="instructions-heading">Tools</h3>
              <ul className="instructions-list">
                <li><strong>Random URL</strong> — navigates to a random path so you can test the same event from different URLs.</li>
                <li><strong>Random Catalog Item</strong> — jumps to a random product page (visible once a catalog link is set).</li>
                <li><strong>Offline Record Generator</strong> — downloads a CSV of faker-generated records for bulk offline event uploads.</li>
                <li><strong>Catalog CSV Generator</strong> — generates <code>catalog.csv</code>, <code>catalog_Malay.csv</code>, and <code>catalog_Filipino.csv</code> for multi-locale feed testing.</li>
              </ul>
            </div>

            <div className="instructions-section">
              <h3 className="instructions-heading">Catalog Link Setup</h3>
              <ol className="instructions-list">
                <li>Generate a catalog using the <strong>Tools</strong> tab.</li>
                <li>Upload <code>catalog.csv</code> to Google Sheets.</li>
                <li>In Google Sheets: <em>File → Share → Publish to web</em>, select the sheet, choose <strong>CSV</strong>, and copy the link.</li>
                <li>Paste the link into the <strong>Catalog Link</strong> field in the Config tab.</li>
              </ol>
              <p className="instructions-note">
                Example:{" "}
                <code className="instructions-code-block">
                  https://docs.google.com/spreadsheets/d/e/…/pub?gid=0&single=true&output=csv
                </code>
              </p>
            </div>
          </div>
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
