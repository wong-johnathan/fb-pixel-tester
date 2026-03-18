import React, { useContext, useState } from "react";
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
  const [parameters, setParameters] = useState([[]]);
  const [customEventName, setCustomEventName] = useState();

  const addParameter = () => setParameters((prev) => [...prev, []]);

  const handleParameterUpdate = (index, key, value) => {
    setParameters((prev) =>
      prev.map((parameter, i) => {
        if (i === index) parameter[key] = value;
        return parameter;
      })
    );
  };

  const handleSendCustomEvent = (type) => {
    const dataParams = {};
    for (const parameter of parameters) dataParams[parameter[0]] = parameter[1];
    sendEvent({ customData: { eventType: customEventName, dataParams }, type });
    setParameters([[]]);
  };

  const handleSend = (type) => {
    if (eventType === "CustomEvent") handleSendCustomEvent(type);
    else sendEvent({ type });
  };

  const selectedEvent = fbEvents.find((e) => e.name === eventType);

  return (
    <div className="card">
      <p className="card-title">Event Details</p>

      <div className="field-grid-1" style={{ maxWidth: 420 }}>
        <div className="select-row">
          <label htmlFor="eventType">Event Type</label>
          <select id="eventType" onChange={handleEventSelect} value={eventType}>
            <option>Select event type</option>
            {fbEvents.map((event) => (
              <option key={event.name}>{event.name}</option>
            ))}
          </select>
        </div>
        {selectedEvent?.description && (
          <p className="event-description">{selectedEvent.description}</p>
        )}
      </div>

      {selectedEvent && (
        <>
          {selectedEvent.parameters?.length > 0 && (
            <>
              <div className="section-divider" />
              <p className="card-title" style={{ marginBottom: "0.75rem" }}>Parameters</p>
              <div className="field-grid">
                {selectedEvent.parameters.map((parameter) => (
                  <Input
                    key={parameter.name}
                    label={parameter.name}
                    type={parameter.type === "number" ? "number" : "text"}
                    onChange={handleDataParams}
                    value={dataParams[parameter.name]}
                    id={parameter.name}
                    description={parameter.description}
                  />
                ))}
              </div>
            </>
          )}

          {eventType === "CustomEvent" && (
            <>
              <div className="section-divider" />
              <div className="field-grid-1" style={{ maxWidth: 420 }}>
                <div className="field">
                  <label htmlFor="customEventType">Event Name</label>
                  <input
                    id="customEventType"
                    value={customEventName ?? ""}
                    onChange={(e) => setCustomEventName(e.target.value)}
                  />
                  <span className="field-hint">Character count: {customEventName?.length ?? 0}</span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.75rem" }}>
                {parameters.map((parameter, index) => (
                  <div key={`param-${index}`} className="param-row">
                    <div className="field">
                      <label htmlFor={`parameters-${index}-0`}>Parameter name</label>
                      <input
                        id={`parameters-${index}-0`}
                        value={parameter[0] ?? ""}
                        onChange={(e) => handleParameterUpdate(index, 0, e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor={`parameters-${index}-1`}>Parameter value</label>
                      <input
                        id={`parameters-${index}-1`}
                        value={parameter[1] ?? ""}
                        onChange={(e) => handleParameterUpdate(index, 1, e.target.value)}
                      />
                    </div>
                    <button
                      className="btn btn-danger btn-sm"
                      style={{ alignSelf: "flex-end", marginBottom: "0.05rem" }}
                      onClick={() => setParameters((prev) => prev.filter((_, i) => i !== index))}
                    >
                      Del
                    </button>
                  </div>
                ))}
                <button className="btn btn-ghost" style={{ alignSelf: "flex-start" }} onClick={addParameter}>
                  + Add Parameter
                </button>
              </div>
            </>
          )}

          <div className="section-divider" />
          <div className="btn-group">
            <button className="btn btn-primary" onClick={() => handleSend("pixel")}>Send Pixel</button>
            <button className="btn btn-secondary" onClick={() => handleSend("capi")}>Send CAPI</button>
            <button className="btn btn-success" onClick={() => handleSend("both")}>Send Both</button>
          </div>
        </>
      )}
    </div>
  );
};

export default EventDetailsInput;
