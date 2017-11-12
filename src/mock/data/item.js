import Mock from 'mockjs'


const Items = [];

/*
          flight: '',
          flightFx_Hx_DM: '',
          flight_count:'',
          flightDate: '',
          start_end_time: [],
          ssd_number:'',
          file_number:'',
          dataType: [],
          item_desc:''
*/
for (let i = 0; i < 30; i++) {
  Items.push(Mock.mock({
    'id': Mock.Random.guid(),
    username: Mock.Random.cname(),                //账号
    'flight|18-60': 1,                            //机号
    'flightFx_Hx_DM|1': ["FX","HX","DM"],         //FX?HX?DM?
    flightDate:Mock.Random.date(),                //飞行日期
    flight_count:Mock.Random.integer(1,20),
    start_end_time:[Mock.Random.time('HH:mm:ss'),Mock.Random.time('HH:mm:ss')],
   // flightStartTime:Mock.Random.time('HH:mm:ss'), //飞行起始时间
   // flightEndTime:Mock.Random.time('HH:mm:ss'),   //飞行结束时间
    ssd_number:Mock.Random.guid(),
    file_number: Mock.Random.integer(1, 20),           //文件号
    createTime: Mock.Random.date(),               //记录生成时间
    status: Mock.Random.integer(0, 1),            //卸载记录状态
    'dataType': ["Pcm","Enet","Anolog","1553B"],//数据类型
    item_desc: Mock.Random.cparagraph()              //备注信息
  }));
}

export { Items };
