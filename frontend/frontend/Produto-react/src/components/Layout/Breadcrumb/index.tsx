import React, { useLayoutEffect } from 'react';
import { CustomBreadcrumb } from './styles';
import Icon, { AppstoreOutlined } from '@ant-design/icons';
import MessageSvg from 'path/to/message.svg'
import path from '../../../router/paths';
import { useLocation } from 'react-router-dom';

 const Breadcrumb: React.FC = () => {
  const location = useLocation();

  useLayoutEffect(() => {
  }, [location]);  

  return ( 
    <>
      {/* <CustomBreadcrumb>
      {path.filter((i, index) => 
        i.path === location.pathname &&
          i.breadcrumb.map((d: any, index: any) =>       
            <CustomBreadcrumb.Item href={d.path}>
              <AppstoreOutlined />
              <span>{d.breadcrumbName}</span>
            </CustomBreadcrumb.Item>
          ) 
        )}
      </CustomBreadcrumb> */}
    </>
  );
}

export default Breadcrumb;