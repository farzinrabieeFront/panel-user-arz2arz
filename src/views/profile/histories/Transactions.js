import Styles from './Transactions.module.scss'
import { Col, Row } from "react-bootstrap";
import Tabs from '../../../common/element/tabs/Tabs';
import TriangleTitle from '../../../components/triangle-title/TriangleTitle';
import FiatDepositHistory from './components/FiatDepositHistory';
import FiatWithdrawHistory from './components/FiatWithdrawHistory';
import SpotDepositHistory from './components/SpotDepositHistory';
import SpotWithdrawHistory from './components/SpotWithdrawHistory';

const Transactions = ({ params }) => {
    function tableSwitch() {
        switch (params.type) {
            case 'deposit-fiat':
                return <FiatDepositHistory />
            case 'spot-deposit':
                return <SpotDepositHistory />
            case 'fiat-withdraw':
                return <FiatWithdrawHistory />
            case 'spot-withdraw':
                return <SpotWithdrawHistory />
            default:
                return <FiatDepositHistory />
        }
    }


    return (
        <div className={`${Styles.tableWrapper} wrapper`}>
            <TriangleTitle className="mt-1">
                <h2 className="text-gray-4 size-3 fw-500 mb-0">تاریخچه تراکنش‌ها</h2>
            </TriangleTitle>
            <Row className="justify-content-between align-items-end mb-3" >
                <Col lg={6} md={12} className="my-3 my-lg-0">
                    <Tabs data={[
                        { to: "/my/wallet/history/deposit-fiat", title: "واریز تومانی" },
                        { to: "/my/wallet/history/deposit-spot", title: "واریز ارزی" },
                        { to: "/my/wallet/history/withdraw-fiat", title: "برداشت تومانی" },
                        { to: "/my/wallet/history/withdraw-spot", title: "برداشت ارزی" }
                    ]} />
                </Col>

                {tableSwitch()}
            </Row>
        </div>
    )
}

export default Transactions