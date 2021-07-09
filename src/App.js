import React, {useState} from "react";
import "./App.scss"
import {JSONGeneratorComponent} from "./jsonGenerator";

const App = () => {
    const [step, setStep] = useState(0)
    return (
        <div style={{textAlign: 'center'}}>
            {
                step === 0 &&
                <div>
                    <button onClick={() => setStep(1)} className={'btn'} style={{width: 450}}> Generate JSON for your
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
                <JSONGeneratorComponent/>
            }


        </div>
    )
}

export default App;