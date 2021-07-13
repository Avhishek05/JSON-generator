import React, { useState } from "react";
import "./App.scss"
import { JSONGeneratorComponent } from "./jsonGenerator";
import GitHubIcon from '@material-ui/icons/GitHub';

const App = () => {
    const [step, setStep] = useState(0)
    return (
        <div>
            <div style={{ height: 50, display: 'flex', justifyContent: 'flex-end' }} onClick={() => window.open('https://github.com/Avhishek05/json-generator', '_target')}>
                <span style={{ fontSize: 20, alignSelf: 'center', marginRight: 10, }}>Gitub</span>
                <GitHubIcon style={{ fontSize: 24, alignSelf: 'center' }} />
            </div>
            <div className='center' style={{ textAlign: 'center' }}>
                {
                    step === 0 &&
                    <div>
                        <button onClick={() => setStep(1)} className={'btn'} style={{ width: 450 }}> Generate JSON for your
                            Components
                        </button>
                        {/*<div>*/}
                        {/*    <button className={'btn'} style={{width: 200}}>How It Works</button>*/}
                        {/*</div>*/}
                        {/*<div>*/}
                        {/*    <button className={'btn'} style={{width: 200}}>Try Now</button>*/}
                        {/*</div>*/}
                    </div>
                }
                {
                    step === 1 &&
                    <JSONGeneratorComponent />
                }


            </div>
        </div>
    )
}

export default App;