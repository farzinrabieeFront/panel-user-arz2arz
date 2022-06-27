import classNames from 'classnames';
import { VscTriangleLeft } from 'react-icons/all';

export default function TriangleTitle({ children, className }){
    const classes = classNames('d-flex', ' align-items-center','fw-500', className)
    const iconClasses = classNames('text-blue', 'ms-1')

    return (
        <div className={classes}>
            <VscTriangleLeft className={iconClasses} />
            {children}
        </div>
    )
};