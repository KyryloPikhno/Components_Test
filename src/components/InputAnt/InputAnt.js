import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Input } from "antd";
import * as yup from "yup";
import FormItem from "antd/es/form/FormItem";


const InputAnt = () => {

     const getSchema = () => {
        return yup.object().shape({
            userName: yup.string()
                .min(4, 'min_4')
                .max(30, 'max_30')
                .matches(/^[a-zA-Z0-9а-яА-ЯіІїЇєЄёЁ_-]+$/, 'tInvalidUserName')
                .required('tFirstnameRequired'),
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
