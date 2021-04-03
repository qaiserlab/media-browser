import React, { useState } from "react";
import { render } from "react-dom";

import "antd/dist/antd.css";
import { Row, Col } from "antd";

import MediaBrowser from "./MediaBrowser";
import data from "./data.json";

function App() {
  const [myValue, setMyValue] = useState("7d4a5ac5-62e6-4b11-bdc1-09370366f206");
  
  const handleChange = (event: any) => {
    setMyValue(event.target.value);
  };

  return (
    <React.Fragment>
      <section style={{ padding: "16px" }}>
        <Row>
          <Col xs={0} lg={8} />
          <Col xs={24} lg={8}>
            <MediaBrowser
              dataSource={data}
              value={myValue}
              onChange={handleChange}
            />
          </Col>
          <Col xs={0} lg={8} />
        </Row>
      </section>
    </React.Fragment>
  );
}

render(<App />, document.getElementById("root"));
