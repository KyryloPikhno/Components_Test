import {useRef, useState} from "react";


const HourMinuteSecondsFormat = "HH:mm:ss";

export const stringTimer = (timer, to) => {
    // const countdown = useRef(null);
    //
    // const [timeToSendCode, setTimeToSendCode] = useState(null);
    //
    // const timerInterval = useRef();
    //
    // const startTimer = useCallbackOne(() => {
    //     timerInterval.current = setInterval(() => {
    //         if (timeToSendCode !== null) {
    //             // stringTimer(countdown, timeToSendCode);
    //             const confirmationCodeTime = moment(timeToSendCode);
    //             const currentTime = moment(new Date());
    //             const diff = moment(confirmationCodeTime.diff(currentTime));
    //
    //             if (currentTime >= confirmationCodeTime) {
    //                 clearInterval(countdown.current);
    //             } else {
    //                 const length = 2;
    //                 const duration = moment.duration(diff.format(HourMinuteSecondsFormat));
    //                 const minutes = duration.minutes().toString().padStart(length, "0");
    //                 const seconds = duration.seconds().toString().padStart(length, "0");
    //                 countdown.current = `${minutes}:${seconds}`;
    //                 console.log(`countdown.current: ${countdown.current}`);
    //             }
    //
    //             if (countdown.current === "00:00") {
    //                 countdown.current = null;
    //             }
    //         }
    //     }, 1000);
    // }, [timeToSendCode, timerInterval]);
    //
    // useEffect(() => {
    //     startTimer();
    //
    //     return () => {
    //         if (timerInterval.current) {
    //             clearInterval(timerInterval.current);
    //         }
    //     };
    // }, [timeToSendCode, timerInterval, countdown]);
    //
    // const currentDate = new Date();
    // const currentTime = currentDate.getTime();
    // const futureTime = currentTime + (5 * 60 * 1000);
    // const futureDate = new Date(futureTime);
    // const formattedDate = futureDate.toISOString();
    //
    // useEffect(() => {
    //     if (timeToSendCode) {
    //         const timeToSendCodeMoment = moment(timeToSendCode);
    //         console.log(moment.duration(timeToSendCodeMoment.format(HourMinuteSecondsFormat)));
    //     }
    // }, [timeToSendCode]);
    //

    return (
        <div>
            {/*{countdown.current && <div>{countdown.current}</div>}*/}
            {/*<button onClick={() => setTimeToSendCode(moment(formattedDate).format())}>Get timeToSendCode</button>*/}
        </div>
    );
};


