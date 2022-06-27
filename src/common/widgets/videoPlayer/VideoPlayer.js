import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/all";
import TipsImg from "../../../assets/images/tips.jpg";

import Styles from "./VideoPlayer.module.scss";

export default function VideoPlayer({ type, src }) {
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    setPlayVideo(false);
  }, [type]);

  return (
    <>
      <div className={`${Styles.video} mb-4`}>
        {!playVideo ? (
          <>
            <img className={Styles.img} src={TipsImg} />
            <span
              className={`${Styles.play} center-content pointer`}
              onClick={() => setPlayVideo(true)}
            >
              <FaPlay size={20} />
            </span>
          </>
        ) : (
          <video className={Styles.video} controls autoPlay>
            <source src={src} type="video/mp4" />
            Your browser does not support the video player.
          </video>
        )}
      </div>
    </>
  );
}
