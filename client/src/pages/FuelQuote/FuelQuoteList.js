import React from "react";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

export default function FuelQuoteList() {
  return (
    <div>
      <VerticalTimeline layout={"1-column-right"}>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
          date="February 15, 2021"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        >
          <h3 className="vertical-timeline-element-title">FuelQuoteID: 1</h3>
          <h3 className="vertical-timeline-element-subtitle">
            Gallons Requested: 15
          </h3>
          <h3 className="vertical-timeline-element-subtitle">
            Price per gallon: $2.99
          </h3>
          <p>321 Chicken, Houston, TX, 77002</p>
          {/* <button>CLICK ME</button> */}
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{
            background: "#FFF",
            color: "rgb(33, 150, 243)",
          }}
          contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
          date="February 3, 2021"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        >
          <h3 className="vertical-timeline-element-title">FuelQuoteID: 1</h3>
          <h3 className="vertical-timeline-element-subtitle">
            Gallons Requested: 20
          </h3>
          <h3 className="vertical-timeline-element-subtitle">
            Price per gallon: $2.09
          </h3>
          <p>456 Donut Street, Houston, TX, 77002</p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
}
