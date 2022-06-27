/** internal import */
import { memo, useState } from "react";
import Styles from "./SpotOrders.module.scss";
import { useOrder } from "../../../../context/OrderServises";
import { Toastify } from "../../../../utils";
import { useCoreApi } from "../../../../common/hooks";
/** external import */
import { BsCheck, HiArrowNarrowLeft, BsCheckAll, BsX } from "react-icons/all";
/** component import */
import TableElement from "../../../../common/element/table/Table";
import ConfirmModal from "../../../../components/confirm-modal/ConfirmModal";

import NewTable, {
  StatusBadge,
  TableAccordion,
  TableRow,
  TableCell,
} from "../../../../common/element/new-table/NewTable";




const OpenOrders = () => {
  const { openOrders } = useOrder();
  const { urls, post, loading } = useCoreApi();
  const [canceledOrder, setCanceledOrder] = useState();

  async function closeOrderHandler(vals) {
    try {
      const _body = {
        marketId: vals,
      };
      const { message } = await post(urls.CloseLimitOrder, _body);

      Toastify.success(message);
      setCanceledOrder();
    } catch (error) {
      Toastify.error(error.message);
    }
  }

  return [
    <TableElement
      responsive
      striped
      loading={loading}
      header={[
        <th>جفت ارز</th>,
        <th>تاریخ سفارش‌</th>,
        <th>نوع</th>,
        <th>مقدار پرداختی</th>,
        <th>قیمت </th>,
        <th>وضعیت</th>,
        <th>عملیات</th>,
      ]}
      totalRecords={openOrders.length}
      pageLimit={openOrders.length}
    >
      {openOrders.map((item, index) => {
        return (
          <tr key={index} className={`${Styles.trTable} pointer`}>
            <td>
              <span className="d-flex align-items-center">
                <span className="en text-gray-4">{item.baseAsset}</span>
                <HiArrowNarrowLeft className="text-gray-1 mx-1" size={14} />
                <span className="en text-gray-4">{item.quoteAsset}</span>
              </span>
            </td>
            <td>
              <span className="text-gray-4">1400/10/23 20:20</span>
            </td>
            <td>
              <span className="text-gray-4">
                اتوماتیک <span className="en">(Limit)</span>
              </span>
            </td>
            <td className="ltr">
              <span className="text-gray-4">{item.baseAmount}</span>{" "}
              {item.baseAsset}
            </td>
            <td>
              <span className="text-gray-4">
                {Number(item.firstPrice || 0).toLocaleString()}
              </span>
            </td>

            <td>
              {/* <StatusBadge badgeClassName="d-none" status={item.status} /> */}
            </td>
            <td>
              <span
                className="pointer"
                // onClick={() => closeOrderHandler(item.marketId)}
                onClick={() => setCanceledOrder(item)}
              >
                <BsX size={20} className="ms-1" />
                لغو سفارش
              </span>
            </td>
          </tr>
        );
      })}
    </TableElement>,
    canceledOrder ? (
      <ConfirmModal
        show={canceledOrder}
        onHide={() => setCanceledOrder()}
        onConfirm={() => closeOrderHandler(canceledOrder?.marketId)}
      >
        <span className="text-gray-3 size-4">
          آیا از لغو سفارش تبدیل اتوماتیک
          <span className="px-2 fw-500 text-gray-4 size-4">
            {canceledOrder?.baseAsset} به {canceledOrder?.quoteAsset}
          </span>
          اطمینان دارید؟
        </span>
      </ConfirmModal>
    ) : null,
  ];
};

export default memo(OpenOrders);
