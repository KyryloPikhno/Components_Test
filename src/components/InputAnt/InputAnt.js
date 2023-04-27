import { yupResolver } from "@hookform/resolvers/yup";
import FormItem from "antd/es/form/FormItem";
import {Controller} from "react-hook-form";
import { useForm } from "react-hook-form";
import { Input } from "antd";
import * as yup from "yup";

const videoUrl = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

const InputAnt = () => {
    const getSchema = () => {
        return yup.object().shape({
            clickURL: yup.string()
                .matches(videoUrl, 'tValidClickUrlVideo')
                .required('tRequired'),
        });
    };

    const {control, watch, handleSubmit, setError, formState: {isDirty, isValid, errors}} = useForm({
        resolver: yupResolver(getSchema()),
        mode: "all"
    });

    return (
        <div>
            <Controller
                name={'clickURL'}
                control={control}
                render={({field}) => (
                    <FormItem
                        label={'clickURL'}
                        validateStatus={errors.clickURL}
                        help={(errors?.clickURL?.message) ?? null}
                        required
                    >
                        <Input
                            autoFocus
                            placeholder={'clickURL'}
                            {...field}
                        />
                    </FormItem>
                )}
            />
        </div>
    );
};

export {InputAnt};
