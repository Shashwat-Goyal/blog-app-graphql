import React from 'react';
import './StepTracker.scss';
import Step from './Step';

interface Props {
    title: string;
    steps: number;
    inProgress: boolean;
}

export default function StepHeader(props: Props) {
    const { title = "", steps = 0, inProgress = false } = props;
    return (
        <div className={`step-card step-header ${inProgress ? 'in-progress' : ''}`}>
            <span className="header-circle">

            </span>
            <div style={{ display: "inline-block" }}>
                <p>{title}</p>
                <p>{steps} steps</p>
            </div>
        </div>
    )
}