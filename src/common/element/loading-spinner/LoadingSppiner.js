import Styles from './LoadingSpinner.module.scss';
import classNames from 'classnames';

export default function Loadingsppiner({ percent }) {

    return (
        <div className={Styles.circular}>
            <div className={Styles.inner}></div>
            <div className={Styles.number}>{percent}%</div>
            <div className={Styles.circle}>
                <div className={classNames(Styles.bar, Styles.left)}>
                    <div className="progress"></div>
                </div >
                <div className={classNames(Styles.bar, Styles.right)}>
                    <div className="progress" ></div >
                </div >
            </div >
        </div >
    )
}

