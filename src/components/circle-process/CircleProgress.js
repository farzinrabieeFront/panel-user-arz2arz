import "./CircleProgress.css";

const CircleProgress = ({ percent }) => {
    return (
        <div className='sm'>
            <div className="progress-circle" data-progress={percent || 20}></div>
        </div>
    )
}

export default CircleProgress