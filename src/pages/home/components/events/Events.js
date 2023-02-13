import React from "react";

import { EventLayout } from "shared/layout/EventLayout";
import { UPCOMINGEVENTS, RANTANGAN } from "./constants";

export const Events = () => {
  return (
    <div className="flex justify-between flex-wrap pt-24">
      <EventLayout
        className="basis-1/3"
        title={UPCOMINGEVENTS.title}
        events={UPCOMINGEVENTS.events}
        icon={UPCOMINGEVENTS.icon}
        button1={UPCOMINGEVENTS.button1}
        button2={UPCOMINGEVENTS.button2}
      />
      <EventLayout
        className="basis-1/3"
        title={RANTANGAN.title}
        events={RANTANGAN.events}
        icon={RANTANGAN.icon}
        button1={UPCOMINGEVENTS.button1}
        button2={UPCOMINGEVENTS.button2}
      />
    </div>
  );
};
