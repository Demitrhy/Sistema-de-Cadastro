import styled, { keyframes } from 'styled-components'
import { Button as antdButton, Badge } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const BotToTop = keyframes`
	0%   {bottom:-40px}
	50%  {bottom:40px}
`;

const ScaleIn = keyframes`
	from {transform: scale(0);opacity: 0;}
	to {transform: scale(1);opacity: 1;}
`;

const RotateIn = keyframes`
	from {transform: rotate(0deg);}
	to {transform: rotate(360deg);}
`;

export const AnimationIcon = styled(SettingOutlined)`
	animation: ${RotateIn} 1s;
`;

export const FloatButton = styled(antdButton)`
 	position:fixed;
	width:60px;
	height:60px;
	bottom:40px;
	right:30px;
  	padding: 0;
  	margin: 0;
	font-size: calc(20px + 2vmin);
  	border-radius:50px; 
	text-align:center;
	box-shadow: 0 3.2px 7.2px 0 var(--callout-shadow-color,rgba(0, 0, 0, .132)),0 .6px 1.8px 0 var(--callout-shadow-secondary-color,rgba(0, 0, 0, .108));
	z-index: -1;
	animation: ${BotToTop} 1s ease-out;
`;

export const BadgeFloatButton = styled(Badge)`
 	position:fixed;
	width:60px;
	height:60px;
	bottom:40px;
	right:30px;
  	padding: 0;
  	margin-right: 5px;
	text-align:center;
	z-index:3;
	animation: ${BotToTop} 1s ease-out;
`;

export const Ul = styled.ul`
	  position:fixed;
		right:35px;
		padding-bottom:8px;
		bottom:65px;
		display:table;
		visibility: hidden;
		z-index:100;

	${FloatButton}:focus & {
		animation: ${ScaleIn} 0.5s;
		visibility:visible!important;
		opacity:1!important;
  }

`;

export const Li = styled.li`
  list-style-type: none;
	margin-bottom:8px;
    
`;

export const FloatButtonOption = styled(antdButton)`
  width:50px;
  height:50px;
  padding: 0;
  margin: 0;
  font-size: calc(10px + 2vmin);
  border-radius:50px; 
  text-align:center;
  box-shadow: 0 3.2px 7.2px 0 var(--callout-shadow-color,rgba(0, 0, 0, .132)),0 .6px 1.8px 0 var(--callout-shadow-secondary-color,rgba(0, 0, 0, .108));
  display: ${props => (props.accessControl ? "none" : "block")};
`;