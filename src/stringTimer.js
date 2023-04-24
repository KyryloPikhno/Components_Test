import moment from "moment/moment";

const HourMinuteSecondsFormat = "HH:mm:ss";


export const stringTimer = (timer, to) => {
    const confirmationCodeTime = moment(to);
    const currentTime = moment(new Date());
    const diff = moment(confirmationCodeTime.diff(currentTime));

    if (currentTime >= confirmationCodeTime) {
        clearInterval(timer.current);
    } else {
        const length = 2;
        const duration = moment.duration(diff.format(HourMinuteSecondsFormat));
        const minutes = duration.minutes().toString().padStart(length, "0");
        const seconds = duration.seconds().toString().padStart(length, "0");
        timer.current = `${minutes}:${seconds}`;
    }

    if (timer.current === "00:00") {
        timer.current = null;
    }

    return {}
};
