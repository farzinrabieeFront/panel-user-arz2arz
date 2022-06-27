import { useEffect, useState } from "react";
import { Badge, Col, Row } from "react-bootstrap";

import { ticketServices } from "../../services";
import { Toastify } from "../../utils";

//components
import { toast } from "react-toastify";
import TicketList from "./components/ticketList/TicketList";
import ChatBox from "./components/chatBox/ChatBox";
import { useLocation, useNavigate } from "react-router-dom";
import { useMainApi } from "../../common/hooks";

const TicketPage = () => {
  let { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [ticketList, setTicketList] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState("");
  const [ticketCount, setTicketCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const { urls, get } = useMainApi();

  useEffect(() => {
    if (state && state.id) {
      setSelectedTicket(state.id);
      navigate("/ticket", { state: {} });
    }
  }, []);

  useEffect(handleGetTicketsList, [pageNumber]);

  async function handleGetTicketsList() {
    try {
      const _params = {
        pageNumber: pageNumber,
        perPage: 12,
      };
      const { data } = await get(urls.Tickets, { _params });
      setTicketList(data.result);
      setTicketCount(data.count);
    } catch (error) {
      Toastify.error(error.message);
    }
  }

  return (
    <div className="d-flex">
      <TicketList
        ticketList={ticketList}
        ticketCount={ticketCount}
        setPageNumber={setPageNumber}
        selectedTicket={selectedTicket}
        setSelectedTicket={setSelectedTicket}
      />
      <ChatBox id={selectedTicket} refreshList={handleGetTicketsList} />
    </div>
  );
};
export default TicketPage;
