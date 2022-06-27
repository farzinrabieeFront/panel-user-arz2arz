import { useRef } from "react";
import { Button } from "react-bootstrap";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Styles from "./FileButton.module.scss";
const CustomizedFileButton = ({
  children,
  className = "",
  size = "md",
  variant = "success",
  type = "button",
  isFullWidth = false,
  loading = false,
  outlined = false,
  disable = false,
  onChange = () => false,
  accept,
  ...rest
}) => {
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  return (
    <>
      <Button
        type={type}
        variant={`${outlined ? "outline-" : ""}${variant}`}
        className={`${Styles.btn} position-relative ${className}`}
        size={size}
        block={isFullWidth}
        disabled={loading || disable}
        onClick={handleClick}
        {...rest}
      >
        <span className={`${Styles.icon} bg-danger text-white p-2`}><AiOutlineCloudUpload size={20} /></span>
        {children}
      </Button>
      <input
        type="file"
        style={{ display: "none" }}
        ref={hiddenFileInput}
        onChange={onChange}
        accept={accept}
      />
    </>
  );
};
export default CustomizedFileButton;
