import { useContext,useState } from "react";
import { fbEvents } from "../config/fbEvents";
import Input from "./Input";
import { MetaContext } from "../context/PixelContext";

const EventDetailsInput = ({
  handleEventSelect,
  eventType,
  handleDataParams,
  sendEvent,
  dataParams,
}) => {
  const { state } = useContext(MetaContext);
  const [paramters,setParameters] = useState([])

  const addParamter = () => {};
  return (
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
          <select id="eventType" onChange={handleEventSelect} value={eventType}>
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
          <p style={{ margin: 0, textAlign: "center" }}>Parameters:</p>
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
              .parameters?.map((parameter) => (
                <Input
                  key={parameter.name}
                  label={parameter.name}
                  type={parameter.type === "number" ? "number" : "text"}
                  minWidth="150px"
                  onChange={handleDataParams}
                  value={dataParams[parameter.name]}
                  id={parameter.name}
                  description={parameter.description}
                />
              ))}
            {eventType === "CustomEvent" && (
              <>
                <div style={{ display: "flex", flexDirection: "row", columnGap:"0.5rem" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        textAlign: "center",
                        fontStyle: "italics",
                        fontSize: "0.75rem",
                      }}
                    >
                      Parameter name:
                    </label>
                    <input />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        textAlign: "center",
                        fontStyle: "italics",
                        fontSize: "0.75rem",
                      }}
                    >
                      Parameter value:
                    </label>
                    <input />
                  </div>
                </div>
                <button onClick={addParamter} style={{ minWidth: "250px" }}>
                  Add Parameter
                </button>
              </>
            )}
            <button onClick={sendEvent} style={{ minWidth: "250px" }}>
              Send Event
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailsInput;
