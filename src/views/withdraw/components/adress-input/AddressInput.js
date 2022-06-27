import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Toastify } from '../../../../utils';
import { useMainApi } from '../../../../common/hooks';
import { useField } from 'formik';
import { SelectInput } from '../../../../common/element/formik-inputs';
import Styles from "./AddressInput.module.scss";
import {
    HiOutlineChevronDown,
    TiContacts,
    FiTrash2,
    FiEdit2,
    HiPlus,
    FiChevronDown
} from "react-icons/all";
import CustomizedModal from "../../../../components/modal/Modal";
import AddressForm from "./AddressForm";
import NewInput from '../../../../common/element/formik-inputs/new-input/NewInput';
import DeleteConfirmation from '../../../../common/element/modals/delete-confirmation/DeleteConfirmation';

export default function AddressInput({ symbol, network, setMemo, ...props }) {
    const [
        { value, name, onChange, ...field },
        { error, touched },
        { setValue },
    ] = useField(props);

    const { get, del, urls, loading } = useMainApi()
    const [showModal, setShowModal] = useState(false);
    const [showDelConfirmation, setShowDelConfirmation] = useState(false);
    const [address, setAddress] = useState({});
    const [addresses, setAddresses] = useState([]);

    async function getAddressesHandler() {
        try {
            const _params = { symbol, network };
            const res = await get(urls.FavoriteAddresses, { _params })
            res.data.push({})
            setAddresses(res.data);
        } catch (error) {
            Toastify.error(error.message);
        }
    }

    async function delAddressHandler() {
        try {
            const _url = urls.FavoriteAddress.replace('_id', address._id)
            const res = await del(_url)
            Toastify.success(res.message);
            getAddressesHandler();
            setShowDelConfirmation(false)
            setAddresses({});
        } catch (error) {
            Toastify.error(error.message);
        }
    }

    const formatOptionSelect = useCallback((item) => {
        if ('_id' in item) {
            return (
                <div
                    key={item}
                    className={`${Styles.item} d-flex align-items-center justify-content-between py-2 px-3 h-100`}
                    onClick={(e) => {
                        e.stopPropagation();
                        setValue(item.address);
                        if (item.memo) {
                            setMemo(item.memo);
                        }
                    }}
                >
                    <span className="text-gray-4 size-4">{item.name}</span>
                    <span>
                        <FiEdit2
                            className="text-gray-2 ms-3 pointer"
                            size={16}
                            onClick={(e) => {
                                e.stopPropagation();
                                setAddress(item);
                                setShowModal(true);
                            }}
                        />
                        <FiTrash2
                            className="text-gray-2 pointer"
                            size={16}
                            onClick={(e) => {
                                e.stopPropagation();
                                setAddress(item);
                                setShowDelConfirmation(true);
                            }}
                        />
                    </span>
                </div>
            )

        } else {
            return <div className="d-flex align-items-center py-2 px-3 text-blue h-100">
                <span
                    className="size-4 fw-500 pointer"
                    onClick={() => setShowModal(true)}
                >
                    <HiPlus size={16} className="ms-1" />
                    افزودن آدرس جدید
                </span>
            </div>
        }
    }, [])

    // console.log(name, value);
    const input =
        <SelectInput
            name={name}
            label="کیف پول"
            options={addresses}
            value={value}
            onChange={onChange}
            formatOptionLabel={formatOptionSelect}
            isLoading={loading}
            isClearable={true}
            isSearchable
            noOptionsMessage={(vals) => ([
                <div
                    className={`${Styles.item} size-5  text-gray-2 d-flex align-items-center justify-content-between py-2 px-3`}
                >
                    هنوز آدرسی اضافه نشده
                </div>
                ,
                <div className="d-flex align-items-center py-2 px-3 text-blue pointer" onClick={() => setShowModal(true)}>
                    {/* <span
                        className="size-4 fw-500 "
                    > */}
                    <HiPlus size={16} className="ms-1" />
                    افزودن آدرس جدید
                    {/* </span> */}
                </div >
            ])}
            onMenuOpen={getAddressesHandler}
            components={{
                DropdownIndicator: () => <div className='d-flex mx-2 pointer'>
                    <TiContacts className='pt-1 text-gray-2' size={25} />
                    <FiChevronDown className='pt-1 text-gray-2' size={25} />
                </div>
            }}
            styles={{
                input: () => ({
                    height: "100%",
                    paddingRight: '10px !important'
                }),
            }}
        />

    return [
        <>
            <div className='position-relative'>
                {input}
                <NewInput value={value} name={name} onChange={(vals) => setValue(vals.target.value)} inputClassName={Styles.overlayInput} />
            </div>

            {showModal ?
                <CustomizedModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    keyboard={true}
                    backdrop="static"
                    centered
                    size="md"
                    title={
                        <h2 className="text-gray-4 size-4 fw-500 mb-0">افزودن آدرس جدید</h2>
                    }
                >
                    <AddressForm
                        address={address}
                        symbol={symbol}
                        network={network}
                        onHide={() => {
                            setShowModal(false)
                            getAddressesHandler()
                        }} />
                </CustomizedModal> : null}

            {showDelConfirmation ?
                <DeleteConfirmation
                    show={showDelConfirmation}
                    onHide={() => setShowDelConfirmation(false)}
                    onClick={delAddressHandler}
                    title={<div className='fw-500 text-center'>آیا با حذف کیف پول موافقید؟</div>}
                    desc={<div className='border rounded-15 p-3 '>
                        <p className='text-center mb-1 text-gray-4 fw-500 size-4'>{`کیف پول ${address.name}`}</p>
                        <p className='text-center m-0 text-gray-4 fw-500 size-4'>{address.address}</p>
                    </div>}
                /> : null}
        </>

    ]
};




// AddressInput.propTypes = {

// };


