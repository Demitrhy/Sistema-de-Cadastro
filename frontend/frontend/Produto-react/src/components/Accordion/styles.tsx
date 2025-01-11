import styled from 'styled-components'
import { Col, Card, Avatar, Divider as DividerAntd } from 'antd';
import { Link } from "react-router-dom";

// // export const CustomCol = styled(Col)`
// //     margin-bottom: 9px;
// //     color: #ced4da; 
// //     text-align: left;
// //     line-height: 7vh;

// //     @media (max-width : 768px) {
// //       font-size: 30.5vw;
// //       color: #ced4da;  
// //       text-align: center;
// //       line-height: 7vh;
// //     } 
// // `;


// // export const DivContent = styled.div`
// //     margin-top: 0.3125rem; 
// //     line-height: 0.125rem;

// // `;

// // export const WrapperComponent = styled.div`
// //     padding: 0.125rem 0.3125rem 0.125rem 0.3125rem;
// //     background-color: #ffffff;
// //     margin: 0.3125rem 0rem 0.625rem 0rem;
// //     box-shadow: 0 3.2px 7.2px 0 var(--callout-shadow-color,rgba(0, 0, 0, .132)),0 .6px 1.8px 0 var(--callout-shadow-secondary-color,rgba(0, 0, 0, .108));
// // `;

// // export const OrderCard = styled(Card)`
// //     .ant-card-body {
// //       padding: 0rem 0.3125rem 0rem 0.3125rem;
// //       margin: 0.3125rem 0rem 0.3125rem 0rem;
// //       cursor: pointer;
// //     }
// // `;

// // export const ListTitle = styled.h1`
// //     color: rgba(0, 0, 0, 0.85); 
// //     max-width: 40ch;
// //     overflow: hidden;
// //     margin-bottom: 0.186875rem;
// //     text-overflow: ellipsis; 
// //     white-space: nowrap;
// //     font-size: 14px;
// //     line-height: 1rem;
// //     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
// // `;

// // export const ListSubtitle = styled.h3`

// //     max-width: 40ch; 
// //     overflow: hidden; 
// //     text-overflow: ellipsis;
// //     white-space: nowrap;
// //     color: rgba(0, 0, 0, 0.45);
// //     font-size: 0.875rem;
// //     line-height: 1rem;
// //     font-weight: 400;
// //     margin-bottom: 0.186875rem;
// //     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
// //     font-variant: tabular-nums;
// // `;

// // export const ListOrdertitle = styled.h3`
// //     max-width: 20ch;
// //     overflow: hidden;
// //     text-overflow: ellipsis;
// //     white-space: nowrap;
// //     font-weight: 700;  
// //     font-size: 22px;
// //     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'; 
// // `;

// export const AvatarInfo = styled(Avatar)`
//     width: 3.1rem;
//     height: 3.1rem;
//     font-size: 1.6rem;
//     font-weight: 650;
//     padding: 0.4rem;
//     background-color: #ff9090; 
// `;

// export const DivInfo = styled.div`
//     marginBottom: -1.25rem; 
// `;

// // export const ListOrderSubtitle = styled.h3`
// //     max-width: 40ch; 
// //     overflow: hidden; 
// //     text-overflow: ellipsis;
// //     white-space: nowrap;
// //     color: rgba(0, 0, 0, 0.45);
// //     font-size: 0.875rem;
// //     line-height: 1rem;
// //     font-weight: 400;
// //     margin-bottom: 0.186875rem;
// //     margin-top: -0.625rem;
// //     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'; 
// // `; 


// export const SpanEmpty = styled.h3`
//     font-weight: 650
//     color: rgba(0, 0, 0, 0.45);
//     font-size: 0.875rem;
// `; 


// export const DivFooter = styled.h3`
//     font-weight: 650
//     color: rgba(0, 0, 0, 0.45);
//     font-size: 0.875rem;
//     margin-left: 0.625rem;
// `; 


// // ##################################### refatorando accordion ########################


// export const CustomCol = styled(Col)`
// margin-bottom: 9px;
// font-size: 4.5vw;
// color: #ced4da; 
// text-align: left;
// line-height: 7vh;

// @media (max-width : 768px) {
//   font-size: 30.5vw;
//   color: #ced4da; 
//   text-align: center;
//   line-height: 7vh;
// } 

// `;


// export const DivContent = styled.div`
// margin-top: 5px; 
// line-height: 2px;

// `;

// export const WrapperComponent = styled.div`
//     padding: 2px 5px 2px 5px;
//     background-color: #ffffff;
//     margin: 5px 0px 10px 0px;
//     box-shadow: 0 3.2px 7.2px 0 var(--callout-shadow-color,rgba(0, 0, 0, .132)),0 .6px 1.8px 0 var(--callout-shadow-secondary-color,rgba(0, 0, 0, .108));
// `;

// export const OrderCard = styled(Card)`
//     /* background-color: #e6f7ff; */
//     .ant-card-body {
//       padding: 0px 5px 0px 5px;
//       margin: 5px 0px 5px 0px;
//       cursor: pointer;
//     }
// `;

export const Content = styled.div`
  border: 0px solid gray;
  border-top: none;
  opacity: ${props => (props.open ? "1" : "0")};
  max-height: ${props => (props.open ? "100%" : "0")};
  overflow: hidden;
  padding: ${props => (props.open ? "15px" : "0 15px")};
  transition: all 0.5s;

  p {
    margin: 0;
  }
`;

