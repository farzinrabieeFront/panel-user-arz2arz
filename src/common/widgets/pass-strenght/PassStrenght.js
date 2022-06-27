import { useEffect, useState } from "react";

import passwordMeter from "../passwordMeter/passwordMeter";

import Styles from "./PassStrenght.module.scss";

export default function PassStrenght({ password, status }) {
  const [strenght, setStrenght] = useState();

  useEffect(() => {
    checkpassword();
  }, [password]);

  const checkpassword = () => {
    if (password) {
      status = passwordMeter.getResult(password).status;
      console.log(status);
    }
    if (status) {
      console.log(status);
      switch (status) {
        case "needs requirement(s)":
          setStrenght(1);
          break;
        case "strong":
          setStrenght(2);
          break;
        case "veryStrong":
          setStrenght(3);
          break;
        case "perfect":
          setStrenght(4);
          break;

        default:
          setStrenght();
      }
    }
  };

  return (
    <div
      className={`
      center-content`}
    >
      <p
        className={`${
          (strenght === 1 && "text-danger") ||
          (strenght === 2 && "text-orange") ||
          (strenght >= 3 && "text-success")
        } size-4 mb-0 ms-4 me-md-2 text-nowrap`}
      >
        {(strenght === 1 && "ضعیف") ||
          (strenght === 2 && "متوسط") ||
          (strenght === 3 && "قوی") ||
          (strenght >= 4 && "بسیار قوی")}
      </p>
      <div className={`${Styles.progress} ltr d-flex justify-content-between `}>
        <span
          className={`${
            (strenght === 1 && "bg-danger") ||
            (strenght === 2 && "bg-orange") ||
            (strenght >= 3 && "bg-success")
          } w-25 rounded mr-2`}
        />
        <span
          className={`${
            (strenght <= 1 && "bg-light") ||
            (strenght === 2 && "bg-orange") ||
            (strenght >= 3 && "bg-success")
          } w-25 rounded mr-2`}
        />
        <span
          className={`${
            (strenght <= 2 && "bg-light") || (strenght >= 3 && "bg-success")
          } w-25 rounded mr-2`}
        />
        <span
          className={`${
            (strenght <= 3 && "bg-light") || (strenght >= 4 && "bg-success")
          } w-25 rounded mr-2`}
        />
      </div>
    </div>
  );
}
