import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import userAPI from './user';
import itemAPI from './item';
import {port_user,port_item} from '@/common/port_uri'

const mock = new MockAdapter(axios);

// 邮箱登录接口
mock.onPost(port_user.login).reply(userAPI.login);
// 登出接口
mock.onPost(port_user.logout).reply(userAPI.logout);

/***************Items 接口 *********************/
mock.onGet(port_item.list).reply(itemAPI.list);
mock.onGet(port_item.listWithPage).reply(itemAPI.listWithPage);
mock.onDelete(port_item.del).reply(itemAPI.del);
mock.onPost(port_item.batch_del).reply(itemAPI.batch_del);
mock.onPost(port_item.save).reply(itemAPI.save);
mock.onGet(port_item.get).reply(itemAPI.get);




export default mock;