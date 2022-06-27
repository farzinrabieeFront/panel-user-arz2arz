import { ErrorMessage, useField } from "formik";
import React from "react";
import { Form, Spinner } from "react-bootstrap";
import { IoCloseSharp, IoCloudUploadOutline } from "react-icons/all";
import Styles from "./VideoInput.module.scss";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import LottiFile from "../../../../assets/lottieFiles/loading-ident.json";

import videoRec from "../../../../assets/images/video-record-image.jpg";
import { Toastify } from "../../../../utils";
import Loadingsppiner from "../../loading-spinner/LoadingSppiner";

export default function VideoInputElement({
  label,
  labelClassName,
  loading,
  ErrorTextClassName,
  type = "image",
  enableEdit = true,
  icon: Icon,
  accept,
  ...props
}) {
  const [
    { name, value, onChange, ...field },
    { error, touched },
    { setValue },
  ] = useField(props);

  return [loading ? (
    <div className={`${Styles.FileInput} center-content flex-column`}>
      <Spinner animation="border" variant="info" />
      <div className="mt-3">{loading}%</div>
    </div>
  ) : (
    <div
      className={`${Styles.FileInput} ${value ? Styles.uploaded : null} ${error && touched ? Styles.uploadError : null
        } center-content`}
    >
      {value ? (
        <video className={Styles.video} controls>
          <source
            src={window.URL.createObjectURL(
              new Blob([value], { type: "video/mp4" })
            )}
            type="video/mp4"
          />
          {/* <source src={URL.createObjectURL(value)} type="video/mp4" /> */}
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className={Styles.imageIcon}>
          <img src={videoRec} className="mb-2" />
          <IoCloudUploadOutline size={50} className="text-gray-2" />
          <div className="text-gray-4 fw-500 mt-2 size-4 ">
            بارگذاری {label}
          </div>
        </div>
      )}
      <input
        {...field}
        type="file"
        name={name}
        accept={accept.join(', ')}
        className={`${Styles.input} ${value ? Styles.changePic : null}`}
        onChange={(event) => {
          if (accept.includes(event.currentTarget?.files[0]?.type))
            setValue(event.currentTarget.files[0]);
          else Toastify.info('نوع فایل انتخاب شده مجاز نیست')

        }}
      />
      {enableEdit && value ? (
        <div
          className={`${Styles.button} pointer size-4  text-white`}
          onClick={() => {
            setValue("");
          }}
        >
          {/* <span className="fw-700"> {label} احراز هویت</span> */}
          <span className="px-2 py-1 is-size-8 bg-danger rounded-pill">
            <IoCloseSharp size={14} />
            حذف
          </span>
        </div>
      ) : null}
    </div>
  ),
  error && touched ? (
    <ErrorMessage
      name={name}
      component={Form.Text}
      className={`${ErrorTextClassName} pe-2 text-danger is-size-8 `}
    />
  ) : null]
}
