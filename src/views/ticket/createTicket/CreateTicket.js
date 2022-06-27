import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import CustomizedButton from "../../../components/form/button/Button";
import TriangleTitle from "../../../components/triangle-title/TriangleTitle";
import Wrapper from "../../../components/wrapper/Wrapper";
import CommonQue from "./components/commonQue/CommonQue";
import SelectSub from "./components/selectSub/SelectSub";
import ConfirmTicket from "./components/confirmTicket/ConfirmTicket";
import { IoIosArrowBack } from "react-icons/all";
import { Toastify } from "../../../utils";
import { ticketServices } from "../../../services";
import useMainApi from "../../../common/hooks/useMainApi";

const CreateTicket = () => {
    const [confirm, setConfirm] = useState(false);
    const [subject, setSubject] = useState({});
    const [searchQue, setSearchQue] = useState("");
    const [queList, setQueList] = useState([]);
    const navigate = useNavigate();
    const { urls, baseUrl, get } = useMainApi()
    useEffect(questionList, [searchQue]);

    async function questionList() {
        try {
            const _params = {
                pageNumber: 1,
                perPage: 6,
            };
            if (searchQue) _params.question = searchQue
            const _baseUrl = _baseUrl.replace('/customer', '')
            const res = await get(urls.CommonQuestions, { _params, _baseUrl });
            setQueList(res.data.result);
            console.log(res.data.result);
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    return (
        <Wrapper>
            <div className="d-flex justify-content-between">
                <TriangleTitle>
                    <h2 className="text-gray-4 size-3 fw-500 mb-0">ثبت تیکت جدید</h2>
                </TriangleTitle>
                <CustomizedButton
                    leftIcon={<IoIosArrowBack size={14} />}
                    onClick={() => (!confirm ? navigate("/ticket") : setConfirm(false))}
                    className="size-5 fw-400 text-gray-4"
                    variant=""
                >
                    بازگشت
                </CustomizedButton>
            </div>

            <Row className="mt-4">
                <Col xs="7" className="pl-6">
                    {!confirm ? (
                        <SelectSub subject={subject} setSubject={setSubject} />
                    ) : (
                        <ConfirmTicket subject={subject} />
                    )}
                    {!confirm ? (
                        <CustomizedButton
                            leftIcon={<IoIosArrowBack size={20} />}
                            onClick={() => setConfirm(true)}
                            className={`w-100 size-2 fw-700 line-height-normal mt-4`}
                            variant="blue"
                            disabled={!subject._id}
                        >
                            مرحله بعد
                        </CustomizedButton>
                    ) : null}
                </Col>
                <Col xs="5">
                    <CommonQue
                        searchQue={searchQue}
                        setSearchQue={setSearchQue}
                        queList={queList}
                    />
                </Col>
            </Row>
        </Wrapper>
    );
};

export default CreateTicket;
