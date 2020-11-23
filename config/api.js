var NewApiRootUrl = 'https://wkshrms.wistron.com/publishguest'; //后台服务器路径
// var NewApiRootUrl = 'http://10.66.153.23:8888/publishguest';
// var JavaApiRootUrl = 'http://localhost:443/WXAPPApi';
// var JavaApiRootUrl = 'http://10.66.153.23:443/WXAPPApi';
var JavaApiRootUrl = 'http://localhost:443/WXAPPApi';
// var JavaApiRootUrl = 'https://wkswxapp.wistron.com/WXAPPApi';
module.exports = {
  Login: NewApiRootUrl + '/login', //账号登录
  LeaveDetail: NewApiRootUrl + '/leave', //请假
  ResignDetail: NewApiRootUrl + '/resign', //离职
  // OvertimeSummary: NewApiRootUrl + '/otsummary',  //加班汇总
  Overtime: NewApiRootUrl + '/ot', //加班
  // OvertimeDetail: NewApiRootUrl + '/otdetail',  //加班明细
  UnattenDetail: NewApiRootUrl + '/unatten', //旷工
  UnbrushDetail: NewApiRootUrl + '/unbrush', //未刷卡
  UnnormalDetail: NewApiRootUrl + '/unnormal', //迟到早退
  Password: NewApiRootUrl + '/password', //修改密码
  VisitorsLogin: NewApiRootUrl + '/GuestFrequency/GuestLogin',
  IntervieweeInfo: NewApiRootUrl + '/GuestFrequency/VisitInfo',
  HistoryVisitors: NewApiRootUrl + '/GuestFrequency/GuestInfo', //历史访客
  SubmitApplication: NewApiRootUrl + '/GuestFrequency/Guest_submit', //提交
  HistoryApplication: NewApiRootUrl + '/GuestFrequency/GuestQuery', //历史申请单
  IsBlackList: NewApiRootUrl + '/GuestFrequency/check_list',
  SalarySearch: NewApiRootUrl + '/Salary',
  OutBase: NewApiRootUrl + '/outbase', //员工进出单基础数据
  OutApply: NewApiRootUrl + '/outapply', //员工进出单送出
  ResignBase: NewApiRootUrl + '/resignbase', //员工离职单基础数据
  ResignApply: NewApiRootUrl + '/resignapply', //员工离职单送出
  SubsidyBase: NewApiRootUrl + '/subsidybase', //技能提報基础数据
  SubsidyApply: NewApiRootUrl + '/subsidyapply', //技能提報送出
  PickQuery:  NewApiRootUrl  +  '/Travel/PickQuery',
  PickDeatil:  NewApiRootUrl  +  '/Travel/PickDeatil',
  DepartQuery:  NewApiRootUrl  +  '/Travel/DepartQuery',
  DepartDeatil:  NewApiRootUrl  +  '/Travel/DepartDeatil',
  PartyDetail: NewApiRootUrl + '/party',
  RsDetail: NewApiRootUrl + '/rs',//就餐查询
  AllowanceDetail: NewApiRootUrl + '/allowance',//DL技能申请
  CreatePdf: NewApiRootUrl + '/createpdf',
  RsPlan: NewApiRootUrl + '/rsplan',
  InfoDetail: NewApiRootUrl + '/info',
  ExecutionInit: NewApiRootUrl + '/GuestFrequency/BuildBaseInfo', //初始
  ExecutionHistory: NewApiRootUrl + '/GuestFrequency/BuildInfo', //历史
  ExecutionSheet: NewApiRootUrl + '/GuestFrequency/BuildAssessInfo', //评估表
  ExecutionAddWorker: NewApiRootUrl + '/GuestFrequency/ConstructionPersonAdd', //上传施工人员信息
  ExecutionSubmit: NewApiRootUrl + '/GuestFrequency/Build_submit', //提交 
  HistoryApplicationSecond:  NewApiRootUrl  +  '/GuestFrequency/BuildQuery',
  HealthBase: NewApiRootUrl + '/healthbase',
  HealthVisitBase: NewApiRootUrl + '/healthvisitbase',
  HealthForm: NewApiRootUrl + '/healthapply',
  HealthVisitForm: NewApiRootUrl + '/healthvisitapply',
  CertificationBase: NewApiRootUrl + '/certificationbase',
  HealthSearch: NewApiRootUrl + '/healthSearch',
  smartService: NewApiRootUrl + '/chatbot',
  smartService0: NewApiRootUrl + '/chatbotwelcome',
  smartService1: NewApiRootUrl + '/resetuserstate',
  smartService2: NewApiRootUrl + '/UserBaseData',
  smartService3: NewApiRootUrl + '/questionsCollect',
  smartService4: NewApiRootUrl + '/chatbotquestionslist',
  smartService5: NewApiRootUrl + '/questionCategary',
  changeLocker: NewApiRootUrl + '/changeLocker', //修改或重置手势密码
  history: JavaApiRootUrl + '/card/history', //历史记录
  today: JavaApiRootUrl + '/card/today', //刷卡明细
  plant: JavaApiRootUrl +'/queryPlantID',//獲取廠別
  stop: JavaApiRootUrl + '/queryAll', //停线通知单基础数据
  stops: JavaApiRootUrl + '/insert', //停线通知单传送数据                              
  VacationSearch: JavaApiRootUrl + '/vocation/query', //可休假查询
  MineMessage: JavaApiRootUrl + '/employee/info',  //我的 详细资料    
  NavList: JavaApiRootUrl + '/homepage/load', //首页导航列表 
  DelNavList:JavaApiRootUrl + '/homepage/delItem',//常用项删除 
  AddNavList:JavaApiRootUrl + '/homepage/addItem',//常用项添加  
  IdleitemsMessage: JavaApiRootUrl + '/IdleGoods/List',//闲置物品首页
  goodsDetalis: JavaApiRootUrl + '/IdleGoods/Detail', //闲置物品详情页
  searchGoods: JavaApiRootUrl + '/IdleGoods/Search', //闲置物品搜索功能
  sendMessage: JavaApiRootUrl + '/IdleGoods/SendMessage', //闲置物品私信功能
  insertCollect: JavaApiRootUrl + '/IdleGoods/InsertCollect', //闲置物品添加我的收藏功能
  collected: JavaApiRootUrl + '/IdleGoods/Collected', //闲置物品查看我的收藏功能
  deletecollect: JavaApiRootUrl + '/IdleGoods/DeleteCollected', //闲置物品我的收藏删除功能
  wantPublish: JavaApiRootUrl + '/IdleGoods/InsertPublished', //闲置物品我要发布功能
  upload:JavaApiRootUrl + '/IdleGoods/Upload', //闲置物品我要发布功能
  minePublish: JavaApiRootUrl + '/IdleGoods/MyPublish', //闲置物品我发布的功能
  deletePublished: JavaApiRootUrl + '/IdleGoods/DeletePublished', //闲置物品删除我发布的功能
  workLicense: JavaApiRootUrl +'/reissue/apply',    //上岗证补办基础数据 
  workSubmit: JavaApiRootUrl +'/reissue/submit',//上岗证补办提交数据
  employingCreatPDF: JavaApiRootUrl +'/jobcretificate/apply',//在职证明提交创建PDF
  employingSendMail: JavaApiRootUrl +'/jobcretificate/sendMail',//在职证明发送邮件
  employingDeleteMail: JavaApiRootUrl +'/jobcretificate/delEnclosure',//在职证明删除邮件
  up: JavaApiRootUrl +'/DLApplySkills/QueryPostCard',    //上岗证接收数据 
  upsend: JavaApiRootUrl +'/DLApplySkills/InsertPostCard',//上岗证送出数据
  upstatus:JavaApiRootUrl +'/DLApplySkills/QueryPostCardSignStatus',//上岗证签核状态
  four: JavaApiRootUrl +'/DLApplySkills/QueryLevel4',  //四级接收数据
  foursend: JavaApiRootUrl +'/DLApplySkills/InsertLevel4', //四级送出数据
  fourstatus:JavaApiRootUrl +'/DLApplySkills/QueryDLSkillSignStatus',//四级签核状态
  eleven: JavaApiRootUrl +'/DLApplySkills/QueryLevel11', //11级接收数据
  elevensend: JavaApiRootUrl +'/DLApplySkills/InsertLevel11',//11级送出数据
  fourstatus:JavaApiRootUrl +'/DLApplySkills/QueryDLSkillSignStatus',//11级签核状态
  twelve: JavaApiRootUrl +'//DLApplySkills/QueryLevel12',//12级接收数据
  twelvesend: JavaApiRootUrl +'/DLApplySkills/InsertLevel12',//12级送出数据
  fourstatus:JavaApiRootUrl +'/DLApplySkills/QueryDLSkillSignStatus',//12级签核状态  
  skill:JavaApiRootUrl +'/DLApplySkills/QueryDLSkill',    //DL技能查询  
  bankApplyData: JavaApiRootUrl +'/bandCard/getBaseData',// 银行卡获取数据
  bankApplyDataSubmit: JavaApiRootUrl +'/bandCard/upload',//  银行卡上传数据  
  shoe: JavaApiRootUrl +'/ShoeCabinet/QueryShoeCabinet',   //鞋柜获取数据  
  questionNaire: JavaApiRootUrl +'/Questionnaire/QueryQuestions',   //员工满意度调查问卷获取    
};
