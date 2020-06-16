import React from 'react';
import './StepTracker.scss';
import Step from './Step';

interface Props {
    title: string;
    steps: number;
    inProgress: boolean;
    collapsePanel: any;
    isCollapseOpen: boolean;
}

export default function StepHeader(props: Props) {

    const { title = "", steps = 0, inProgress = false, isCollapseOpen = false } = props;
    return (
        <div className={`step-card step-header ${inProgress ? 'in-progress' : ''}`}>
            <span className="header-circle">

            </span>
            <div style={{ display: "inline-block" }}>
                <p>{title}</p>
                <p onClick={props.collapsePanel} className="cursor-pointer">{steps} steps <i className={`toggle-icon fa fa-chevron-${isCollapseOpen ? 'up' : 'down'}`} aria-hidden="true"></i></p>
            </div>
        </div>
    )
}