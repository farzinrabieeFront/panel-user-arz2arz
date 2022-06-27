import { useState } from "react";
import { FastField, Formik, Form } from "formik";
import { Col } from "react-bootstrap";
import InputElement from "../../../../../common/element/formik-inputs/input/Input";
import CustomizedButton from "../../../../../components/form/button/Button";
import { initialValues, Toastify, validators } from "../../../../../utils";
import { IoIosArrowBack } from "react-icons/all";
import ImgInput from "../imgInput/ImgInput";
import { ticketServices } from "../../../../../services";
import { useNavigate } from "react-router-dom";
import useMainApi from "../../../../../common/hooks/useMainApi";

const ConfirmTicket = ({ subject }) => {
    const navigate = useNavigate();
    const [imageLoading, setImageLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const { urls, post } = useMainApi()

    const onSubmit = async (vals) => {
        const _formData = new FormData();
        try {
            for (let key in vals) {
                _formData.append(key, vals[key]);
            }
            _formData.append(`category`, subject._id);
            // vals.imageUpload && formData.append(`image`, vals.imageUpload);
            const res = await post(urls.Tickets, _formData);
            Toastify.success(res.message);
            navigate("/ticket", { state: { id: res.data._id } });
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    return (
        <>
            <h2 className="text-blue size-3 fw-500 mb-0">موضوع: {subject.title}</h2>

            <Formik
                initialValues={initialValues.ticket.createTicket}
                validationSchema={validators.ticketSchema.createTicket}
                onSubmit={onSubmit}
            >
                {({ isValid, dirty }) => (
                    <Form className="d-flex flex-wrap mt-4">
                        <Col xs={12}>
                            <FastField label="عنوان" name="title" as={InputElement} />
                        </Col>

                        <Col xs={12} className="mt-2">
                            <FastField
                                label="توضیحات"
                                name="description"
                                textArea
                                rows={5}
                                as={InputElement}
                            />
                        </Col>

                        <Col xs={12} className="mt-2">
                            <FastField name="image" loading={imageLoading} as={ImgInput} />
                        </Col>

                        <CustomizedButton
                            leftIcon={<IoIosArrowBack size={20} />}
                            className={`w-100 size-2 fw-700 line-height-normal mt-4`}
                            variant="blue"
                            type="submit"
                            loading={loading}
                        >
                            ارسال تیکت{" "}
                        </CustomizedButton>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default ConfirmTicket;
