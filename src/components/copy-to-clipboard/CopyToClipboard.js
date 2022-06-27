import React, { useEffect, useRef, useState } from 'react'
import { MdContentCopy, MdCheckBox, IoCheckboxOutline } from 'react-icons/all'
import { copyToClipboard } from '../../utils'
import Styles from "./CopyToClipboard.module.scss"

const CopyToClipboard = ({ data, children, size, className }) => {
    let ref = useRef(null)
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setCopied(false);
        }
    };

    return (
        <span
            ref={ref}
            className={`${className || ''} pointer text-gray-4 en d-flex align-items-center justify-content-end ltr`}
            onClick={() => {
                copyToClipboard(data)
                setCopied(true);
            }}
        >
            {copied ? (
                <IoCheckboxOutline
                    size={16}
                    className={`${copied ? Styles.copied : ""} text-blue  pointer`}
                />
            ) : (
                <MdContentCopy
                    size={size || 16}
                    className={`${copied ? Styles.copied : ""} text-gray-3  pointer`}
                />
            )}
            {/* <MdContentCopy
                size={16}
                className="text-gray-3 en  pointer"
            /> */}
            {children ?
                <span className='ms-2'>{children}</span>
                : null
            }
        </span>
    )
}

export default CopyToClipboard