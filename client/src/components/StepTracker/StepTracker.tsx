import React, { useState } from 'react';
import './StepTracker.scss';
import Step from './Step';
import StepHeader from './StepHeader';

const steps = [
    { title: "Register your account", active: false, completed: true },
    { title: "Complete your wellness assessment", active: false, completed: true },
    { title: "Link your accounts", active: true, completed: false },
    { title: "Schedule your first call", active: false, completed: false }
]

export default function StepTracker() {

    const inProgress = steps.filter(step => step.completed).length;
    const [isCollapseOpen, setIsCollapseOpen] = useState<boolean>(false);

    function collapsePanel(event: any) {
        var content: HTMLElement | null = document.querySelector(".content");
        if (content && content.style && content.style.maxHeight) {
            content.style.maxHeight = "";
            setIsCollapseOpen(false);
        } else if (content) {
            content.style.maxHeight = content.scrollHeight + "px";
            setIsCollapseOpen(true);
        }
    }

    return (
        <div className="custom-container">
            <div className="custom-row">
                <div className="col-custom-sm-12">
                    <div className="step-tracker" style={{ height: window.innerHeight }}>
                        <StepHeader
                            title="Create a plan to meet your short and/or long term investment goals"
                            steps={steps.length}
                            inProgress={!!inProgress}
                            collapsePanel={collapsePanel}
                            isCollapseOpen={isCollapseOpen}
                        />
                        <ul className="content">
                            {
                                steps.map(step => {
                                    return <Step
                                        key={step.title}
                                        title={step.title}
                                        active={step.active}
                                        completed={step.completed}
                                    />
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        /*<ul className="progress-tracker progress-tracker--vertical">
            <li className="progress-step is-complete">
                <div className="progress-marker"></div>
                <div className="progress-text">
                    <h4 className="progress-title">Step 1</h4>
                    Summary text explaining this step to the user
            </div>
            </li>

            <li className="progress-step is-complete">
                <div className="progress-marker"></div>
                <div className="progress-text">
                    <h4 className="progress-title">Step 2</h4>
                    Summary text explaining this step to the user
            </div>
            </li>

            <li className="progress-step is-active" aria-current="step">
                <div className="progress-marker"></div>
                <div className="progress-text">
                    <h4 className="progress-title">Step 3</h4>
                    Summary text explaining this step to the user
            </div>
            </li>

            <li className="progress-step">
                <div className="progress-marker"></div>
                <div className="progress-text">
                    <h4 className="progress-title">Step 4</h4>
                    Summary text explaining this step to the user
            </div>
            </li>

            <li className="progress-step">
                <div className="progress-marker"></div>
                <div className="progress-text">
                    <h4 className="progress-title">Step 5</h4>
                    Summary text explaining this step to the user
            </div>
            </li>
        </ul>*/
    )
}