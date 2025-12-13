import React from "react";

const LoadingSpinner = ({
  size = 40,
  color = "white",
  thickness = 4,
}) => {
  return (
    <div
      className="flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderWidth: thickness,
          borderStyle: "solid",
          borderColor: `${color}33`,
          borderTopColor: color,
        }}
        className="rounded-full animate-spin"
      />
    </div>
  );
};

export default LoadingSpinner;
