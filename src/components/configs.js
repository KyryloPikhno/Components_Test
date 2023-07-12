import * as yup from "yup";

export const getSchema = (isVideo) => {
    const videoUrl = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    const allUrl = /(https?:\/\/(?:www\.|(?!www))[\da-z][\da-z-]+[\da-z]\.\S{2,}|www\.[\da-z][\da-z-]+[\da-z]\.\S{2,}|https?:\/\/(?:www\.|(?!www))[\da-z]+\.\S{2,}|www\.[\da-z]+\.\S{2,})/gi;

    const validateAge = ()=> yup.number()
        .positive("tValidPositive")
        .integer("tInteger")
        .nullable(true)
        .min(1, "tValidMoreThan0")
        .transform((v, o) => (o === "" ? null : v));

    const validationSymbol = () => yup.number()
        .positive("tValidMoreThan0")
        .integer("tInteger")
        .nullable(true)
        .transform((v, o) => (o === "" ? null : v));

    if (isVideo) {
        return yup.object().shape({
            clickUrl: yup.string()
                .matches(videoUrl, "tValidClickUrlVideo")
                .required("tRequired"),
            minimumAge: validateAge(),
            minParticipantCount: validationSymbol(),
            minRequirementsSubscribers: validationSymbol()
        });
    }

    return yup.object().shape({
        media: yup.mixed(),
        clickUrl: yup.string()
            .matches(allUrl, "tValidClickUrl")
            .required("tRequired"),
        minimumAge: validateAge(),
        minParticipantCount: validationSymbol(),
        minRequirementsSubscribers: validationSymbol()
    });
};
