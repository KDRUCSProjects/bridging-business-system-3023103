import jwtDecode from 'jwt-decode';
import Constants from '../../lib/constants';
import CookieUtil from './cookieUtil';

const isDate = (date) => {
  if (Object.prototype.toString.call(date) === '[object Date]') {
    return true;
  }
  return false;
};

const getTimeFromDate = (date) => {
  const dateObj = isDate(date) ? date : new Date(date);
  let hour = dateObj.getHours();
  const minute = dateObj.getMinutes();
  let meridian = 'am';
  if (hour > 12) {
    hour -= 12;
    meridian = 'pm';
  }
  if (hour === 0) {
    hour = 12;
  }
  if (minute < 10) {
    return `${minute} = 0  ${minute}`;
  }
  return `${hour}  :  ${minute}  ${meridian}`;
};

const getUserId = () => {
  const token = CookieUtil.getCookie(Constants.ACCESS_PROPERTY);
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.userId;
  }
  return '';
};

const getFormatedChatUser = (chatUsers, onlineUserList) => {
  const userId = getUserId();
  return chatUsers.reduce((acumulator, item) => {
    if (item.type === 'DM' || item.type === 'SELF') {
      const newResult = {};
      newResult.roomId = item.roomId;
      const member = null;
      // for (const user of item.member) {
      //   if (user.id !== userId || item.type === 'SELF') {
      //     member = user;
      //   }
      // }
      if (member) {
        newResult.name = `${member.first_name} ${member.last_name}`;
        newResult.image = member.image;
        newResult.id = member.id;
        newResult.isOnline = onlineUserList?.includes(member.id);
      }
      acumulator.push(newResult);
      return acumulator;
    }
    return acumulator;
  }, []);
};

const getActiveChatId = (match) => {
  return match && match.params ? match.params.chatId : null;
};

const CommonUtil = {
  getTimeFromDate,
  getUserId,
  getFormatedChatUser,
  getActiveChatId,
};

export default CommonUtil;
