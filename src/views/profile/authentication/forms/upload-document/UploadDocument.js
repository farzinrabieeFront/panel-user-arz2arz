/**internal imports */
import { useEffect, useRef, useState } from "react";
import Styles from "./UploadDocument.module.scss";
import { Toastify } from "../../../../../utils";
import { useMainApi, useRedux } from "../../../../../common/hooks";
/**external imports */
import { Row, Col } from "react-bootstrap";
import {
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  FiChevronRight,
  IoMdCheckboxOutline,
  RiErrorWarningLine,
  FiChevronLeft,
} from "react-icons/all";
import { Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
/**components imports */
import acceptabletPic from "../../../../../assets/images/acceptable-pic.jpg";
import unacceptablePic1 from "../../../../../assets/images/unacceptable-pic1.jpg";
import unacceptablePic2 from "../../../../../assets/images/unacceptable-pic2.jpg";
import CustomizedButton from "../../../../../components/form/button/Button";
import FileInputElement from "../../../../../common/element/formik-inputs/file-input/FileInput";
import VideoInputElement from "../../../../../common/element/formik-inputs/video-input/VideoInput";

export default function UploadDocument({ next, prev }) {
  const formikRef = useRef(null);
  const { getUserData } = useRedux();
  const { customerIdentity } = useSelector((state) => state.user);
  const { urls, get, post } = useMainApi()
  const [loading, setLoading] = useState({
    nationalCardImage: 0,
    video: 0
  });


  useEffect(checkCustomerIdentityHandler, [customerIdentity]);

  function checkCustomerIdentityHandler() {
    if (customerIdentity && "_id" in customerIdentity) {
      let { nationalCardImage, video, _id } = customerIdentity;
      if (nationalCardImage)
        downloadDocumentsHandler('nationalCardImage');

      if (video) downloadDocumentsHandler('video');
    }
  }

  async function downloadDocumentsHandler(type) {
    try {
      const _config = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded * 100) / total);
          setLoading(prev => ({ ...prev, [type]: percentage }))
        },
      };

      const _url = urls.DownloadDocument.replace('_id', customerIdentity._id)
        .replace('_name', customerIdentity[type])

      const res = await get(_url, _config)
      console.log({ type, res });
      formikRef.current.setFieldValue(type, res);
    } catch (error) {
      Toastify.error(error.message);
    } finally {
      setLoading(prev => ({ ...prev, [type]: 0 }))
    }
  };

  async function uploadDocumentsHandler(vals) {
    const file_type = Object.keys(vals)[0]
    try {
      const formData = new FormData();
      formData.append(file_type, vals[file_type]);

      const uploadConfig = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded * 100) / total);
          setLoading(prev => ({ ...prev, [file_type]: percentage }))
        },
      };

      const url = urls[`Upload${file_type.replace(/^./, file_type[0].toUpperCase())}Identity`]
      const { message } = await post(url, formData, uploadConfig)

      Toastify.success(message);
      getUserData()
    } catch (error) {
      Toastify.error(error.message);
    } finally {
      setLoading(prev => ({ ...prev, [file_type]: 0 }))
    }
  };

  const nationalCardGuide = [
    <Col lg={12} className="mb-4" key="1">
      <h2 className="text-blue fw-700 is-size-5 mb-3 pb-1">
        بارگذاری تصویر کارت ملی
      </h2>
      <ul className="mb-0">
        <li className="size-4  text-gray-3 mb-2">
          <RiErrorWarningLine
            size={20}
            className="text-blue-light ms-2 align-middle"
          />{" "}
          تصویر کارت ملی شفاف و بدون اختلال انعکاس نور مثل (فلش دوربین یا خورشید
          ... ) باشد.
        </li>
        <li className="size-4  text-gray-3">
          <RiErrorWarningLine
            size={20}
            className="text-blue-light ms-2 align-middle"
          />
          در حین عکس برداری از کارت سایه جسمی بر روی کارت نباشد.
        </li>
      </ul>
    </Col>,
    <Col md={7} className="ps-md-5 mb-5 mb-md-0" key="2">
      <Row>
        <Col xs={4} className="flex-column center-content position-relative">
          <img src={unacceptablePic2} />
          <span className="text-danger mt-1">
            <RiCloseCircleFill size={20} />
          </span>
        </Col>
        <Col
          xs={4}
          className="col-4 flex-column center-content position-relative"
        >
          <img src={unacceptablePic1} />
          <span className="text-danger mt-1">
            <RiCloseCircleFill size={20} />
          </span>
        </Col>
        <Col
          xs={4}
          className="col-4 flex-column center-content position-relative"
        >
          <img src={acceptabletPic} />
          <span className="text-success mt-1">
            <RiCheckboxCircleFill size={20} />
          </span>
        </Col>
      </Row>
    </Col>,
  ];

  const videoGuide = [
    <Col sm={7} className="ps-md-5  mb-5 mb-sm-0">
      <h2 className="text-blue fw-700 is-size-5 mb-3 pb-1">بارگذاری ویدئو</h2>
      <ul>
        <li className="size-4  text-gray-3 mb-2">
          <RiErrorWarningLine
            size={20}
            className="text-blue-light ms-2 align-middle"
          />
          لطفا ویدئو خود را به صورت عمودی ضبط کنید.
        </li>
        <li className="size-4  text-gray-3 mb-2">
          <RiErrorWarningLine
            size={20}
            className="text-blue-light ms-2 align-middle"
          />
          زمان ضبط ویدیو حداکثر ۴۰ ثانیه می باشد.
        </li>
        <li className="size-4  text-gray-3 d-flex flex-wrap">
          <span>
            <RiErrorWarningLine
              size={20}
              className="text-blue-light ms-2 align-middle"
            />
          </span>
          <span> هنگام ضبط ویدیو نکات زیر را رعایت فرمایید.</span>
          <ul className="col-12 my-2 me-4">
            <li className="mb-2">
              <IoMdCheckboxOutline
                size={16}
                className="text-blue-light ms-2 align-middle"
              />{" "}
              نور از پشت سر تابیده نشود.
            </li>
            <li className="mb-2">
              <IoMdCheckboxOutline
                size={16}
                className="text-blue-light ms-2 align-middle"
              />
              صورت در حالت نیم سایه نباشد.
            </li>
            <li className="mb-2">
              <IoMdCheckboxOutline
                size={16}
                className="text-blue-light ms-2 align-middle"
              />
              محیط مه آلود نباشد.
            </li>
            <li>
              <IoMdCheckboxOutline
                size={16}
                className="text-blue-light ms-2 align-middle"
              />
              دست در هنگام گرفتن ویدئو نلرزد.
            </li>
          </ul>
        </li>
        <li className="size-4  text-gray-3 mb-2">
          <RiErrorWarningLine
            size={20}
            className="text-blue-light ms-2 align-middle"
          />
          در زمان ضبط ویدیو بایستی متن زیر را بصورت شمرده شمرده و واضح بخوانید:
        </li>
      </ul>
      <div className={`${Styles.sampleText}`}>
        <p className="mb-0 size-5 text-gray-3 text-justify">
          جهت احراز هویت در سایت ارز تو ارز . اینجانب{" "}
          <span className="fw-700">{`${customerIdentity?.firstName || ""} ${customerIdentity?.lastName || ""
            }`}</span>{" "}
          قوانین سایت را مطالعه کرده و مسئولیت تمامی خرید و فروش ها از حساب
          کاربری را میپذیرم و حساب کاربری و کارت بانکی خود را در اختیار فرد
          دیگری قرار نمی‌دهم.
        </p>
      </div>
    </Col>,
  ];

  return (
    <Formik
      innerRef={formikRef}
      enableReinitialize={true}
      // validate={(vals) => console.log(vals)}
      initialValues={{
        nationalCardImage: "",
        video: "",
      }}
      onSubmit={({ nationalCardImage, video }) => {
        if (!(nationalCardImage instanceof File) && !(video instanceof File))
          next();
        else {
          if (nationalCardImage instanceof File)
            uploadDocumentsHandler({ nationalCardImage });
          if (video instanceof File) uploadDocumentsHandler({ video });
        }
      }}
    >
      {({ values }) => (
        <Form>
          <Row className="align-items-center">
            {nationalCardGuide}

            <Col md={5} className="pe-md-5">
              <Field
                name="nationalCardImage"
                loading={loading.nationalCardImage}
                className="mb-3"
                label="تصویر کارت ملی"
                as={FileInputElement}
                accept={["image/png", "image/jpeg", "image/jpg"]}
              />
            </Col>
          </Row>

          <Row className="mt-5 pt-4 align-items-center">
            {videoGuide}

            <Col sm={5} className="pe-md-5">
              <Field
                name="video"
                label="ویدئو"
                loading={loading.video}
                as={VideoInputElement}
                accept={["video/mp4"]}
              />
            </Col>
          </Row>

          <Row className="mt-5 justify-content-between">
            <Col lg={3} md={4} xs={6} className="text-end">
              <CustomizedButton
                rightIcon={<FiChevronRight size={20} />}
                outlined
                className="size-4 "
                size="md"
                variant="blue"
                onClick={prev}
              >
                مرحله قبل
              </CustomizedButton>
            </Col>

            <Col lg={3} md={4} xs={6} className="text-start">
              <CustomizedButton
                leftIcon={<FiChevronLeft size={20} />}
                type="submit"
                size="xs"
                className="size-4 "
                variant="blue"
                loading={loading.nationalCardImage || loading.video}
                style={{ minWidth: "120px" }}
              >
                {values.nationalCardImage instanceof File ||
                  values.video instanceof File
                  ? "آپلود مدارک"
                  : " مرحله بعد"}
              </CustomizedButton>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
}