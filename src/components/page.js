import {useFieldArray, useForm} from "react-hook-form";
import {FairyMediaType, LocalStorageKey} from "./types";
import {yupResolver} from "@hookform/resolvers/yup";
import {useCallbackOne} from "use-memo-one";
import {getSchema} from "./configs";
import { Controller } from "react-hook-form";
import {useMemo} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {Icon, Label, RemoveContainer, TimeRangeContainer} from "./styles";
import {Button, Space, TimePicker} from "antd";
import moment from "moment";


const HourMinuteFormat = "HH:mm";
const MonthDayYearFormat = "MMM-DD-YYYY";


const Page = () => {
    const getStoreObjectData = (key) => {
        const jsonValue = localStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    };

    const { control, handleSubmit, watch, reset, setValue, getValues, register, formState: { isValid, errors, isDirty } } = useForm({
        mode: "onChange",
        resolver: yupResolver(getSchema())
    });

    const isDisabledDate = useCallbackOne((current) => {
        if (current) {
            return current < moment().startOf("day");
        }
        return true;
    }, []);

    const watchAllFields = watch();

    const { fields, append, remove } = useFieldArray({
        name: "time",
        control
    });

    const addNewTime = useCallbackOne(() => {
        append([...fields, []]);
    }, []);

    return (
        <div>
            <Controller
                name={ "date" }
                control={ control }
                render={
                    ({ field }) => (
                            <Space direction={ "vertical" }>
                                <TimePicker.RangePicker
                                    { ...field }
                                    format={ MonthDayYearFormat }
                                    disabledDate={ isDisabledDate }
                                    allowClear={ false }
                                />
                            </Space>
                    )
                }
            />
            { fields.length >= 1 && (
                <Label>
                    { "tLabelTime" }
                </Label>
            )}
            { fields.map((item, index) => (
                <TimeRangeContainer
                    key={ index }
                >
                    <Controller
                        name={ `time.${index}` }
                        control={ control }
                        render={
                            ({ field }) => (
                                    <Space
                                        direction={ "vertical" }
                                    >
                                        <TimePicker.RangePicker
                                            { ...field }
                                            format={ HourMinuteFormat }
                                            autoFocus={ true }
                                            allowClear={ true }
                                            defaultValue={
                                                [
                                                    item[0],
                                                    item[1]
                                                ]
                                            }
                                        />
                                    </Space>
                            )
                        }
                    />
                    <RemoveContainer>
                        <Icon
                            onClick={ () => remove(index) }
                        />
                    </RemoveContainer>
                </TimeRangeContainer>
            ))
            }
            <Button
                type={ "default" }
                onClick={ addNewTime }
                icon={
                    <PlusOutlined />
                }
            >
                { "tLabelTimePeriod" }
            </Button>
        </div>
    );
};

export {Page};
