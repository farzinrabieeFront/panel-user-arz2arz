import { useState } from "react";
import Styles from "../../CreateTicket.module.scss";
import { FiSearch, MdOutlineKeyboardArrowLeft } from "react-icons/all";

const CommonQue = ({ searchQue, setSearchQue, queList }) => {
  const [active, setactive] = useState("");

  return (
    <>
      <h2 className="text-blue size-3 fw-500 mb-0">سوالات متداول</h2>
      <div className={`${Styles.input} form-control mt-3 w-100`}>
        <FiSearch className={`${Styles.icon} text-gray-1`} size={20} />
        <input
          className="size-5 text-gray-2"
          placeholder="جستجو"
          onChange={(e) => setSearchQue(e.target.value)}
        />
      </div>
      <ul className="p-0 h-auto">
        {queList
          ? queList.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`${Styles.questions} ${
                    active === item._id && Styles.activeQue
                  } d-flex flex-column mt-6 border-bottom border-gray-2 pointer overflow-hidden`}
                  onClick={() => {
                    active === item._id ? setactive("") : setactive(item._id);
                  }}
                >
                  <h2 className="w-100 size-4 fw-400 text-gray-4">
                    <MdOutlineKeyboardArrowLeft
                      size={18}
                      className="text-blue"
                    />
                    {item.question}
                  </h2>
                  <p className="w-100 fw-400 size-5 text-gray-3">
                    {item.answer}
                  </p>
                </li>
              );
            })
          : null}
      </ul>
    </>
  );
};

export default CommonQue;
