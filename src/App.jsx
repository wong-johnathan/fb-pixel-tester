import { useContext, useEffect, useState } from "react";
import { MetaContext } from "./context/PixelContext";
import Input from "./components/Input";
import { fbEvents } from "./config/fbEvents";
import { ConfigInput } from "./components/ConfigInput";
import ReactPixel from "react-facebook-pixel";

function App() {
  const { state, updateState } = useContext(MetaContext);
  const handleUpdate = (e) => {
    updateState({ ...state, [e.target.id]: e.target.value });
  };

  const [eventType, setEventType] = useState("ViewContent");
  const [dataParams, setDataParams] = useState({});

  const handleEventSelect = (e) => {
    setEventType(e.target.value);
  };
  const sendEvent = () => {
    ReactPixel.track(eventType, dataParams);
    setDataParams({});
  };

  const handleDataParams = (e) => {
    setDataParams((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  useEffect(() => {
    ReactPixel.init(state.pixelId);
  }, [state]);

  return (
    <div style={{ width: "100vw" }}>
      <ConfigInput state={state} handleUpdate={handleUpdate} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            alignItems: "center",
            paddingBottom: "0.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              columnGap: "0.25rem",
              paddingBottom: "0.25rem",
            }}
          >
            <label htmlFor="eventType">Event Type:</label>
            <select
              id="eventType"
              onChange={handleEventSelect}
              value={eventType}
            >
              <option>Select event type</option>
              {fbEvents.map((event) => (
                <option key={event.name}>{event.name}</option>
              ))}
            </select>
          </div>
          {eventType && (
            <span style={{ fontStyle: "italic", fontSize: "0.75rem" }}>
              {fbEvents.find((event) => event.name === eventType).description}
            </span>
          )}
        </div>
        {eventType && (
          <div style={{ paddingLeft: "0.5rem" }}>
            <p style={{ margin: 0 }}>Parameters:</p>
            <div
              style={{
                marginLeft: "0.5rem",
                display: "flex",
                flexDirection: "column",
                rowGap: "0.5rem",
                justifyItems: "center",
                alignItems: "center",
              }}
            >
              {fbEvents
                .find((event) => event.name === eventType)
                .parameters.map((parameter) => (
                  <Input
                    key={parameter.name}
                    label={parameter.name}
                    type={parameter.type === "number" ? "number" : "text"}
                    minWidth="150px"
                    onChange={handleDataParams}
                    value={dataParams[parameter.name]}
                    id={parameter.name}
                  />
                ))}
              <button onClick={sendEvent} style={{ minWidth: "250px" }}>
                Send Event
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