// export const ListTitle = styled.h1`
//     color: rgba(0, 0, 0, 0.85); 
//     max-width: 40ch;
//     overflow: hidden;
//     text-overflow: ellipsis; 
//     white-space: nowrap;
//     font-size: 14px;
//     line-height: 15px;
//     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
// `;

// export const ListSubtitle = styled.h3`

//     max-width: 40ch; 
//     overflow: hidden; 
//     text-overflow: ellipsis;
//     white-space: nowrap;
//     color: rgba(0, 0, 0, 0.45);
//     font-size: 12px;
//     line-height: 13px;
//     font-weight: 400;
//     margin-bottom: 2.99px;
//     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
//     font-variant: tabular-nums;
// `;

// export const ListSubtitleResult = styled.h3`

//     max-width: 400ch; 
//     overflow: hidden; 
//     text-overflow: ellipsis;
//     white-space: nowrap;
//     color: rgba(0, 0, 0, 0.45);
//     font-size: 12px;
//     line-height: 13px;
//     font-weight: 400;
//     margin-bottom: 2.99px;
//     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
//     font-variant: tabular-nums;
// `;

// export const ListOrdertitle = styled.h3`
//     max-width: 20ch;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     white-space: nowrap;
//     font-weight: 700;  
//     font-size: 22px;
//     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'; 
// `;

// export const ListOrderSubtitle = styled.h3`
//     max-width: 40ch; 
//     overflow: hidden; 
//     text-overflow: ellipsis;
//     white-space: nowrap;
//     color: rgba(0, 0, 0, 0.45);
//     font-size: 12px;
//     line-height: 13px;
//     font-weight: 400;
//     margin-bottom: 2.99px;
//     margin-top: -10px;
//     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'; 
// `; 


export const LinkStyled = styled(Link)`

    // color: rgba(0, 0, 0, 0.45);
    // text-decoration: none;

    color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;

  &:hover { border-color: rgba(175, 47, 47, 0.1); }
  &.selected { border-color: rgba(175, 47, 47, 0.2); }

`;

export const CustomCol = styled(Col)`
    margin-bottom: 9px;
    color: #ced4da; 
    text-align: left;
    line-height: 7vh;

    @media (max-width : 768px) {
      font-size: 30.5vw;
      color: #ced4da;  
      text-align: center;
      line-height: 7vh;
    } 
`;


export const DivContent = styled.div`
    margin-top: 0.3125rem; 
    line-height: 0.125rem;

`;

export const WrapperComponent = styled.div`
    padding: 0.125rem 0.3125rem 0.125rem 0.3125rem;
    background-color: #ffffff;
    margin: 0.3125rem 0rem 0.625rem 0rem;
    box-shadow: 0 3.2px 7.2px 0 var(--callout-shadow-color,rgba(0, 0, 0, .132)),0 .6px 1.8px 0 var(--callout-shadow-secondary-color,rgba(0, 0, 0, .108));
`;

export const OrderCard = styled(Card)`
    .ant-card-body {
      padding: 0rem 0.3125rem 0rem 0.3125rem;
      margin: 0.3125rem 0rem 0.3125rem 0rem;
      cursor: pointer;
    }
`;

export const ListTitle = styled.h1` 
    color: rgba(255, 255, 255, 255); 
    max-width: 40ch;
    overflow: hidden;
    margin-bottom: 0.186875rem;
    text-overflow: ellipsis; 
    white-space: nowrap;
    font-size: 14px;
    line-height: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
`;

export const ListSubtitle = styled.h3`

    max-width: 60ch; 
    overflow: hidden; 
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.65);
    font-size: 0.875rem;
    line-height: 1rem;
    font-weight: 400;
    margin-bottom: 0.186875rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    font-variant: tabular-nums;
`;

export const ListOrdertitle = styled.h3`
    max-width: 20ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 700;  
    font-size: 22px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'; 
`;

export const AvatarInitialsLetters = styled(Avatar)`
    width: 3.1rem;
    height: 3.1rem;
    font-size: 1.6rem;
    font-weight: 650;
    padding: 0.4rem;
    background-color: #ff9090; 
`;

export const AvatarImage = styled(Avatar)`
    width: 3.1rem;
    height: 3.1rem;
    font-size: 1.6rem;
    font-weight: 650;
    padding: 0; 
`;

export const AvatarIcon = styled(Avatar)`
    width: 3.1rem;
    height: 3.1rem;
    font-size: 1.6rem;
    font-weight: 650;
    padding: 0.2rem; 
`;

export const DivInfo = styled.div`
    marginBottom: -1.25rem; 
`;

export const ListOrderSubtitle = styled.h3`
    max-width: 40ch; 
    overflow: hidden; 
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.45);
    font-size: 0.875rem;
    line-height: 1rem;
    font-weight: 400;
    margin-bottom: 0.186875rem;
    margin-top: -0.625rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'; 
`; 


export const SpanEmpty = styled.h3`
    font-weight: 650
    color: rgba(0, 0, 0, 0.45);
    font-size: 0.875rem;
`; 


export const DivFooter = styled.h3`
    font-weight: 650
    color: rgba(0, 0, 0, 0.45);
    font-size: 0.875rem;
    margin-left: 0.625rem;
`; 

export const Divider = styled(DividerAntd)`
    margin-top: 10px; 
    margin-bottom: 5px; 
`;






