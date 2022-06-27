import { useState } from "react";
import Styles from "./CreateTicketForm.module.scss";
import { Col, Row } from "react-bootstrap";
import { BiChevronLeft } from "react-icons/all";
import { useNavigate } from "react-router-dom";
import { Form, Formik, FastField } from "formik";
import { initialValues, Toastify, validators } from "../../../utils";

import uploadPoster from "../../../assets/images/uploadPoster.png";
//components
import CustomizedButton from "../../../components/form/button/Button";
import CustomizedFileButton from "../../../components/form/image-input/CustomizedFileButton";
import InputElement from "../../../common/element/formik-inputs/input/Input";
import { useMainApi } from "../../../common/hooks";

export default function CreateTicketForm() {
  const navigate = useNavigate();
  const [ticketImage, setTicketImage] = useState([]);
  const { urls, post, loading } = useMainApi()

  async function onSubmit(vals) {
    try {
      const formData = new FormData();
      for (let key in vals) {
        formData.append(key, vals[key]);
      }
      ticketImage.forEach((image) => {
        formData.append(`images`, image);
      });

      const { message } = await post(urls.Tickets, formData);
      Toastify.success(message);
      navigate("/support");
    } catch (error) {
      Toastify.error(error.message);
    }
  };

  const deleteFiles = (image) => {
    const new_list = ticketImage.filter((item) => item.name !== image.name);

    setTicketImage(new_list);
  };

  return (
    <div className=" p-4 bg-white rounded-20 shadow-card">
      <Row className="mb-3 justify-content=between align-items-center">
        <Col xs={12} className="mb-3 pb-3 border-bottom-lightGray">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="is-size-5 mb-0">
              تیکت جدید
              <p className="size-5 mb-0 mt-2 size-5">
                {" "}
                مشکلات و سوالات خود را در مورد پنل و معاملات در قسمت زیر وارد
                کنید.
              </p>
            </h1>
          </div>
        </Col>
      </Row>
      <Formik
        initialValues={initialValues.ticket.createTicket}
        validationSchema={validators.ticketSchema.createTicket}
        onSubmit={onSubmit}
      >
        {({ isValid, dirty }) => (
          <Form className="d-flex flex-wrap">
            <Col md={4} xs={12}>
              <FastField label="موضوع" name="title" as={InputElement} />
            </Col>
            <Col md={4} xs={12}>
              <FastField label="category" name="category" as={InputElement} />
            </Col>

            <Col xs={12} className="mt-3">
              <FastField
                label="متن پیام"
                name="description"
                textArea
                rows={5}
                as={InputElement}
              />
            </Col>

            <Col className="text-start mt-3">
              <CustomizedButton
                type="submit"
                size="md"
                className="rounded-5  "
              // disabled={!(isValid && dirty)}
              //  loading={loading}
              >
                <span className="mx-5 is-size-5 d-flex align-items-center justify-content-center">
                  ارسال پیام
                  <BiChevronLeft className="mr-1" size={20} />
                </span>
              </CustomizedButton>
            </Col>
          </Form>
        )}
      </Formik>

      <div className="row align-items-stretch mt-3">
        {ticketImage.map((item, index) => {
          return (
            <Col
              key={index}
              lg={3}
              sm={6}
              xs={12}
              className={`${Styles.addImageCol} mb-3`}
            >
              <CustomizedFileButton
                data={item}
                name="images"
                title="عکس جدید"
                handleSetFiles={(e) =>
                  setTicketImage((prev) => [...prev, e.target.files[0]])
                }
                handleDeleteFiles={(e) => deleteFiles(e)}
              />
            </Col>
          );
        })}
        {ticketImage.length <= 2 ? (
          <Col lg={3} sm={6} xs={12} className={`${Styles.addImageCol} mb-3`}>
            <CustomizedFileButton
              iconSrc={uploadPoster}
              name="images"
              title="عکس جدید"
              handleSetFiles={(e) =>
                setTicketImage((prev) => [...prev, e.target.files[0]])
              }
            />
            {/* <FastField as={CustomizedFileButton} />   */}
          </Col>
        ) : null}
      </div>
    </div>
  );
}
// <div className="d-flex flex-wrap align-items-stretch mt-3">
//     <Col
//       xl={2}
//       lg={3}
//       md={3}
//       sm={4}
//       xs={4}
//       className={`${Styles.addImageCol} mb-3`}
//     >
//       <CustomizeImageInput
//         handleSetFiles={(e) =>
//           setTicketImage((prev) => [...prev, e.target.files[0]])
//         }
//       />
//       {/* <FastField as={CustomizeImageInput} />   */}
//     </Col>

//     {ticketImage.map((item, index) => {
//       if (index <= 1) {
//         return (
//           <Col
//             key={index}
//             xl={2}
//             lg={3}
//             md={3}
//             sm={4}
//             xs={4}
//             className={`${Styles.addImageCol} mb-3`}
//           >
//             <CustomizeImageInput
//               handleSetFiles={(e) =>
//                 setTicketImage((prev) => [...prev, e.target.files[0]])
//               }
//             />
//           </Col>
//         );
//       }
//     })}
//   </div>
