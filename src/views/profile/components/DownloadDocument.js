/** internal imports */
import { useState } from "react";
import { useMainApi } from "../../../common/hooks";
import Styles from "../Profile.module.scss";
import CloudICon from "../../../assets/svgs/CloudInput.svg";
/** external imports */
import { Col, Row } from "react-bootstrap";
/** component imports */
import TriangleTitle from "../../../components/triangle-title/TriangleTitle";
import { Toastify } from "../../../utils";

export default function DownloadDocument({ customerIdentity }) {
  const { urls, get } = useMainApi();
  const [loading, setLoading] = useState({
    nationalCardImage: 0,
    video: 0,
  });

  async function downloadFileHandler(type) {
    try {
      const _config = {
        responseType: "blob",
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded * 100) / total);
          setLoading((prev) => ({ ...prev, [type]: percentage }));
        },
      };

      const _url = urls.DownloadDocument.replace(
        "_id",
        customerIdentity._id
      ).replace("_name", customerIdentity[type]);

      const res = await get(_url, { _config });

      console.log(res);
      const dataFile = new File([res], customerIdentity[type], {
        type: res.type,
      });
      const dataFileType = dataFile.type.split("/")[1];

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(res);
      link.download = `${type}-${new Date()}.${dataFileType}`;
      link.click();
    } catch (error) {
      Toastify.error(error.message);
    }
  }

  return (
    <div className="wrapper">
      <TriangleTitle className="mb-4">مدارک</TriangleTitle>

      <Row className="px-4">
        <Col xs={12} sm={6} className="mb-5 mb-md-3 p-0 ">
          <p className="text-blue mb-3">تصویر کارت ملی</p>
          <div
            className={`${Styles.FileInput} pointer px-2 px-lg-3  d-flex justify-content-between align-items-center`}
          >
            {loading.nationalCardImage ? (
              `${loading.nationalCardImage} %`
            ) : (
              <img src={CloudICon} alt="" />
            )}
            <div
              className={`${Styles.textOverFlow} size-4 text-gray-4 ltr pe-2`}
              onClick={() => {
                if (customerIdentity?.nationalCardImage)
                  downloadFileHandler("nationalCardImage");
              }}
            >
              {customerIdentity?.nationalCardImage || "عکس ندارد"}
            </div>
          </div>
        </Col>

        <Col xs={12} sm={6} className="mb-5 mb-md-3 p-0">
          <p className="text-blue mb-3"> ویدیو بارگزاری شده</p>
          <div
            className={`${Styles.FileInput} pointer px-2 px-lg-3 d-flex justify-content-between align-items-center`}
          >
            {loading.video ? (
              `${loading.video} %`
            ) : (
              <img src={CloudICon} alt="" />
            )}
            <div
              className={`${Styles.textOverFlow} size-4 text-gray-4 ltr pe-2`}
              onClick={() => {
                if (customerIdentity?.video) downloadFileHandler("video");
              }}
            >
              {customerIdentity?.video || "ویدیو   ندارد"}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
