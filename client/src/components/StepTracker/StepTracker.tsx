import React, { useState, Fragment } from 'react';
import './StepTracker.scss';
import Step from './Step';
import StepHeader from './StepHeader';

const stepsList = [
    { title: "Register your account", active: true, completed: false },
    { title: "Complete your wellness assessment", active: false, completed: false },
    { title: "Link your accounts", active: false, completed: false },
    { title: "Schedule your first call", active: false, completed: false }
]

export default function StepTracker() {

    const [isCollapseOpen, setIsCollapseOpen] = useState<boolean>(false);
    const [steps, updateSteps] = useState(stepsList);

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

    function completeTask(index: number) {
        const updatedSteps = [...steps];
        updatedSteps[index] = { ...updatedSteps[index], active: false, completed: true };
        if (updatedSteps[index + 1]) {
            updatedSteps[index + 1] = { ...updatedSteps[index + 1], active: true, completed: false };
        }
        updateSteps(updatedSteps);
    }

    const inProgress = steps.filter(step => step.completed).length !== steps.length;

    return (
        <div className="custom-container">
            <div className="custom-row">
                <div className="col-custom-sm-12 col-custom-xs-12">
                    <div className="step-tracker sm-none" style={{ minHeight: window.innerHeight }}>
                        <StepHeader
                            title="Create a plan to meet your short and/or long term investment goals"
                            steps={steps.length}
                            inProgress={!!inProgress}
                            collapsePanel={collapsePanel}
                            isCollapseOpen={isCollapseOpen}
                        />
                        <ul className="content">
                            {
                                steps.map((step, i) => {
                                    return <Step
                                        key={step.title}
                                        title={step.title}
                                        active={step.active}
                                        completed={step.completed}
                                        completeTask={() => completeTask(i)}
                                    />
                                })
                            }
                        </ul>
                    </div>
                    <div className="md-none res-tracker" style={{ minHeight: window.innerHeight }}>
                        <ul className="list-style-none">
                            {steps.map(step => {
                                return <li>
                                    <div className={`step-marker ${step.active ? 'active' : ''} ${step.completed ? 'completed' : ''}`}></div>
                                    <div style={{ minWidth: 50 }}></div>
                                </li>
                            })}
                        </ul>
                        <div>
                            {
                                steps.map((step, i) => {
                                    return (
                                        step.active ? <Fragment>
                                            <p>{step.title}</p>
                                            <button onClick={() => completeTask(i)} className="task-button">Complete Task</button>
                                        </Fragment> : null
                                    )
                                })
                            }
                            {
                                !inProgress ? <p>All tasks completed successfully</p> : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}