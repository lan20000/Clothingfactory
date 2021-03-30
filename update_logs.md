# BaseCloud - Release Notes
======================================
#2.2.4
修复日期加减计算默认日期为0时区问题，迁移uniCloud云开发目录。
##2.2.0
1. 增加left-window、top-window，解决PC页面切换闪屏问题，重新设计窗口UI。
2. 菜单管理增加菜单组字段，移除isShow字段。
3. 组件优化。
4. 服务端增加数组合并去重、序列生成器、休眠等工具类方法。

##2.1.11
1. 优化系统报错、路径不存在时的错误信息提示，提示信息更准确。
2. 优化URL化后POST请求参数接收方法，键值对自动转json。
3. 增强getModel()方法，支持获取多层级json键值对参数。
4. call方法增加requestFail回调参数，支持自定义网络请求失败回调函数。
5. 服务端DateKit增加getWeekName(timestamp)方法，获取周几。客户端调用：bcc.date.getWeekName(timestamp)
6. 优化服务端返回响应结果，抛出异常时反馈给客户端，方便调试；客户端callInCache()方法支持全局设置debug输出日志。
7. URL化后将参数注入event，进一步抹平差异。
8. 修复this.md5()方法未定义的bug。
9. 优化系统异常信息反馈提示
10. 修复URL化后，POST请求不设置Content-Type:"application/json"时获取不到请求参数的问题
11. 新增URL化后，在header中设置uniIdToken的支持。

##2.1.8.20200927
优化datepicker组件

##2.1.4.20200923
uploads组件未指定valueKey时，可通过设置parseArray:true来指定提交的value为数组类型

##2.1.3.20200922
增加服务端与客户端token自动刷新机制；更新uni-id版本;修复未注入属性时使用getAttr()方法报错的bug。

升级指南：
1. 更新cloudfunctions > common > base-cloud > lib , index.js , intercepters > loginInter.js ;
2. 更新cloudfunctions > common > uni-id > index.js
3. 更新common > js > base-cloud-client.js
4. base-cloud-config.js 中 uniId 节点增加 `"tokenExpiresThreshold" : 600` 配置项 
5. base-cloud-config.js 中 uniId > service > sms 节点增加 `"verifyCodeTemplateId": "your templateId"` 配置项 
6. 可选择更新cloudfunctions > user-center > user.js，pages > login > login.vue（新特性：客户端自动存储uniIdToken）

##2.1.2.20200921
管理功能：优化用户管理界面功能；优化菜单编辑功能，实时显示左侧菜单数据；
服务端：优化this.save()、this.updateById()方法；修复isNumber()方法判断数组类型数据错误的bug。
客户端：增强客户端this.bcc.clearCache()方法，支持同时清理多个路径缓存；修复数据提交时数组类型数据转换错误的bug；修复isNumber()方法判断数组类型数据错误的bug。

##2.1.1.20200921
setMaxOrderNum方法增加key参数，可指定排序的字段名；增加this.save(Collection , data)方法，保存（data中无_id）与更新（data中有_id）数据；优化conditions、datepicker组件。

##2.1.0.20200919
升级token生成规则，与uni-id保持一致；优化datepicker、conditions组件，修正range时间戳类型时返回起始日期的准确性。

##2.0.6.20200918
修复uploads组件数据回填时报错的bug；增加内置图标；修复用户列表用户名搜索无效bug；

##2.0.5.20200916
增强getDeepValue方法，支持字段名以字符串形式传入；优化conditions组件；
新增this.checkToken()方法、this.createToken(uid)方法；重构loginInter拦截器。

##2.0.2.20200915
1. 修复默认响应结果无效的bug；
2. 修改用户表字段realname_auth，与uni-id新版本保持一致；
3. uploads组件增加width属性，可控制上传文件缩略图宽度；

升级指南：
1. 全文搜索realNameAuth替换为：realname_auth，涉及文件：user.js、userEdit.vue、userList.vue、setting.vue;
2. 覆盖 cloundfunctions > common > base-cloud > index.js 文件；
3. 覆盖 components > uploads 组件。

##2.0.0.20200913
1.移除uni-id依赖，新建BaseCloud对象时增加uniID参数，如传入该参数，使用setConfigs方法动态修改配置项时，将可同时修改uniID的配置项。
2.移除uniID依赖，重构loginInter拦截器。
3.新增user-center云函数，用于用户相关API，将云函数admin下的user.js移至该云函数下。
4.将内置函数方法函数挂载于uniClound对象上，在任意位置可使用uniCloud.baseCloud来调用内置函数方法。
5.新增md5、sha1、hmac、aesEncrypt、aesDecrypt等常用加密方法；
6.增强multiply方法，支持同时传入多个变量相乘；
7.增强deepMerge方法，支持同时深度合并多个对象；
8.增加token生成与校验相关的jwt.decode、jwt.encode方法；
9.修复云函数多级目录的路由中不支持导出单函数的bug；
10.修复用户筛选查询条件不生效的bug；
11.修复菜单数据只显示20条的bug；

##1.6.1.20200908
拓展uploads组件，支持zip类型文件上传；拓展files组件，支持zip类型文件显示。

##1.6.1.20200908
优化copy组件、datepicker组件；优化toStr函数，兼容10位时间戳。

##1.6.0.20200905
优化layout组件，H5端显示退出和设置菜单，增加innerScroll属性。

##1.5.9.20200905
优化菜单模块，编辑菜单时增加级联菜单选择，增加菜单展示平台选项。优化conditions组件、labels组件、layout组件；更新db_init.json数据库初始化文件。

