import React, { useEffect, useRef, useState } from 'react';
import PropTypes, { string } from 'prop-types';
import { useMainApi } from '../../../../common/hooks';
import { SelectCoin, SelectNetwork, NewInput } from '../../../../common/element/formik-inputs';
import { Field, Form, Formik } from 'formik';
import { Toastify } from '../../../../utils';
import { Col } from 'react-bootstrap';
import { FaChevronLeft } from 'react-icons/all';
import { useSelector } from 'react-redux';
import CustomizedButton from '../../../../components/form/button/Button';
import * as yup from "yup";


export default function AddressForm({ symbol, network, onHide, address }) {
    const { post, put, urls, loading } = useMainApi()
    const { withdrawEnabled, configs } = useSelector((state) => state.config);
    const formikRef = useRef()
    const [networkInfo, setNetworkInfo] = useState({});

    async function createAddressesHandler(_body) {
        try {
            const res = await post(urls.FavoriteAddresses, _body)
            Toastify.success(res.message);
            onHide()
        } catch (error) {
            Toastify.error(error.message);
        }
    }

    async function updateAddressHandler(_body) {
        try {
            const _url = urls.FavoriteAddress.replace('_id', _body._id)
            delete _body._id;
            delete _body.isInternal;
            const res = await put(_url, _body);

            Toastify.success(res.message);
            onHide()
        } catch (error) {
            Toastify.error(error.message);
        }
    }

    function vaildationMethod(vals) {
        setNetworkInfo(configs[vals.symbol].networks.find(item => vals.network.match(item.network)));
    }

    const vaildationMethodSchema = () => {
        const vals = formikRef.current.values
        const _schema = {
            // name: yup.string().required("این فیلد الزامی است."),
            // address: yup
            //     .string()
            //     .required("این فیلد الزامی است.")
            //     .matches(networkInfo?.addressRegex, {
            //         message: "فرمت آدرس وارد شده درست نیست.",
            //         excludeEmptyString: false,
            //     }),
        };

        if (networkInfo?.sameAddress) {
            // _schema.addressTag = yup
            //     .string()
            //     .required("این فیلد الزامی است.")
            //     .matches(networkInfo?.memoRegex, {
            //         message: "فرمت تگ ممو وارد شده درست نیست.",
            //         excludeEmptyString: false,
            //     })
        }

        return yup.object().shape(_schema);
    };


    return (
        <Formik
            innerRef={formikRef}
            enableReinitialize
            initialValues={{
                symbol: symbol,
                network: network,
                name: "",
                address: "",
                memo: "",
                ...address
            }}
            validate={vaildationMethod}
            validationSchema={vaildationMethodSchema}
            onSubmit={'_id' in address ? updateAddressHandler : createAddressesHandler}
        >
            {({ isValid, dirty, values }) => (
                <Form className="d-flex flex-wrap justify-content-center">
                    <Col xs={12} className="mb-3">
                        <Field
                            as={SelectCoin}
                            label="نام ارز"
                            name="symbol"
                            options={withdrawEnabled}
                        />
                    </Col>

                    <Col xs={12} className="mb-3">
                        <Field
                            as={SelectNetwork}
                            symbol={values.symbol}
                            name="network"
                            type="Deposit"
                            options={configs[values.symbol].networks}
                            fee
                        />

                    </Col>

                    <Col xs={12} className="mb-1">
                        <Field as={NewInput} name="name" label="عنوان" />
                    </Col>

                    <Col xs={12} className="mb-3">
                        <Field as={NewInput} name="address" label="آدرس کیف پول" />
                    </Col>

                    {networkInfo?.sameAddress ?
                        <Col xs={12} className="mb-3">
                            <Field as={NewInput} name="memo" label="آدرس تگ ممو" />
                        </Col> : null}

                    <Col xs={12} className="mt-3">
                        <CustomizedButton
                            isFullWidth
                            leftIcon={<FaChevronLeft size={20} />}
                            type="submit"
                            className="tradeBtn size-3 fw-700 py-1"
                            size="sm"
                            variant="blue"
                            disabled={!(isValid && dirty)}
                            loading={loading}
                        >
                            {'_id' in address ? "ویرایش آدرس" : "افزودن آدرس جدید"}
                        </CustomizedButton>
                    </Col>
                </Form>
            )}
        </Formik>
    );
};

AddressForm.propTypes = {
    symbol: PropTypes.string.isRequired,
    network: PropTypes.string.isRequired,
    address: PropTypes.object,
    onHide: PropTypes.func,
};

AddressForm.defaultProps = {
    address: {},
    onHide: function () { },
}

