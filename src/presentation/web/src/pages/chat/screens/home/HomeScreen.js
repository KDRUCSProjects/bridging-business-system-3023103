import React, { useState } from 'react';
import AuthRequired from '../../../../components/chat/auth/AuthRequired';
// import ChatBody from '../../../../components/chat/chatbody/ChatBody';
import Sidebar from '../../../../components/chat/sidebar/sidebar';

const HomeScreen = (props) => {
  const [currentChattingMember, setCurrentChattingMember] = useState({});
  const [onlineUserList, setOnlineUserList] = useState([]);

  return (
    <main className="content">
      <div className="container-fluid p-0">
        <div className="container-fluid">
          <div className="row g-0">
            hlkasdjfldas
            <Sidebar setCurrentChattingMember={setCurrentChattingMember} onlineUserList={onlineUserList} {...props} />
            {/* <ChatBody setOnlineUserList={setOnlineUserList} currentChattingMember={currentChattingMember} {...props} /> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeScreen;
