import { useContext, useEffect, useState } from "react";
import { MetaContext } from "./context/PixelContext";
import { ConfigInput } from "./components/ConfigInput";
import ReactPixel from "react-facebook-pixel";
import EventDetailsInput from "./components/EventDetailsInput";
import UserDetailsInput from "./components/UserDetailsInput";

function App() {
  const { state, updateState } = useContext(MetaContext);
  const handleUpdate = (e) => {
    updateState({ ...state, [e.target.id]: e.target.value });
  };

  const [eventType, setEventType] = useState("ViewContent");
  const [dataParams, setDataParams] = useState({});
  const [userInfo, setUserInfo] = useState({});

  const handleEventSelect = (e) => {
    setEventType(e.target.value);
  };
  const sendEvent = () => {
    if (Object.keys(userInfo).length > 0) {
      ReactPixel.init(state.pixelId, userInfo);
      ReactPixel.track(eventType, dataParams);
      console.log(
        `Sending tracking event: ${eventType}\nWith user details: {${Object.entries(
          userInfo
        ).map(
          ([key, value]) => `${key}:${value}`
        )}}\nWith data params: {${Object.entries(dataParams).map(
          ([key, value]) => `${key}:${value}`
        )}}`
      );
    } else {
      ReactPixel.init(state.pixelId, userInfo);
      ReactPixel.track(eventType, dataParams);
      console.log(
        `Sending tracking event: ${eventType}\nWith no user details\nWith data params: {${Object.entries(
          dataParams
        ).map(([key, value]) => `${key}:${value}`)}}`
      );
    }
    setDataParams({});
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
      <UserDetailsInput onChange={handleUserInfo} userInfo={userInfo} />
      <hr />
      <EventDetailsInput
        handleDataParams={handleDataParams}
        handleEventSelect={handleEventSelect}
        dataParams={dataParams}
        eventType={eventType}
        sendEvent={sendEvent}
      />
    </div>
  );
}

export default App;
