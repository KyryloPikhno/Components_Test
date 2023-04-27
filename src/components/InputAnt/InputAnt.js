import { yupResolver } from "@hookform/resolvers/yup";
import FormItem from "antd/es/form/FormItem";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Input } from "antd";
import * as yup from "yup";

const videoUrl = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

const InputAnt = () => {
     const getSchema = () => {
        return yup.object().shape({
            clickUrl: yup.string()
                .matches(videoUrl, 'tValidClickUrlVideo')
                .required('tRequired'),
        });
    };

    const { control, watch, handleSubmit, setError, formState: { isDirty, isValid, errors } } = useForm({
        resolver: yupResolver(getSchema()),
        mode: "onChange"
    });

    return (
        <div>
            <Controller
                name={ 'userName' }
                control={ control }
                render={ ({ field }) => (
                    <FormItem
                        label={ 'userName' }
                        validateStatus={ errors.userName  }
                        help={ (errors?.userName?.message) ?? null }
                        required
                    >
                        <Input
                            autoFocus
                            placeholder={ 'userName' }
                            { ...field }
                        />
                    </FormItem>
                ) }
            />
        </div>
    );
};

export {InputAnt};