##1.5.8.20200904
操作日志改为前端转换日期，日期组件增加返回类型属性，可指定为timestamp类型。

##1.5.7.20200903
修复范围查询分页只指定数据库字段时查询报错的bug；增加multiply方法，用于两数相乘。

##1.5.6.20200903
管理后台界面适配移动端

##1.5.5.20200902
修复URL化POST请求接收纯字符串类参数时被处理为json的bug

##1.5.3.20200831
新增results和price组件

##1.5.2.20200831
增加内置图标;修复返回undefined时未处理默认响应结果的bug；

##1.5.1.20200830
修复URL化后，POST请求接收XML数据错误的问题。

##1.5.0.20200829
修复客户端缓存中对象值被更改后缓存错乱的bug。

##1.4.9.20200829
[优化]URL化后。POST请求下自动转换queryString类型的body为参数；[优化]业务函数返回除undefined、true、false外的非json类型的响应结果时，不做默认响应处理。

##1.4.8.20200828
增加内置图标；修复URL化后，POST请求下接收非json类参数报错的bug；

##1.4.7.20200827
增加getDeepValue方法，深度获取json值；增加deepMerge方法，深度合并json对象;修复isState方法的bug

##1.4.6.20200827
增加this.setConfigs()方法，方便每个云函数单独定义配置项。

##1.4.5.20200827
增加用于URL化的基础云函数curl，增加路由开放与禁止外部访问方案示例；拦截器支持默认响应结果；更新uni-id版本；

路由禁止使用相对路径访问业务函数目录外的其他目录；增加内置图标；组件兼容非H5端（暂未适配）。
访问路由中禁止使用相对路径访问，防止访问其他业务函数根目录以外的目录，增强云函数的安全性。

## 1.4.3.20200826
全局开启默认响应结果后，可在业务函数中临时关闭默认响应结果；业务函数返回state状态描述时，不再进行默认响应处理。使用this.forward()转发请求时，也进行默认响应结果处理。
新增isState()、isOk()、isFail()方法，用于判定响应结果。
更改云函数URL化后指定访问路由的方式，详见文档：[云函数URL化](http://localhost:8081/#/pages/functions/url)

默认响应结果，增加指定dataKey配置项，可自定义默认返回数据结构。

上传组件中的删除文件回调增加index和file数据。

完善内置图标库，使用文档：

## 如果你想入手云开发，本框架是绝佳的学习素材和项目快速搭建方案，加群交流：649807152
新增this.forward()方法，可直接在云函数内，转发请求到不同的路由下；优化内置属性this.configs，将内部属性设置为只读，避免配置项数据随意篡改而引起的混乱。

新增uploads组件，支持图片、音频、视频直传云存储；新增files组件，预览音频、视频、图片文件。增加图片文件加载中、加载失败状态显示。

## 1.2.8.20200822
增强upload-images组件，支持json数组类型的value，@change回调增加图片文件详细信息数据。
## 1.2.6.20200820
修复拦截器传递参数的bug；修复自定义路由模式下未自定义路由报错的bug；优化selects、multi-selects、layout、conditons、inputs等组件的样式。
## 1.2.0.20200819
1. 新增云函数url访问支持；
2. 新增访问路径重命名配置；
3. 优化菜单模块功能；
4. 优化layout组件。

## 1.1.9.20200818

优化弹窗组件、layout组件、auth-btn组件；优化菜单管理模块，新增编辑菜单改为弹窗模式，增加菜单折叠展开功能。

## 1.1.8.20200817
paginate()方法增加collectionName参数，可以只指定集合名称。
this.getPage()方法增加dataInDb可选参数，list和dataInDb二选一传入。
更新mores组件，增加auto属性，可以控制是否默认展开。
新增alerts弹窗组件

## 1.1.6.20200817
1. setMaxOrderNum方法增加步长参数，默认为10，自动生成排序序号后，方便插入新的序号排序。如果需要自增排序，将步长设置为1即可。
2. 修复表单重置后radios组件无法赋值的问题。

## 1.1.5.20200815
	* 【PC端组件】
	+修复`radios`组件`titleName`偶然无法传值的bug
	*新增tag标签样式类
	*layout组件的title属性改为选填，不填写自动为菜单路径；
	*pc端网页的标题无需在pages.json中配置，根据菜单自动生成。
	*客户端sdk增加日期操作函数；
	*优化用户、角色、菜单等基础业务模块代码，admin/menu/getParentList 改名为： admin/menu/listByType ，如更新基础业务模块，请重新配置admin/menu/getParentList权限的路径名称。

## 1.1.4.20200815
* 【base-cloud 云函数公共模块】
	增强分页查询方法`this.paginate()` ，支持动态区间查询条件。
	增加分页数据组装接口`this.getPage()`
	
## 1.1.3.20200815
* 【base-cloud-client.js 客户端sdk】
  + `this.bcc.call()`增加调试模式配置项，开启调试模式后，将在控制台输出请求的路径和参数（仅开发模式下有效，编译发布后不会输出），提升开发调试效率。
  + `this.bcc.call()`增加表单提交参数值类型自动转换配置项，增强自动转换参数值类型
  + `this.bcc.submit()`增加表单自动校验提交时，自动转换参数值类型配置项

* 【PC端组件】
  + 修复 `paginate` 组件显示省略号太多的bug
  + `conditions` 组件增加外显表单数量属性，可以控制外显的筛选表单数量。修复日期重置时，结束日期未重置的bug。

