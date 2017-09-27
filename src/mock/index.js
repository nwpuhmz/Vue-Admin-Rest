import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import userAPI from './user';
import {port_user} from '@/common/port_uri'

const mock = new MockAdapter(axios);

// 邮箱登录接口
mock.onPost(port_user.login).reply(userAPI.login);
// 登出接口
mock.onPost(port_user.logout).reply(userAPI.logout);

export default mock;