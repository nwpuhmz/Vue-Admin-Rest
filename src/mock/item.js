// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
// import { LoginUsers, Users } from './data/user';
// let _Users = Users;

// export default {
//   /**
//    * mock bootstrap
//    */
//   bootstrap() {
//     let mock = new MockAdapter(axios);

//     // mock success request
//     mock.onGet('/success').reply(200, {
//       msg: 'success'
//     });

//     // mock error request
//     mock.onGet('/error').reply(500, {
//       msg: 'failure'
//     });

//     //登录
//     mock.onPost('/login').reply(config => {
//      // console.log(config);
//       let {username, password} = JSON.parse(config.data);
//       return new Promise((resolve, reject) => {
//         let user = null;
//         setTimeout(() => {
//           let hasUser = LoginUsers.some(u => {
//             if (u.username === username && u.password === password) {
//               user = JSON.parse(JSON.stringify(u));
//               user.password = undefined;
//               return true;
//             }
//           });

//           if (hasUser) {
//             resolve([200, { code: 200, msg: '请求成功', user }]);
//           } else {
//             resolve([200, { code: 500, msg: '账号或密码错误' }]);
//           }
//         }, 1000);
//       });
//     });

//   //注销
//     mock.onPost('/logout').reply(config => {
//       //let {username, password} = JSON.parse(config.data);
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve([200, { code: 200, msg: '注销成功'}]);
//         }, 1000);
//       });
//     });

//     //获取用户列表
//     mock.onGet('/user/list').reply(config => {
//       let {name} = config.params;
//       let mockUsers = _Users.filter(user => {
//         if (name && user.name.indexOf(name) == -1) return false;
//         return true;
//       });
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           resolve([200, {
//             users: mockUsers
//           }]);
//         }, 1000);
//       });
//     });

//     //获取用户列表（分页）
//     mock.onGet('/user/listpage').reply(config => {
//       let {page, name} = config.params;
//       let mockUsers = _Users.filter(user => {
//         if (name && user.name.indexOf(name) == -1) return false;
//         return true;
//       });
//       let total = mockUsers.length;
//       mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           resolve([200, {
//             total: total,
//             users: mockUsers
//           }]);
//         }, 1000);
//       });
//     });

//     //删除用户
//     mock.onGet('/user/remove').reply(config => {
//       let { id } = config.params;
//       _Users = _Users.filter(u => u.id !== id);
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           resolve([200, {
//             code: 200,
//             msg: '删除成功'
//           }]);
//         }, 500);
//       });
//     });

//     //批量删除用户
//     mock.onGet('/user/batchremove').reply(config => {
//       let { ids } = config.params;
//       ids = ids.split(',');
//       _Users = _Users.filter(u => !ids.includes(u.id));
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           resolve([200, {
//             code: 200,
//             msg: '删除成功'
//           }]);
//         }, 500);
//       });
//     });

//     //编辑用户
//     mock.onGet('/user/edit').reply(config => {
//       let { id, name, addr, age, birth, sex } = config.params;
//       _Users.some(u => {
//         if (u.id === id) {
//           u.name = name;
//           u.addr = addr;
//           u.age = age;
//           u.birth = birth;
//           u.sex = sex;
//           return true;
//         }
//       });
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           resolve([200, {
//             code: 200,
//             msg: '编辑成功'
//           }]);
//         }, 500);
//       });
//     });

//     //新增用户
//     mock.onGet('/user/add').reply(config => {
//       let { name, addr, age, birth, sex } = config.params;
//       _Users.push({
//         name: name,
//         addr: addr,
//         age: age,
//         birth: birth,
//         sex: sex
//       });
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           resolve([200, {
//             code: 200,
//             msg: '新增成功'
//           }]);
//         }, 500);
//       });
//     });

//   }
// };
import {port_code} from '@/common/port_uri'
import {Items} from'./data/item'

let _Items = Items;

export default {
  list: () => new Promise(resolve => {
    setTimeout(() => {
      resolve([200, {code:port_code.success,msg:'get item list success',data:{
      result: _Items,
      page: 1,
      'total': 100
      }}]);
    }, 1000);
  }),
  
  listWithPage : config => {
      let {page, length} = config.params;
      // let mockUsers = _Users.filter(user => {
      //   if (name && user.name.indexOf(name) == -1) return false;
      //   return true;
      // });
      let total = _Items.length;
      let mockItems = _Items;
      mockItems = mockItems.filter((u, index) => index < length * page && index >= length * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {code:port_code.success,msg:'get item list success',data:{
                result: mockItems,
                page: page,
                total: total
      }}]);
        }, 1000);
      });
  },

  del: config => {
    let { id } = config.params;
    _Items = _Items.filter(item => item.id !== id);
   return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: port_code.success,
            msg: '删除成功'
          }]);
        }, 500);
      })
  },

  batch_del:config => {
    let { ids } = config.params;
      ids = ids.split(',');
      _Items = _Items.filter(u => !ids.includes(u.id.toString()));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: port_code.success,
            msg: '批量删除成功'
          }]);
        }, 500);
      })
  },

/*
          flight: '',
          flightFx_Hx_DM: '',
          flight_count:'',
          flightDate: '',
          start_end_time: '',
          ssd_number:'',
          file_number:'',
          dataType: [],
          item_desc:''
*/
  save:config => {
   
      let {
          flight,
          flightFx_Hx_DM,
          flight_count,
          flightDate,
          start_end_time,
          ssd_number,
          file_number,
          dataType,
          item_desc
        } = config.params;
           console.log("mock/item.js/save",flight,
          flightFx_Hx_DM,
          flight_count,
          flightDate,
          start_end_time,
          ssd_number,
          file_number,
          dataType,
          item_desc);
      let new_id = _Items.length+1;
      _Items.push({
        id: new_id,
        username:'admin',
        createTime:'2017-10-31',
        status:0,
        flight_count:10,
        flight:flight,
        flightFx_Hx_DM:flightFx_Hx_DM,
        flightDate:flightDate,
        start_end_time:start_end_time,
        ssd_number:ssd_number,
          file_number:file_number,
          dataType:dataType,
          item_desc:item_desc
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: port_code.success,
            msg: '新增成功'
          }]);
        }, 500);
      });
    },

  get:config => {
    let { id } = config.params;
    let mockItem = _Items;
    mockItem = mockItem.filter(item => item.id === id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: port_code.success,
            msg: '查找成功',
            data:mockItem[0]
          }]);
        }, 500);
      });
    }
  
};