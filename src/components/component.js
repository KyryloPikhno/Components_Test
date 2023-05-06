// import { ButtonType, DirectionType, HtmlType, InputType, Size, Symbols, UserSubscription } from "../../../../../../@types";
// import { AntTreeSelect, ButtonContainer, Icon, Label, RemoveContainer, TimeRangeContainer } from "./styles";
// import { ComponentProps, FairyMediaType, NamesFormSecondStep, PublishType, FairyTargeting } from "./types";
// import { AntRangePicker, AntTextArea, SHOW_PARENT } from "../../../../../../components/general/Ant";
// import FormButton from "../../../../../../components/general/Form/FormButton/FormButton.container";
// import FormItem from "../../../../../../components/general/Form/FormItem/FormItem.container";
// import { HourMinuteFormat, MonthDayYearFormat } from "../../../../../../constants/Times";
// import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
// import { imageTypes } from "../../../../../../constants/image";
// import { Input, Upload, TimePicker, Space } from "antd";
// import { Back, FormButtonIcon, Next } from "../styles";
// import { Controller } from "react-hook-form";
// import { DataNode } from "antd/lib/tree";
// import React, { FC, memo } from "react";
// import { getStrings } from "./strings";
//
// const FairyStepSecond: FC<ComponentProps> = (props: ComponentProps) => {
//     console.log("[FairyStepSecond] view");
//     const { handleSubmit, onSubmit, isDisabledDate, onRemoveFile, addNewTime, onChangeUploadFile, onConfirm,
//         remove } = props; // func
//     const { fileList, isShowSubmit, errors, control, optionsStepFirst, subscription, fields, isLoadingFile,
//         geolocation } = props; // data
//     const { mediaType, publishType, target } = optionsStepFirst;
//
//     const localization = getStrings();
//     const { tUrlPlaceholder,tMinCountPlaceholder,tDownloadMediaPlaceholder, tLabelClickUrl, tLabelMedia, tLabelMinParticipantCount,
//         tLabelTime, tPremiumPlaceholder, tLabelClickUrlVideo, tLabelTimePeriod } = localization.page;
//     const { tBack, tNext, tLocation, tDescription, tPlaceholderDescription, tDate, tAge,
//         tAgePlaceholder, tLocationPlaceholder, tSubscribersPlaceholder, tMinRequirementsSubscribers } = localization.general;
//
//     return (
//         <form
//             onSubmit={ handleSubmit(onSubmit) }
//             name={ NamesFormSecondStep.FORM }
//         >
//             { mediaType === FairyMediaType.VIDEO.toUpperCase() ? (
//                 <Controller
//                     name= { NamesFormSecondStep.CLICK_URL }
//                     control={ control }
//                     render={
//                         ({ field }) => (
//                             <FormItem
//                                 label={ tLabelClickUrlVideo }
//                                 validateStatus={ errors?.clickUrl && "error" }
//                                 help={ errors?.clickUrl?.message }
//                                 required
//                             >
//                                 <Input
//                                     { ...field }
//                                     placeholder={ tUrlPlaceholder }
//                                 />
//                             </FormItem>
//                         )
//                     }
//                 />
//             ) : (
//                 <>
//                     <Controller
//                         name={ NamesFormSecondStep.CLICK_URL }
//                         control={ control }
//                         render={
//                             ({ field }) => (
//                                 <FormItem
//                                     label={ tLabelClickUrl }
//                                     validateStatus={ errors?.clickUrl && "error" }
//                                     help={ errors?.clickUrl?.message }
//                                     required
//                                 >
//                                     <Input
//                                         { ...field }
//                                         placeholder={ tUrlPlaceholder }
//                                     />
//                                 </FormItem>
//                             )
//                         }
//                     />
//                     <Controller
//                         name={ NamesFormSecondStep.MEDIA }
//                         control={ control }
//                         render={
//                             ({ field }) => (
//                                 <FormItem
//                                     label={ tLabelMedia }
//                                     required
//                                 >
//                                     <Upload
//                                         { ...field }
//                                         accept={ imageTypes }
//                                         fileList={ fileList }
//                                         onRemove={ onRemoveFile }
//                                         beforeUpload={ () => false }
//                                         onChange={ onChangeUploadFile }
//                                     >
//                                         <FormButton
//                                             icon={ <UploadOutlined /> }
//                                             loading={ isLoadingFile }
//                                         >
//                                             { tDownloadMediaPlaceholder }
//                                         </FormButton>
//                                     </Upload>
//                                 </FormItem>
//                             )
//                         }
//                     />
//                 </>
//             )}
//             { target === FairyTargeting.TARGET.toUpperCase() && (
//                 <>
//                     <Controller
//                         name={ NamesFormSecondStep.MINIMUM_AGE }
//                         control={ control }
//                         render={
//                             ({ field }) => (
//                                 <FormItem
//                                     label={ tAge }
//                                     validateStatus={ errors?.minimumAge && "error" }
//                                     help={ errors?.minimumAge?.message }
//                                 >
//                                     <Input
//                                         { ...field }
//                                         placeholder={ tAgePlaceholder }
//                                         type={ InputType.NUMBER }
//                                     />
//                                 </FormItem>
//                             )
//                         }
//                     />
//                     <Controller
//                         name={ NamesFormSecondStep.LOCATIONS }
//                         control={ control }
//                         render={
//                             ({ field }) => (
//                                 <FormItem
//                                     label={ tLocation }
//                                 >
//                                     <AntTreeSelect
//                                         multiple
//                                         { ...field }
//                                         treeDataSimpleMode
//                                         size={ Size.SMALL }
//                                         treeCheckable={ true }
//                                         showCheckedStrategy={ SHOW_PARENT }
//                                         placeholder={ tLocationPlaceholder }
//                                         treeData={ geolocation as DataNode[] }
//                                     />
//                                 </FormItem>
//                             )
//                         }
//                     />
//                     { publishType !== PublishType.PLATFORM.toUpperCase() && (
//                         <Controller
//                             name={ NamesFormSecondStep.DESCRIPTION }
//                             control={ control }
//                             render={
//                                 ({ field }) => (
//                                     <FormItem
//                                         label={ tDescription }
//                                     >
//                                         <AntTextArea
//                                             { ...field }
//                                             placeholder={ tPlaceholderDescription }
//                                             autoSize={ { minRows: 3, maxRows: 10 } }
//                                         />
//                                     </FormItem>
//                                 )
//                             }
//                         />
//                     )}
//                 </>
//             )}
//             <Controller
//                 name={ NamesFormSecondStep.MIN_PARTICIPANT_COUNT }
//                 control={ control }
//                 render={
//                     ({ field }) => (
//                         <FormItem
//                             label={ tLabelMinParticipantCount }
//                             validateStatus={ errors?.minParticipantCount && "error" }
//                             help={ errors?.minParticipantCount?.message }
//                         >
//                             <Input
//                                 { ...field }
//                                 placeholder={ subscription === UserSubscription.UserPremium ? tPremiumPlaceholder : tMinCountPlaceholder }
//                                 disabled={ subscription !== UserSubscription.UserPremium }
//                                 type={ InputType.NUMBER }
//                             />
//                         </FormItem>
//                     )
//                 }
//             />
//             { publishType === PublishType.MARKET.toUpperCase() && (
//                 <Controller
//                     name={ NamesFormSecondStep.MIN_REQUIREMENTS_SUBSCRIBERS }
//                     control={ control }
//                     render={
//                         ({ field }) => (
//                             <FormItem
//                                 label={ tMinRequirementsSubscribers }
//                                 validateStatus={ errors?.minRequirementsSubscribers && "error" }
//                                 help={ errors?.minRequirementsSubscribers?.message }
//                             >
//                                 <Input
//                                     { ...field }
//                                     placeholder={ tSubscribersPlaceholder }
//                                     type={ InputType.NUMBER }
//                                 />
//                             </FormItem>
//                         )
//                     }
//                 />
//             )}
//             <Controller
//                 name={ NamesFormSecondStep.DATA }
//                 control={ control }
//                 render={
//                     ({ field }) => (
//                         <FormItem
//                             label={ tDate }
//                         >
//                             <Space direction={ DirectionType.VERTICAL }>
//                                 <AntRangePicker
//                                     { ...field }
//                                     format={ MonthDayYearFormat }
//                                     disabledDate={ isDisabledDate }
//                                     allowClear={ false }
//                                 />
//                             </Space>
//                         </FormItem>
//                     )
//                 }
//             />
//             { fields.length >= Symbols.SYMBOL_1 && (
//                 <Label>
//                     { tLabelTime }
//                 </Label>
//             )}
//             { fields.map((item: any, index: number) => (
//                 <TimeRangeContainer
//                     key={ index }
//                 >
//                     <Controller
//                         name={ `time.${index}` }
//                         control={ control }
//                         render={
//                             ({ field }) => (
//                                 <FormItem
//                                     required
//                                 >
//                                     <Space
//                                         direction={ DirectionType.VERTICAL }
//                                     >
//                                         <TimePicker.RangePicker
//                                             { ...field }
//                                             format={ HourMinuteFormat }
//                                             autoFocus={ true }
//                                             allowClear={ true }
//                                             defaultValue={
//                                                 [
//                                                     item[Symbols.SYMBOL_0],
//                                                     item[Symbols.SYMBOL_1]
//                                                 ]
//                                             }
//                                         />
//                                     </Space>
//                                 </FormItem>
//                             )
//                         }
//                     />
//                     <RemoveContainer>
//                         <Icon
//                             onClick={ () => remove(index) }
//                         />
//                     </RemoveContainer>
//                 </TimeRangeContainer>
//             ))
//             }
//             <FormButton
//                 type={ ButtonType.DEFAULT }
//                 onClick={ addNewTime }
//                 icon={
//                     <PlusOutlined />
//                 }
//             >
//                 { tLabelTimePeriod }
//             </FormButton>
//             <ButtonContainer>
//                 <Next
//                     type={ ButtonType.PRIMARY }
//                     htmlType={ HtmlType.SUBMIT }
//                     disabled={ !isShowSubmit }
//                 >
//                     { tNext }
//                     <FormButtonIcon/>
//                 </Next>
//                 <Back
//                     type={ ButtonType.DEFAULT }
//                     onClick={ onConfirm }
//                 >
//                     { tBack }
//                 </Back>
//             </ButtonContainer>
//         </form>
//     );
// };
// export default memo(FairyStepSecond);
