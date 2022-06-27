/** internal imports */
import { useEffect, useState } from "react";
import Styles from "./BalanceAssetsChart.module.scss";
import { Toastify } from "../../../../utils";
import { useMainApi } from "../../../../common/hooks";
/** external imports */
import { Col, Row } from "react-bootstrap";
/** component imports */
import { MyResponsivePie } from "./MyResponsivePie";
import TriangleTitle from "../../../../components/triangle-title/TriangleTitle";

const colors = ["#53A5E1", "#ED5254", "#26AB6D", "#F0B90B", "#00BABA"];

export default function BalanceAssetsChart({ balance }) {
  const [donutData, setDonutData] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  const { urls, get } = useMainApi();

  // useEffect(getDonutApi, []);
  useEffect(() => {
    let array = [];
    donutData.forEach((itm, ind) => {
      array.push({
        id: itm?.symbol,
        label: itm?.symbol,
        value: itm.amount,
        color: colors[ind],
      });
    });
    setDataChart(array);
  }, [donutData]);

  useEffect(() => {
    let sum = 0;
    dataChart.forEach((itm, ind) => {
      sum += itm?.value;
    });

    if (sum === 0 || !dataChart.length) {
      setDataChart([
        {
          // id: "noData",
          label: "noData",
          value: 100,
          noValue: true,
          color: "#afb7cb",
        },
      ]);
    }
  }, [dataChart]);

  async function getDonutApi() {
    try {
      const res = await get(urls.PercentageSpots);
      setDonutData(res.result);
    } catch (error) {
      Toastify.error(error.message);
    }
  }

  return (
    <div className="wrapper p-3 h-100">
      <Row className="align-items-end flex-row-reverse">
        <Col xs={12} className="">
          <TriangleTitle>
            <h2 className="text-gray-4 mb-0 fw-500 size-4">
              پراکندگی دارایی‌ها
            </h2>
          </TriangleTitle>
        </Col>

        <Col
          sm={8}
          xs={12}
          className="d-flex justify-content-center p-0 mb-4 mb-lg-0"
        >
          <div style={{ height: "234px", width: "280px" }}>
            <MyResponsivePie data={dataChart} />
          </div>
        </Col>

        <Col
          sm={4}
          xs={12}
          className="d-flex flex-column p-0  align-items-center"
        >
          <ul className={`${Styles.legendBar}  ps-3 pe-2 mb-0 `}>
            {dataChart.map((item, index) => {
              return (
                <li className="w-100 en flex-row-reverse d-flex justify-content-between align-items-center text-gray-4 size-5 fw-500 mb-3">
                  <span className="en d-flex flex-row-reverse align-items-center ">
                    {item?.noValue ? null : (
                      <>
                        <i
                          style={{
                            backgroundColor: colors[index],
                          }}
                          className={Styles.circle}
                        ></i>{" "}
                        {item?.label}{" "}
                      </>
                    )}
                  </span>
                  <span>
                    {item?.noValue
                      ? ""
                      : `${item?.value && "%"} ${item?.value}`}

                    {/*{item?.value && "%"} {item?.value}{" "}*/}
                  </span>
                </li>
              );
            })}
          </ul>
        </Col>
      </Row>
    </div>
  );
}
