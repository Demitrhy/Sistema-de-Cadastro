import React from 'react';
import { Avatar, Popover, Button, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Profile = () => {
  
 function Logout() {
    localStorage.clear();
  }

  return (
    <div>
       <Popover 
        placement="bottomRight"
        trigger="click" 
        title="Sessão" 
        content={
        <div style={{ fontSize: 14, lineHeight: 0.8, margin: 0}}>
          <a href="." onClick={() => Logout()}>Sair</a>
        </div>} 
        >
        <Tooltip placement="left" title="Matricula - Nome">
          <Button style={{ margin: 0}} type="link">
          <Avatar icon={<UserOutlined />} />
          </Button>
        </Tooltip>
      </Popover>
      
    </div>
  );
}

export default Profile;
