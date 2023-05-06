import { MinusCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { TreeSelect } from "antd";

export const TimeRangeContainer = styled.div`
	display: flex;
	flex-direction: row;
	
	& .ant-picker.ant-picker-range {
	 margin-top: 10px;
	}
`;

export const RemoveContainer = styled.span`
	align-self: center;
	margin-left: 10px;
	margin-bottom: 10px;
	
	& .anticon.anticon-minus-circle {
	color: ${({ theme }) => theme.data.grey2};
	}
`;

export const Label = styled.label`
	text-transform: uppercase;
	font-weight: 600;
	font-size: 10px;
`;

export const Icon = styled(MinusCircleOutlined)`
	font-size: 25px;
`;

export const ButtonContainer = styled.div`
	display: flex;;
	flex-direction: column;
`;

export const AntTreeSelect = styled(TreeSelect)`
	overflow-x: hidden;
	overflow-y: auto;
`;
