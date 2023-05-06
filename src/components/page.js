import {useEffect, useMemo, useState} from "react";
import {useCallbackOne} from "use-memo-one";
import {yupResolver} from "@hookform/resolvers/yup";
import {getSchema} from "./configs";
import {FairyMediaType, LocalStorageKey, NamesFormSecondStep} from "./types";
import { useForm, useFieldArray } from "react-hook-form";


const getStoreObjectData = (key) => {
    const jsonValue = localStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null
};

const FairyStepSecondPage = (props) => {
    console.log("FairyNonTargetPage init");
    const { goBackPage, goNextPage } = props; // func

    const [isLoadingFile, setIsLoadingFile] = useState(false);
    const [isShowSubmit, setIsShowSubmit] = useState(true);
    const [fileList, setFileList] = useState([]);

    // const geolocation = useMemoOne(() => createTreeSelectData(homeState.appSettings.location), [homeState.appSettings.location]);

    useEffect(() => {
        initFormValue();
    }, []);

    const optionsStepFirst = useMemo(() => {
        return getStoreObjectData(LocalStorageKey.FAIRY_CREATE).data.STEP1;
    }, []);

    const { control, handleSubmit, watch, reset, setValue, getValues, register, formState: { isValid, errors, isDirty } } = useForm({
        mode: "onChange",
        resolver: yupResolver(getSchema(optionsStepFirst.mediaType === FairyMediaType.VIDEO.toUpperCase()))
    });

    const watchAllFields = watch();

    const { fields, append, remove } = useFieldArray({
        name: "time",
        control
    });

    const initFormValue = useCallbackOne(() => {
        const initValues = getStoreObjectData(LocalStorageKey.FAIRY_CREATE)?.data?.STEP2;
        setValue(NamesFormSecondStep.DATA,initValues?.date ? [moment(initValues.date[0]), moment(initValues.date[1])] : null);
        setValue(NamesFormSecondStep.MIN_REQUIREMENTS_SUBSCRIBERS, Number(initValues?.minRequirementsSubscribers) || null);
        setValue(NamesFormSecondStep.MIN_PARTICIPANT_COUNT, Number(initValues?.minParticipantCount) || null);
        setValue(NamesFormSecondStep.MINIMUM_AGE, Number(initValues?.minimumAge) || null);
        setValue(NamesFormSecondStep.DESCRIPTION, initValues?.description || null);
        setValue(NamesFormSecondStep.CLICK_URL, initValues?.clickUrl || null);
        setValue(NamesFormSecondStep.LOCATIONS, initValues?.locations || []);
        setValue(NamesFormSecondStep.MEDIA, initValues?.media || null);

        if (initValues?.media?.file) {
            setFileList([initValues.media.file]);
        }
    }, []);

    const onSubmit = useCallbackOne<any>(() => {
        goNextPage();
    }, []);

    const onRemoveFile = useCallbackOne((item) => {
        setFileList(fileList.filter((el) => el.uid !== item.uid));
        setValue(NamesFormSecondStep.MEDIA, null);
    }, []);

    const isDisabledDate = useCallbackOne((current) => {
        if (current) {
            return current < moment().startOf(Day);
        }
        return true;
    }, []);

    const onChangeUploadFile = useCallbackOne(async ({ file, fileList }) => {
        const formData = new FormData();
        const { size, type } = file;

        if (!file || !fileList.length) {
            setFileList([]);
            return;
        }

        if (size >= Size.MAX_SIZE) {
            message.error("tValidUploadFileMaxSize");
        } else if (type === TypeFiles.GIF || type === TypeFiles.JPEG || type === TypeFiles.PNG) {
            formData.append(Data.FILE, file, file.name);
            formData.append(Data.TYPE, optionsStepFirst.mediaType);
            try {
                setIsLoadingFile(true);
                const response = await send(UPLOAD_MEDIA_FILE, formData);
                if (response) {
                    const { id } = response;
                    response.name = file.name;
                    setValue(NamesFormSecondStep.MEDIA, { id, file: { ...response } });
                    setFileList([response]);
                }
            } catch (e) {
                console.log(e);
                message.error(e.title || "барада upload media");
            } finally {
                setIsLoadingFile(false);
            }
        } else {
            message.error(tValidUploadFileType);
        }
    }, [fileList]);

    const addNewTime = useCallbackOne(() => {
        append([...fields, []]);
    }, []);

    const setTimes = useCallbackOne((localStorageTime) => {
        const hasNull = localStorageTime && localStorageTime.some((el) => el == null) || null;

        if (hasNull) {
            const validTime = localStorageTime.filter((el) => Array.isArray(el)) || [];
            if (validTime.length > 0) {
                const validMomentTime = validTime.map((el) => [moment(el[0]), moment(el[1])]);
                setValue("time", validMomentTime);
            } else {
                append([]);
            }
        } else if (!localStorageTime) {
            append([]);
        } else {
            const localStorageMomentTime = localStorageTime.map((el) => [moment(el[0]), moment(el[1])]);
            reset({ ...getValues(), "time": localStorageMomentTime });
        }
    }, []);

    const setStoreData = useCallbackOne(watchAllFields => {
        const fairyCreateData = getStoreObjectData(LocalStorageKey.FAIRY_CREATE);
        const allFiles = watchAllFields;
        let dateFrom = null;
        let dateTo = null;

        if (allFiles.date) {
            dateFrom = allFiles.date[Symbols.SYMBOL_0];
            dateTo = allFiles.date[Symbols.SYMBOL_1];
        }

        if (allFiles.location?.length > 0) {
            // allFiles.geolocation = setLocation(allFiles.location, geolocation);
        } else {
            allFiles.geolocation = null;
        }

        if (allFiles.minimumAge != null) {
            allFiles.minimumAge = Number(allFiles.minimumAge);
        }

        if (allFiles.minRequirementsSubscribers != null) {
            allFiles.minRequirementsSubscribers = Number(allFiles.minRequirementsSubscribers);
        }

        const localStorageTime = (fairyCreateData.data.STEP2)?.time;

        if (allFiles?.time == null) {
            setTimes(localStorageTime);
        } else {
            const convertedTimeToString = allFiles.time.map((el) => {
                if (el != null) {
                    return [el[0].toISOString(), el[1].toISOString()];
                }
            });
            if (localStorageTime != null && !_.isEqual(convertedTimeToString, localStorageTime)) {
                const timePickerNullIndex = allFiles.time.findIndex((el) => el == null);
                const localStorageTimeNullIndex = localStorageTime.findIndex((el) => el == null);
                if (timePickerNullIndex !== localStorageTimeNullIndex || timePickerNullIndex === Symbols.INDEX_NOT_FOUND) {
                    reset({ ...getValues(), "time": allFiles.time });
                }
            }
        }
        setStoreObjectData(LocalStorageKey.FAIRY_CREATE, {
            stepInfo: { ...fairyCreateData.stepInfo },
            data: {
                ...fairyCreateData.data,
                [StepsEnum.STEP2]: {
                    ...fairyCreateData.data.STEP2,
                    ...allFiles,
                    dateFrom,
                    dateTo
                }
            }
        });
    }, [watchAllFields]);

    useEffect(() => {
        if (_.isEmpty(errors)) {
            setStoreData(watchAllFields);
        }
        setIsShowSubmit(watchAllFields.media != null && watchAllFields.clickUrl != null && _.isEmpty(errors));
    }, [watchAllFields, errors]);

    useEffect(() => {
        if (!errors.clickUrl && watchAllFields.clickUrl && optionsStepFirst.mediaType === FairyMediaType.VIDEO.toUpperCase()) {
            const data = getStoreObjectData(LocalStorageKey.FAIRY_CREATE)?.data?.STEP2 || null;

            if (data.media == null) {
                addMediaId();
            }
        }
    }, [errors.clickUrl, watchAllFields.clickUrl]);

    const addMediaId = useCallbackOne(async () => {
        try {
            const response = await send(UPLOAD_MEDIA_VIDEO, { url: watchAllFields.clickUrl });
            if (response) {
                setValue(NamesFormSecondStep.MEDIA, { id: response.id });
            }
        } catch (e) {
            console.log(e);
            message.error(e.title || "барада upload media");
        }
    }, [watchAllFields.clickUrl]);

    // const onConfirm = useCallbackOne(() => {
    //     Modal.confirm({
    //         title: tAttention,
    //         icon: <ExclamationCircleOutlined />,
    //         okText: tOk,
    //         content: tWarningGoBack,
    //         cancelText: tCancel,
    //         onOk: goBackPage
    //     });
    // }, []);

    return (
        <FairyStepSecond
            { ...
                {
                    onChangeUploadFile,
                    optionsStepFirst,
                    isDisabledDate,
                    isLoadingFile,
                    isShowSubmit,
                    onRemoveFile,
                    handleSubmit,
                    subscription,
                    geolocation,
                    addNewTime,
                    onConfirm,
                    getValues,
                    fileList,
                    onSubmit,
                    register,
                    control,
                    isDirty,
                    isValid,
                    errors,
                    fields,
                    remove
                }
            }
        />
    );
};

export default FairyStepSecondPage;
