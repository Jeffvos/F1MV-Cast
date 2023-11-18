import React from "react";
import TopThreeDriverCard from "./TopThreeDriverCard";

const TopThreeDrivers = ({ lines, ended }) => {
  const TopThreeCards = () => {
    const mapper = lines.map((line) => {
      return <TopThreeDriverCard line={line} ended={ended} />;
    });
    return mapper;
  };
  return (
    <>
      <TopThreeCards />
    </>
  );
};

export default TopThreeDrivers;
