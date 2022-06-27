import TriangleTitle from "../../../components/triangle-title/TriangleTitle";
import SpotHistory from "./spot/MarketOrderHistory";
import MarketOrderHistory from "../histories/components/FiatOrderHistory";
import FiatOrderHistory from "../histories/components/FiatOrderHistory";

const Orders = ({ params }) => {


    const _order_types = {
        'fiat-deposit': {
            title: " تاریخچه خرید و فروش ارز",
            table: <FiatOrderHistory />
        },
        'spot-orders': {
            title: "",
            table: <SpotHistory />
        }
    }

    // function tableSwitch() {
    //     switch (params.type) {
    //         case 'deposit-fiat':
    //             return <MarketOrderHistory />
    //         case 'spot-orders':
    //             return <SpotHistory />
    //         default:
    //             return <MarketOrderHistory />
    //     }
    // }


    return (
        <div className="wrapper h-100">
            <TriangleTitle>
                <h2 className="text-gray-4 size-3 fw-500 mb-0">
                    {_order_types[params.type].title}
                </h2>
            </TriangleTitle>

            {/* {tableSwitch()} */}
            {_order_types[params.type].table}
        </div>
    );
};

export default Orders;
