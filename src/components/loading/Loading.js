import { useEffect, useState } from "react";
import Styles from "./Loading.module.scss";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import LottiFile from "../../assets/lottieFiles/arz2arz_loding2.json"
const Loading = () => {
    const [mobileSize, setMobileSize] = useState(false)
    const [mQuery, setMQuery] = useState({
        matches: window.innerWidth > 768 ? true : false,
    });
    useEffect(() => {
        if (mQuery.matches) {
            setMobileSize(false)
        } else {
            setMobileSize(true)
        }
    }, []);

    return (
        <div className={`${Styles.bgLoader} d-flex justify-content-center align-items-center`}>
            <Player
                speed="1.5"
                autoplay
                loop
                src={LottiFile}
                // src="https://assets2.lottiefiles.com/packages/lf20_w9l0xorf.json"
                style={{ height: "100vh", width: `${mobileSize ? '30%' : '15%'}` }}
            >
                <Controls visible={false} />
            </Player>
        </div>
    );
};
export default Loading;
