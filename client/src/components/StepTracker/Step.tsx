import React from 'react';

interface Props {
    key: string | number;
    title: string;
    active: boolean;
    completed?: boolean;
    showActive?: boolean;
    completeTask: any;
}

export default function Step(props: Props) {
    const { title = "", active = false, completed = false, showActive = false } = props;
    return (
        <li className={`step-card step-progress ${active ? 'active' : ''} ${completed ? 'completed' : ''}`}>
            <div className="step-marker">

            </div>
            <div className="step-description">
                <p>{title}</p>
                {active ? <button onClick={props.completeTask} className="task-button">Complete Task</button> : null}
            </div>
        </li>
    )
}