const qs = require('qs');
const mockjs = require('mockjs');

export default {

  'GET /api/persionAllThing':(req, res)=> {
    const page = qs.parse(req.query);

    const data = mockjs.mock({
      'data|100': [{
        'key|+1': 1,
        thing:'@ctitle(3, 5)',
        name: '@cname',
        submitTime:'@date("yyyy-MM-dd")',
        'thingState|1': [
          '办理中',
          '办理完成'
        ],
        'operation|1':[
          '查看进度',
          '查看明细'
        ]
      }],
      page: {
        total: 100,
        current: 1
      }
    });
    res.status(200).json({
      success: true,
      data: data.data,
      page: data.page
    });
  },
  'GET /api/userAllQuertion':(req, res)=> {
    const page = qs.parse(req.query);

    const data = mockjs.mock({
      'data|30': [{
        'key|+1': 1,
        thing:'@ctitle(10, 20)',
        date:'@date("yyyy-MM-dd")'
      }],
      page: {
        total: 100,
        current: 1
      }
    });
    res.json({
      success: true,
      data: data.data,
      page: data.page
    });
  },

};
