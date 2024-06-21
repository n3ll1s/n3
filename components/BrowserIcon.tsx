import React from "react";
import { SVGComponent } from "@/types/svg";

const BrowserIcon = () => {
  return (
    <svg
      width="34px"
      height="34px"
      viewBox="0 0 192 192"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <circle cx="96" cy="96" r="74" stroke="#ffffff" stroke-width="12" />
      <ellipse
        cx="96"
        cy="96"
        stroke="#ffffff"
        stroke-width="12"
        rx="30"
        ry="74"
      />
      <path
        stroke="#ffffff"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="12"
        d="M28 72h136M28 120h136"
      />
    </svg>
  );
};

export default BrowserIcon;
