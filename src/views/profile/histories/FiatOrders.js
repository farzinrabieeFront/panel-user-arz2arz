import TriangleTitle from "../../../components/triangle-title/TriangleTitle";
import FiatOrderHistory from "./components/FiatOrderHistory";

const FiatOrders = () => {
    return (
        <div className="wrapper h-100">
            <TriangleTitle>
                <h2 className="text-gray-4 size-3 fw-500 mb-0">
                    تاریخچه خرید و فروش ارز
                </h2>
            </TriangleTitle>

            <FiatOrderHistory />
        </div>
    );
}

export default FiatOrders;
