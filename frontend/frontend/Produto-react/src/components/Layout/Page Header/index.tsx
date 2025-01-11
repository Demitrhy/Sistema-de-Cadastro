
import { PageHeader as PageHeaderAntd, Breadcrumb } from 'antd';
import React from 'react';
import paths from '../../../router/paths';
import { useLocation } from 'react-router';

interface pageHeaderTypes {

  location?: any;
  history?: any;
  match?: any;
  params?: any;

}

const PageHeader = (props: pageHeaderTypes) => {
  const location = useLocation() 


  const info = (paths.filter((i) => i.path === location.pathname).length === 0
  ? paths.filter((i) => i.path === props.match.path)
  : paths.filter((i) => i.path === location.pathname))

  const breadcrumb = info && info[0].breadcrumb
  const title = info && info[0].title
  const subTitle = info && info[0].subTitle
  const role = info && info[0].role
  

  return ( 
      <>
      {!["403", "404", "500"].includes(role) && info.length > 0  ? 
        <PageHeaderAntd 
        title={title}
        subTitle={subTitle}
        extra={ 
          <Breadcrumb>
            {breadcrumb && breadcrumb.map((i: { path: string | undefined; breadcrumbName: React.ReactNode; }, index: string | number | undefined) => 
              <Breadcrumb.Item key={index} href={i.path}>
                <span>{i.breadcrumbName || props.params}</span>
              </Breadcrumb.Item>
              )}
          </Breadcrumb>
        }
        >
        </PageHeaderAntd> :
        <></>}
    </>
  );
}

export default PageHeader;

