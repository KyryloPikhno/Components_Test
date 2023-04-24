import { useCallbackOne } from "use-memo-one";
import {useEffect, useRef, useState} from "react";
import {stringTimer} from "./stringTimer";


function App() {
    const countdown = useRef(null);
    const [timeToSendCode, setTimeToSendCode] = useState(null);

    const timerInterval = useRef();

    const startTimer = useCallbackOne(() => {
        timerInterval.current = setInterval(() => {
            if (timeToSendCode !== null) {
                stringTimer(countdown, timeToSendCode);
            }
        }, 1000);
    }, [timeToSendCode, timerInterval]);

    useEffect(() => {
        startTimer();

        return () => {
            if (timerInterval.current) {
                clearInterval(timerInterval.current);
            }
        };
    }, [timeToSendCode, timerInterval]);

    {/*setTimeToSendCode(moment(newConfirmationCodeAfter).format());*/}
    return (
        <div>


        </div>
    );
}


export default App;
