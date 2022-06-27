import React from "react";
import { BsInfoCircle } from "react-icons/all";

export default function General(props) {
  return (
    <div className="d-flex">
      <div>
        <BsInfoCircle className="text-blue" size={20} />
      </div>
      <div>
        {/* <div>{data.title}</div>
          <div>{data.description}</div> */}
      </div>
    </div>
  );
}
