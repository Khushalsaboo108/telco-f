import React from "react";
import { getHours } from "date-fns";

const Greeting = () => {
  const getGreeting = () => {
    const currentHour = getHours(new Date());

    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "Good Afternoon";
    } else if (currentHour >= 17 && currentHour < 22) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  };

  return (
    <div className="greeting">
      <h3 className=" font-sans text-[16px] ">{getGreeting()}</h3>
    </div>
  );
};

export default Greeting;
