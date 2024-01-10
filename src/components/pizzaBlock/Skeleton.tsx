import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = () => (
    <ContentLoader 
    speed={2}
    width={280}
    height={520}
    viewBox="0 0 280 520"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="270" rx="10" ry="10" width="280" height="24" /> 
    <circle cx="139" cy="130" r="130" /> 
    <rect x="0" y="310" rx="10" ry="10" width="280" height="83" /> 
    <rect x="2" y="422" rx="10" ry="10" width="95" height="30" /> 
    <rect x="124" y="414" rx="10" ry="10" width="152" height="44" />
  </ContentLoader>
);

export default Skeleton;
