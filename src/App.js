import { useCallbackOne } from "use-memo-one";
import {useEffect, useRef, useState} from "react";
import {stringTimer} from "./stringTimer";
import moment from "moment/moment";

const HourMinuteSecondsFormat = "HH:mm:ss";

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


    const currentDate = new Date();

    // Получить текущее время в миллисекундах
    const currentTime = currentDate.getTime();

    // Добавить 5 минут в миллисекундах (1 минута = 60 000 миллисекунд)
    const futureTime = currentTime + (5 * 60 * 1000);

    // Создать новый объект Date, используя будущее время в миллисекундах
    const futureDate = new Date(futureTime);

    // Сформировать строку в нужном формате
    const formattedDate = futureDate.toISOString();

    // Вывести результат в консоль
    useEffect(() => {
        // console.log(timeToSendCode);
        // setTimeToSendCode(moment(formattedDate).format())
        if (timeToSendCode) {
            const timeToSendCodeMoment = moment(timeToSendCode);
            console.log(moment.duration(timeToSendCodeMoment.format(HourMinuteSecondsFormat)));
        }
    }, [timeToSendCode]);
    return (
        <div>

        <button onClick={()=> setTimeToSendCode(moment(formattedDate).format())}>Get timeToSendCode</button>
        </div>
    );
}


export default App;
