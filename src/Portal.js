import { createPortal } from "react-dom";

const Portal = ({ children, rootId }) => {
  const root = rootId ? document.getElementById(rootId) : document.body;
  return createPortal(children, root);
};

export default Portal;
