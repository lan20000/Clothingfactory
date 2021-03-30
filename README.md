## 项目简介
BaseCloud是一套基于uniapp、uniCloud、uni-id的全栈开发框架，不依赖任何第三方框架，极度精简轻巧。

在开发前端界面时，除了适配移动端外，它对PC端也做了良好的适配；

在开发云函数时，它可以为您提供拦截器配置、路由管理、分页、列表、单数据快速查询等功能。除此之外，对于一些业务开发中的常用函数也已做好封装，拿来即用。

在BaseCloud的初始化项目模板中，为您实现了贯穿前后端的业务模块：管理员登录、用户管理、菜单管理、角色与权限管理、操作日志、系统参数配置等项目通用的基础后台管理功能，这一切全都基于云函数开发。

## 项目价值
基于BaseCloud的快速开发UI样式库，可以快速拼装前端界面，高还原度实现设计图效果，兼顾高效与灵活。

基于BaseCloud的云函数公用模块，你可以轻松实现单云函数、多云函数的路由管理、请求拦截管理与权限控制、常用业务函数快速开发。

基于BaseCloud的客户端缓存管理机制，你可以大幅度减少应用的云函数重复调用请求，未来云函数开始计费后，至少节省应用50%的流量费用。

基于BaseCloud的管理后台基础项目框架，你可以快速初始化一套自带用户、菜单、角色、权限、操作日志、系统参数管理的管理后台项目，在此基础上开始你的项目开发。

当然，这一切都只是刚刚开始，未来我们会基于BaseCloud推出更多贯穿前后端的业务模板，只要您的项目是基于BaseCloud框架，所有的业务模板拿来即用，5分钟快速集成到项目内，无需重复开发前端和后端。

对于开发者而言，基于BaseCloud的全栈快速开发框架，你可以封装自己的贯穿前后端的业务模块，发布到付费业务模块插件市场。
对于企业而言，基于BaseCloud的全栈快速开发框架，无需再费心招募不同工种不同技术栈的工程师，您只需要找到熟悉BaseCloud的工程师，让他们各自独立负责一个业务模块。 未来基于BaseCloud的项目，将会被拆分成几十个甚至上百个独立的模块，每个模块由一个工程师从前端到后端全链路负责，而他只需要懂一门开发语言：javascript，熟悉一个框架：BaseCloud。 项目交付后，您更无须担心后期维护与迭代更新，基于BaseCloud统一的开发规范，您可以很轻松找到随时能够接管您的项目的工程师。

## 使用说明文档

[BaseCloud快速上手使用说明文档 << ](https://docs.base-cloud.joiny.cn/#/pages/functions/aboutUs)

## 安装方式

方式一：插件市场使用HbuilderX导入示例项目。

方式二：从Gitee clone：[Gitee链接，欢迎star、fork，关注最新动态 << ](https://gitee.com/phoooob/BaseCloud)

```js
https://gitee.com/phoooob/BaseCloud.git
```

方式三：从npm安装：[npm地址 << ](https://www.npmjs.com/package/basecloud)

```js	
npm i basecloud
```

## 更新升级

[BaseCloud一键更新升级方法说明 << ](https://docs.base-cloud.joiny.cn/#/pages/functions/fastUpdate)

## 业务模块快速集成 - 持续开发中

1. [用户端-手机号码登录业务模块 << ](https://ext.dcloud.net.cn/plugin?id=295)
2. [用户端-APP版本检测更新业务模块（含管理端功能） << ](https://ext.dcloud.net.cn/plugin?id=2510)
3. [管理端-数据字典业务模块 << ](https://ext.dcloud.net.cn/plugin?id=2582)
4. [统一下单支付业务模块 << ](https://ext.dcloud.net.cn/plugin?id=2668)

## BaseCloud项目构成

1. `common>base-cloud.scss` 基础样式库，适配移动端和PC端，22kb。
2. `common>js>base-cloud-client.js` 客户端SDK，14.2kb。
3. `cloudfunctions>common>base-cloud` 云函数公共模块，13.9kb。
4. `components` PC端常用业务组件目录

## 项目预览

[管理后台演示项目地址：https://base-cloud.joiny.cn <<](https://base-cloud.joiny.cn)

账号：admin
密码：123123123

## 快速开始

1. 请先下载BaseCloud管理后台项目模板，并导入到Hbuilder中
2. 右键点击cloudfunctions目录，选择一个服务空间，支持阿里云、腾讯云。
3. 找到cloudfunctions目录下的db_init.json数据库初始化文件，右键选择“初始化数据库”。
4. 右键点击cloudfunctions目录，选择上传所有云函数以及公共模块。
5. 点击运行到浏览器，运行成功后，在浏览器中进入登录页，初始账号：admin ，初始密码：123123123
6. !!!!特别注意：如果您初次从插件市场导入项目，由于npm install创建的软链接失效，修改公共模块中的代码将不会同步更新到云函数中，
例如：修改`common > base-cloud > config.js` 中的拦截器配置信息，`amdin`函数中的`node_modules > base-cloud > config.js` 可能不会同步更改，
如果遇到这种情况请删除`admin > node_modules `和`admin > package-lock.json`,然后重新安装`admin`函数的公共模块：

>在要引入公用模块的云函数目录，执行npm init -y生成package.json文件。 执行npm install ../common/base-cloud引入base-cloud模块。


## BaseCloud用户交流QQ群：

如果你想入手云开发，本框架是绝佳的学习素材和项目快速搭建方案，学习过程中有问题，快来群里提问，专业客服妹子秒回复。

群号：649807152

[点击链接，直接加入qq群 << ](https://qm.qq.com/cgi-bin/qm/qr?k=upb9fG80Wpsls_At8ZI01QTqDu_0KyUL&jump_from=webapi)

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-base-cloud/e699d5d0-ddd7-11ea-9dfb-6da8e309e0d8.png)


## 项目结构介绍

请务必对照仔细浏览项目目录介绍，您阅读本项目的文档将会事半功倍。

#### 服务端项目目录

```html
├── cloudfunctions───────────# 云函数目录
│ 		└── admin──────────────────# 管理后台业务函数
│			  └── controller──────────────────# 管理后台业务函数根目录
│					└── menu.js────────────────────────# 菜单管理业务函数
│					└── operateLog.js──────────────────# 操作日志业务函数与接口
│					└── paramConfig.js─────────────────# 系统参数配置业务函数
│					└── role.js────────────────────────# 角色管理业务函数
│			  └── node_modules──────────────────# admin函数依赖公共模块
│			  └── index.js──────────────────────# admin函数入口文件
│ 		└── api────────────────────# 用户端业务函数
│ 		└── user-center────────────# 用户相关业务函数
			└── user.js────────────────────────# 用户管理业务函数
│ 		└── clearlogs──────────────# 过期操作日志清理定时任务函数
│ 		└── curl──────────────# URL化云函数
│ 		└── common─────────────────# 公共模块
│				└── base-cloud──────────────────# base-cloud公共模块
│						└── intercepters──────────────────# 拦截器函数目录
│								└── loginInter.js─────────────────# 用户登录状态拦截拦截函数
│								└── authInter.js──────────────────# 用户权限拦截拦截函数
│						└── base-cloud-config.js──────────────────# 公共模块配置文件，注册全局拦截器（重要！）		
│						└── index.js──────────────────────# BaseCloud公共模块源码，开发阶段无需关心	
│		└── db_init.json───────────# 数据库初始化文件，包含数据表和初始化数据
```

#### 客户端项目目录

```html
├── cloudfunctions────────# 云函数目录...
├── common────────────────# 静态资源文件目录
│ 		└── js──────────────────# js文件目录
│			  └── base-cloud-client.js─────────────────# BaseCloud客户端SDK
│			  └── clipBoard.js─────────────────────────# 支持web端复制API
│			  └── md5.js───────────────────────────────# MD5加密函数，用于密码加密传输，客户端数据缓存等场景
│ 		└── base-cloud.scss────────────────────# BaseCloud样式类库入口文件
│ 		└── base-cloud-font.scss───────────────# BaseCloud图标样式文件
│ 		└── base-cloud-mobile.scss─────────────# BaseCloud移动端样式文件
│ 		└── base-cloud-pc.scss─────────────────# BaseCloud适配PC端样式文件
├── pages────────────────# 页面
├── static───────────────# 图片静态资源文件目录
├── uni.scss─────────────# scss变量配置文件
```

#### 管理后台业务模块云函数目录结构

```html
├── cloudfunctions─────────────────# 云函数目录
		└── user-center──────────────────# 用户相关业务函数
│				└── controller──────────────────# 用户相关业务函数根目录
						└── user.js────────────────────────# 用户管理业务函数
│								└── login()──────────────────────────# 登录接口
│								└── checkToken()─────────────────────# token验证接口
│								└── logout()─────────────────────────# 退出登录接口
│								└── changeStatus()───────────────────# 切换用户禁用状态接口
│								└── info()───────────────────────────# 用户信息查询接口
│								└── save()───────────────────────────# 保存、更新用户信息接口
│								└── myInfo()─────────────────────────# 当前用户信息接口
│								└── modify()─────────────────────────# 修改当前用户信息(含密码)接口
│								└── list()───────────────────────────# 用户列表查询接口
│								└── delete()─────────────────────────# 删除用户接口
│ 		└── admin──────────────────# 管理后台业务函数
│				└── controller──────────────────# 管理后台业务函数根目录
│						└── menu.js────────────────────────# 菜单管理业务函数
│								└── listByType()─────────────────────# 根据菜单类型查询菜单列表接口
│								└── globalData()─────────────────────# 查询登录用户信息、权限菜单列表接口
│								└── info()───────────────────────────# 查询菜单信息接口
│								└── save()───────────────────────────# 保存、更新菜单信息接口
│								└── delete()─────────────────────────# 删除菜单信息接口
│								└── list()───────────────────────────# 菜单列表查询接口
│						└── operateLog.js──────────────────# 操作日志业务函数与接口
│						└── paramConfig.js─────────────────# 系统参数配置业务函数
│								└── info()───────────────────────────# 查询参数配置项信息接口
│								└── save()───────────────────────────# 保存、更新参数配置项信息接口
│								└── delete()─────────────────────────# 删除参数配置项接口
│								└── list()───────────────────────────# 参数配置项列表查询接口
│						└── role.js────────────────────────# 角色管理业务函数
│								└── info()───────────────────────────# 查询角色信息接口
│								└── save()───────────────────────────# 保存、更新角色信息接口
│								└── delete()─────────────────────────# 删除角色接口
│								└── list()───────────────────────────# 角色列表查询接口
│								└── options()────────────────────────# 角色选项列表查询接口（供用户角色选择时使用）
│						
│				└── node_modules──────────────────# admin函数依赖公共模块
│				└── index.js──────────────────────# admin函数入口文件
```


## PC端组件使用说明文档

#### 【auth 组件】

>用于用户权限控制，当用户拥有操作权限时展现，否则不展现该元素。

>关于权限控制的业务逻辑：用户登录成功后，读取该用户所属角色拥有的权限菜单列表，存储到本地，键名为menuList，权限判断就是基于menuList进行的判断。

|属性	|必填	|默认值	|可选值	|示例值	|说明	|
|--	|--	|--	|--	|--	|--	|
|url	|是	|无	|	|user-center/user/save	|权限路径,该路径可包含参数，需在t_menu表中已添加数据	|
|noAuth	|否	|false	|true|false	|无权限时展现	|
|isInline	|否	|true	|true|false	|是否内联元素，如需以其他display方式展示时，设置为false，组件内部不再追加display:inline-block内联样式。|

```html
<auth url="user-center/user/save">

   <navigator url="/pages/user/userEdit">编辑</navigator>	
   
</auth>
```


#### 【auth-btn 组件】


>用于用户权限控制，当用户拥有操作权限时展现，否则不展现该元素。点击按钮时，会发送请求。


|属性	|必填	|默认值	|可选值	|示例值	|说明	|
|--	|--	|--	|--	|--	|--	|
|url	|是	|无	|	|user-center/user/changeStatus?id=1	|发送请求的路径，可以携带参数	|
|params	|否	|无	|json类型	| :params="{id:1}"	|发送请求时携带的参数	|
|noAuth	|否	|false	|true|false	|无权限时展现	|
|isInline	|否	|true	|true|false	|是否内联元素，如需以其他display方式展示时，设置为false，组件内部不再追加display:inline-block内联样式。	|
|confirm	|否	|无	||confirm="delete"	|发送请求之前的确认文字，如果是删除类请求需要确认，可以简写为delete	|
|alert	|否	|无	||	|请求成功后弹窗的文字	|
|showFail	|否	|true	||	|请求失败后，是否提示服务端返回的msg字段	|
|@success	|否	|无	||	|请求成功后回调函数	|
|@fail	|否	|无	||	|请求失败后回调函数	|

```html
<auth-btn url="user-center/user/changeStatus" :params="{id:1}">
   禁用
</auth-btn>
```

#### 【auth-nav 组件】


>用于用户权限控制，当用户拥有操作权限时展现，否则不展现该元素。点击按钮时，会进行页面跳转。


|属性	|必填	|默认值	|可选值	|示例值	|说明	|
|--	|--	|--	|--	|--	|--	|
|url	|是	|无	|	|user-center/user/changeStatus?id=1	|是否具有权限的路径	|
|noAuth	|否	|false	|true|false	|无权限时展现	|
|isInline	|否	|true	|true|false	|是否内联元素，如需以其他display方式展示时，设置为false，组件内部不再追加display:inline-block内联样式。	|
|href	|是	|无	|  | 	|要跳转的页面的链接，可以包含参数	|

```html
<auth-nav :href="`/pages/user/userEdit?id=${item._id}`" url="user-center/user/save" >
   编辑
</auth-nav>
```

#### 【switch-btn 组件】
>用于权限控制的开关切换按钮，无权限仅展示，不可发送请求。

|属性	|类型	|说明	|
|--	|--	|--	|
|url	|String	|权限地址，也是点击切换时的请求地址，可以携带参数，如无地址或无权限，则不可点击	|
|params	|json	|请求参数，有权限时，点击切换即可发送请求	|
|checked	|Boolean	|开关是否打开	|
|disabled	|Boolean	|开关是否禁用	|
|color	|String	|颜色，默认#07c160	|

#### 【switchs 组件】
|属性	|类型	|说明	|
|--	|--	|--	|
|name	|String	|表单的name|
|value	|Boolean	|开关是否打开	|
|tip	|String	|开关右侧的提示文字	|
|disabled	|Boolean	|开关是否禁用	|
|color	|String	|颜色，默认#000	|
|title	|String	|表单标题，不要标题，请设置titleWidth=0	|
|titleWidth|Number	|表单的左侧标题占位的宽度	|
|isVertical|Boolean	|标题和开关是否垂直排列	|
|@change	|	|checked 改变时触发 change 事件，event.detail={ value:checked}	|

#### 【checkboxs 组件】

>复选框组件，用于多选，支持v-model

|属性	|必填	|默认值	|可选值	|示例值	|说明	|
|--	|--	|--	|--	|--	|--	|
|title	|否	|	|	|	|表单标题，不要标题，请设置titleWidth=0	|
|titleWidth	|否	|90	|数值即可	|100	|复选框表单的左侧标题占位的宽度	|
|name	|是	|	|	|	|表单的name	|
|titleName	|否	|	|	|	|如果需要选中选项的标题也传服务端，请定义该字段	|
|value	|否	|	|	|value='1,2,3,5'	|表单的value，支持v-model绑定，可以是数组，也可以是用英文逗号分开的多个值	|
|list	|是	|	|	|[{title:"搞笑",value:1},{title:"言情",value:2}]	|选项列表，数组	|
|titleKey	|否	|title	|	|	|选项列表中，对用户展示的文字的键值对的键名	|
|valueKey	|否	|value	|	|	|选项列表中，对作为选项值的键值对的键名	|
|disabledKey	|否	|disabled	|	|	|选项列表中，表示当前选项禁用的键值对的键名	|
|color	|否	|#0e0d0c	|	|	|复选框的颜色	|
|isVertical	|否	|false	|	|	|标题和复选框是否垂直排列	|
|@change	|	|	|	|	|当选项发生改变时触发的回调函数	|

```html
<checkboxs title="角色" :list="roleList" name="x.roleIds|请选择角色" :value="data.roleIds" 
titleName="x.roleNames" titleKey="name" valueKey="_id"></checkboxs>
```

#### 【radios 组件】

>单选框组件，用于单选，支持v-model

|属性	|必填	|默认值	|可选值	|示例值	|说明	|
|--	|--	|--	|--	|--	|--	|
|title	|否	|	|	|	|表单标题	|
|titleWidth	|否	|90	|数值即可	|100	|左侧标题的宽度	|
|name	|是	|	|	|	|表单的name	|
|titleName	|否	|	|	|	|如果需要选中选项的标题也传服务端，请定义该字段	|
|value	|否	|	|	|	|表单的value，支持v-model绑定	|
|list	|是	|	|	|[{title:"搞笑",value:1},{title:"言情",value:2}]	|选项列表，数组	|
|titleKey	|否	|title	|	|	|选项列表中，对用户展示的文字的键值对的键名	|
|valueKey	|否	|value	|	|	|选项列表中，对作为选项值的键值对的键名	|
|disabledKey	|否	|disabled	|	|	|选项列表中，表示当前选项禁用的键值对的键名	|
|color	|否	|#000	|	|	|复选框的颜色	|
|isVertical	|否	|false	|	|	|标题和复选框是否垂直排列	|
|defaultFirst	|否	|true	|	|	|当value无值时，是否默认选中第一个选项	|
|@change	|	|	|	|	|当选项发生改变时触发的回调函数	|

```html
<radios title="菜单类型" :list="menuTypeList" :value="data.type" 
name="x.type|菜单类型" @change="chooseMenuType"></radios>
```

#### 【multi-selects 组件】

>下拉多选组件，用于多选，支持v-model，可以搜索关键字筛选

|属性	|必填	|默认值	|可选值	|示例值	|说明	|
|--	|--	|--	|--	|--	|--	|
|title	|否	|	|	|	|表单标题	|
|titleWidth	|否	|90	|数值即可	|100	|左侧标题的宽度	|
|name	|是	|	|	|	|表单的name	|
|titleName	|否	|	|	|	|如果需要选中选项的标题也传服务端，请定义该字段	|
|value	|否	|	|	|value='1,2,3,5'	|表单的value，支持v-model绑定,可以是数组，也可以是用英文逗号分开的多个值	|
|list	|是	|	|	|[{title:"搞笑",value:1},{title:"言情",value:2}]	|选项列表，数组	|
|titleKey	|否	|title	|	|	|选项列表中，对用户展示的文字的键值对的键名	|
|valueKey	|否	|value	|	|	|选项列表中，对作为选项值的键值对的键名	|
|remarkKey	|否	|remark	|	|	|选项列表中，对作为副标题的键值对的键名	|
|disabledKey	|否	|disabled	|	|	|选项列表中，表示当前选项禁用的键值对的键名	|
|color	|否	|#0e0d0c	|	|	|颜色	|
|isVertical	|否	|false	|	|	|标题和选择框是否垂直排列	|
|@change	|	|	|	|	|当选项发生改变时触发的回调函数	|

```html
<multi-selects title="角色" :list="roleList" name="x.roleIds|请选择角色" 
:value="data.roleIds" titleName="x.roleNames" titleKey="name" valueKey="_id"></multi-selects>
```


#### 【selects 组件】

>下拉单选组件，用于单选，支持v-model，可以搜索关键字筛选

|属性	|必填	|默认值	|可选值	|示例值	|说明	|
|--	|--	|--	|--	|--	|--	|
|title	|否	|	|	|	|表单标题	|
|titleWidth	|否	|90	|数值即可	|100	|左侧标题的宽度	|
|name	|是	|	|	|	|表单的name	|
|titleName	|否	|	|	|	|如果需要选中选项的标题也传服务端，请定义该字段	|
|value	|否	|	|	|	|表单的value，支持v-model绑定	|
|list	|是	|	|	|[{title:"搞笑",value:1},{title:"言情",value:2}]	|选项列表，数组	|
|titleKey	|否	|title	|	|	|选项列表中，对用户展示的文字的键值对的键名	|
|valueKey	|否	|value	|	|	|选项列表中，对作为选项值的键值对的键名	|
|remarkKey	|否	|remark	|	|	|选项列表中，对作为副标题的键值对的键名	|
|disabledKey	|否	|disabled	|	|	|选项列表中，表示当前选项禁用的键值对的键名	|
|color	|否	|#0e0d0c	|	|	|颜色	|
|isVertical	|否	|false	|	|	|标题和选择框是否垂直排列	|
|@change	|	|	|	|	|当选项发生改变时触发的回调函数	|

```html
<selects title="父级菜单" :list="parentMenuList" name="x.parentId" 
:value="data.parentId" titleKey="name" valueKey="_id"></selects>
```

#### 【inputs 组件】

>输入框组件，type支持hidden类型，输入框有内容时，可以点击清空图标清空。

|属性	|必填	|默认值	|可选值	|示例值	|说明	|
|--	|--	|--	|--	|--	|--	|
|title	|否	|	|	|	|表单标题	|
|titleWidth	|否	|90	|数值即可	|100	|左侧标题的宽度	|
|name	|是	|	|	|	|表单的name	|
|value	|否	|	|	|	|表单的value，支持v-model绑定	|
|hiddenValue	|否	|	|	|	|传入该值时，输入框将变为禁用状态，对用户展示value的值，hiddenValue将会传到服务端	|
|type	|否	|text	|text、number、hidden	| |表单类型，支持hidden	|
|addOn	|否	|	|	|	|输入框右侧的文字块的文字	|
|addOnLeft	|否	|	|	|	|输入框左侧的文字块的文字	|
|isVertical	|否	|false	|	|	|标题和输入框是否垂直排列	|
|showClearIcon	|否	|true	|	|	|是否显示清空图标	|
|@tapAddOn	|	|	|	|	|当点击输入框右侧文字块时触发的回调函数	|
|@tapAddOnLeft	|	|	|	|	|当点击输入框左侧文字块时触发的回调函数	|
|其他属性与事件	|	|	|	|	|与input组件一致	|

```html
<inputs name="x.name|用户名" title="用户名" :value="data.name" :hiddenValue="data._id"></inputs>
```

#### 【textareas 组件】

|属性	|必填	|默认值	|可选值	|示例值	|说明	|
|--	|--	|--	|--	|--	|--	|
|title	|否	|	|	|	|表单标题	|
|titleWidth	|否	|90	|数值即可	|100	|左侧标题的宽度	|
|name	|是	|	|	|	|表单的name	|
|value	|否	|	|	|	|表单的value，支持v-model绑定	|
|isVertical	|否	|false	|	|	|标题和文本框是否垂直排列	|
|showClearIcon	|否	|true	|	|	|是否显示清空图标	|
|autoHeight	|否	|false	|	|	|是否自适应高度	|
|height	|否	|100	|	|	|非自适应高度时的高度	|
|其他属性与事件	|	|	|	|	|与textarea组件一致	|

```html
<textareas title="权限地址" @blur="inputBlur" name="x.url|权限地址" 
:value="data.url" placeholder="多个权限地址请用英文分号隔开"></textareas>
```

#### 【datepicker 组件】

|属性	|类型	|说明	|
|--	|--	|--	|
|showIcon	|Boolean	|是否显示右侧的日历图标，默认true	|
|name	|String	|表单的name	|
|endName	|String	|表单的endName，如果是时间范围，表示结束时间的name	|
|value	|String,Array	|默认选中的日期，也是提交表单时的默认值，支持数组，如果是字符串的话，可以是用英文逗号分开的两个时间（开始和结束时间）	|
|name	|String	|表单的name	|
|valueType	|String	|表单的value的类型，string | timestamp ，type为time时无效，默认为string	|
|placeholder	|String	|未选择日期时，显示的文字	|
|color	|String	|日历的颜色	|
|showSeconds	|Boolean	|是否显示秒	|
|type	|String	|时间类型：rangetime、range、time、date、datetime	|
|format	|String	|初始日期格式	|
|showHoliday	|Boolean	|显示公历节日	|
|showTips	|Boolean	|显示提示	|
|beginText	|String	|开始时间的文字，默认为：开始	|
|endText	|String	|结束时间的文字，默认为：结束	|
|title	|String|表单标题	|
|titleWidth	|Number|左侧标题的宽度	|
|isVertical	|Boolean|标题和文本框是否垂直排列	|

#### 【conditions 组件】

>分页筛选条件组件

|属性	|必填	|默认值	|可选值	|示例值	|说明	|
|--	|--	|--	|--	|--	|--	|
|list	|否	|	|	|{title:"用户名",name:"name"},{title:"状态",name:"status",type:"select",list:[]}	|筛选条件,数组，基本属性为：name、title、type、list，详见/pages/user/userList示例	|
|conditions	|否	|{}	|json	|	|当前的筛选条件	|
|confirmText	|否	|筛选	|	|	|筛选按钮的文字	|
|showFirst	|否	|false	|	|	|是否对外显示第一个筛选项	|
|showCount	|否	|0	|	|	|对外显示前面多少个筛选项	|
|@confirm	|	|	|	|	|确认筛选时的回调事件，`e.conditions`	|

```html
<conditions :conditions="conditions" :list="conditonList" @confirm="submitSearch"></conditions>
```

```js
data() {
	return {
		conditonList:[
			{title:"用户名",name:"name"}, //默认是输入框类型的，只需提供这两个属性即可
			//如果是下拉选择类型的，则需要提供list属性，两个键值对：title、value
			{title:"状态",name:"status",type:"select",list:[{title:"正常",value:0},{title:"禁用",value:1}]}, 
			//日期类型的筛选条件：可以配置name和endName，表示开始和结束时间，timeType是指日期格式，valueType可选为string字符串类型或timestamp时间戳类型（推荐）：
			/**
			 * rangetime 时间范围，精确到分钟
			 * range 时间范围，精确到天
			 * time 时间，小时：分钟
			 * date 日期，年-月-日
			 * datetime 日期时间，精确到分钟
			 */
			//showSeconds属性表示是否显示秒，任何日期格式都可以搭配这个属性使用。
			{title:"时间",name:"startTime",endName:"endTime",type:"time",timeType:"rangetime",showSeconds:true,valueType:'timestamp'},
		],
		conditions:{
			name : ""
		}
	}
},
```

#### 【copy 组件】

>一键复制的功能

|属性	|说明	|
|--	|--	|
|text	|要复制的文字内容	|
|showIcon	|文字右侧是否显示复制图标，默认true	|

```html
<copy :text="data.text" :showIcon="false"></copy>
```

#### 【empty 组件】

|属性	|类型	|说明	|
|--	|--|--	|
|list	|Array	|列表数据，用于判断是否为空，展示数据为空的提示	|
|loading|Boolean		|是否加载中，加载中的时候，会显示加载中的动画	|
|tips	|String	|当数据为空时的提示文字，默认：抱歉，暂无数据~	|

```html
<empty :list="list" :loading="loading"></empty>
```

#### 【images 组件 - 已废弃，由files组件替代】

>图片显示、预览组件

|属性	|类型	|说明	|
|--	|--|--	|
|width	|Number	|图片的宽度	|
|isRound|Boolean		|是否是圆形图片，否则是方形图片，默认false	|
|list	|String，Array	|要展示的图片列表，可以是图片链接数组，也可以是英文逗号分开的多个图片链接，如果是json数组，需要指定valueKey	|
|valueKey	|String	|要展示的图片数据如果是json数组，可以通过该属性指定json数据中的哪个键名为图片链接	|
|count	|Number	|要展示的图片的匹数，超出匹数不展示，-1为不限制，默认-1	|
|disabled	|Boolean	|是否显示右上角的删除按钮，是否可以编辑，默认false	|
|@remove	|	|当删除图片时触发回调	|

#### 【files 组件 】

>文件显示、预览组件，支持图片、视频、音频三种类型的文件

|属性	|类型	|说明	|
|--	|--|--	|
|width	|Number	|宽度	|
|type	|String	|类型：image、video、audio、pdf、apk、zip，默认为image	|
|width	|Number	|宽度，单位px，默认80|
|isRound|Boolean		|是否是圆形，否则是方形，默认false	|
|list	|String，Array	|要展示的文件列表，可以是文件链接数组，也可以是英文逗号分开的多个文件链接，如果是json数组，需要指定valueKey	|
|valueKey	|String	|要展示的文件数据如果是json数组，可以通过该属性指定json数据中的哪个键名为文件链接	|
|count	|Number	|要展示的文件的匹数，超出匹数不展示，-1为不限制，默认-1	|
|disabled	|Boolean	|是否显示右上角的删除按钮，是否可以编辑，默认false	|
|@remove	|	|当删除文件时触发回调	|

#### 【labels 组件】

>表单标题组件，主要为了对齐其他的表单布局使用

|属性	|必填	|默认值	|可选值	|示例值	|说明	|
|--	|--	|--	|--	|--	|--	|
|title	|否	|	|	|	|表单标题	|
|titleWidth	|否	|90	|数值即可	|100	|左侧标题的宽度	|
|isVertical	|否	|false	|	|	|标题和文本框是否垂直排列	|
|isTop	|否	|false	|	|	|标题与右侧是否顶部对齐，否则垂直对齐	|

#### 【layout 组件】

>布局组件，所有页面使用

|属性	|类型	|说明	|
|--	|--|--	|
|title	|String	|当前页面的标题	|
|loading|Boolean		|是否加载中，加载中的时候，会显示加载中的动画	|
|innerScroll|Boolean		|区域内容是否内部滚动，默认true	|
|pageKey	|String	|当前页面的唯一标识，用于左侧菜单显示选中状态	|
|slot="titleLeft"	|	|标题行左侧位置的插槽	|
|slot="titleRight"	|	|标题行右侧位置的插槽	|

#### 【mores 组件】

>当文本内容为多行时，只显示一行，点击该文字，可以展示显示全部，再次点击则收起。

```html
<mores>{{item.content}}</mores>
```


#### 【paginate 组件】

>分页器组件，需要传入pageNumber（页码）属性和page（分页数据）属性。其中page属性详细结构如下，在BaseCloud的公共模块已对分页数据做了封装，直接调用即可返回该数据结构：

```js
page: {
	pageNumber: 1, //页码
	lastPage: true, //是否最后一页
	totalPage: 1, //总页码
	list: [], //列表数据
	totalRow: 0, //总数据条数
	pageSize: 10 //每页条数
},
```

>该组件会触发一个回调函数@switchPage，返回数据结构如下：

```js
{
	pageSizeChanged : true , //每页数据条数是否切换
	pageNumber :  1 , //页码
	pageSize : 5 //每页数据条数
}
```

#### 【tables 组件】

|属性	|类型	|说明	|
|--	|--|--	|
|list	|Array	|列表数据	|
|showEmpty	|Boolean	|如果列表数据为空，是否展示暂无数据提示	|
|slot="thead"	|	|表格的标题栏，无须写tr	|
|slot="tbody"	|	|表格的内容	|


```html
<tables :list="list">
	<block slot="thead">
		<th>角色名称</th>
		<th>类型</th>
		<th class="autoWidth">权限描述</th>
		<th>操作</th>
	</block>
	<block slot="tbody">
		<tr v-for="( x , index) in list" :key="index">
			<td>{{x.name}}</td>
			<td>{{x.typeStr}}</td>
			<td>{{x.remark}}</td>
			<td>
				<auth-nav :href="`/pages/role/roleEdit?id=${x._id}`" 
				url="admin/role/info" class="main bold plr5">
					编辑
				</auth-nav>
				
				<auth-btn :url="`admin/role/delete?id=${x._id}`" confirm="delete" 
				@success="remove(index)" class="main bold plr5">
					删除
				</auth-btn>
			</td>
		</tr>
	</block>
</tables>
```
 
#### 【upload-images 组件，已废弃，由uploads组件替代】

>图片上传组件，直接上传到云储存，支持多张图片上传

|属性	|类型	|说明	|
|--	|--|--	|
|count	|Number	|最多可以上传多少张图片，默认不限制-1	|
|name	|String	|表单的name	|
|value	|Array	|默认显示的图片列表，可以是数组，也可以是英文逗号分割的图片地址，也可以通过valueKey来指定对象类型的图片数据的图片链接键名	|
|valueKey	|String	|如果value为数组并且每个图片对应的数据是一个json对象，可以通过valueKey来指定图片的链接对应的键名。指定了valueKey后，表单提交的value将会是一个JSON字符串型的数组。|
|deleteUrl	|String	|当删除图片时，如果有配置删除的请求地址，则会向该地址发送请求，传入fileID参数，从云存储删掉该图片	|
|@change	|	|图片上传或删除时的回调，e.detail.value为图片链接数组，e.detail.files为包含图片详细信息的数组（不指定valueKey时默认图片链接为url字段）	|
|@delete	|	|图片删除成功的回调	|

#### 【uploads 组件】

>图片、音频、视频上传组件，直接上传到云储存，图片支持多张图片上传，其他文件每次只能上传一个，可以多次上传。

|属性	|类型	|说明	|
|--	|--|--	|
|type	|String	|文件类型：image、video、audio、pdf、apk、zip，默认image|
|maxDuration	|Number	|上传音频、视频的时长，单位：秒，默认600|
|count	|Number	|最多可以上传多少个文件，默认不限制-1	|
|width	|Number	|宽度，单位px，默认80|
|name	|String	|表单的name	|
|value	|Array、String	|默认显示的文件列表，可以是数组，也可以是英文逗号分割的文件地址，也可以通过valueKey来指定对象类型的文件数据的文件链接键名	|
|valueKey	|String	|如果value为数组并且每个文件对应的数据是一个json对象，可以通过valueKey来指定文件的链接对应的键名。指定了valueKey后，表单提交的value将会是一个JSON字符串型的数组。|
|parseArray	|boolean	|未指定valueKey时，可通过设置parseArray:true来指定提交的value为数组类型，v2.1.4+支持|
|deleteUrl	|String	|当删除文件时，如果有配置删除的请求地址，则会向该地址发送请求，传入fileID参数，从云存储删掉该文件	|
|@change	|	|文件上传或删除时的回调，e.detail.value为文件链接数组，e.detail.files为包含文件详细信息的数组（不指定valueKey时默认文件链接为url字段）	|
|@delete	|	|文件删除成功的回调，e.detail.value为文件链接，e.detail.index为文件在数组中的下标，e.detail.file为文件	|

```html
//指定valueKey时，需要传入的value为一个数组或字符串数组，数组中每个元素为json对象
<uploads title="头像" name="x.avatar" valueKey="src" type="image" v-model="data.avatar" :count="1"></uploads>
```

```js
export default {
	data() {
		return {
			data : {
				//可以为数组，也可以为字符串化的数组
				avatar : [
					{
						src : 'http://xxxx.com/xx.jpg' , //必填属性
						size : 2501 //其他选填属性...
					}
				]
			}
		}
	},
}
```


#### 【quote 组件】

>一段引用语、提示语

|属性	|类型	|说明	|
|--	|--|--	|
|title	|String	|标题	|
|color	|String	|颜色，默认主题色	|

#### 【alerts 弹窗组件】

>模态框，弹窗

|属性	|类型	|说明	|
|--	|--|--	|
|title	|String	|标题	|
|width	|String	|弹窗宽度，支持px和%单位，默认50%。	|
|height	|String	|弹窗高度，支持px和%单位，默认80%。	|
|slot="top"	|slot	|插入弹窗顶部的内容，如果仅显示标题文字不满足需要，可以自定义这块的内容	|
|slot="bottom"	|slot	|插入弹窗底部的内容，一般按钮放这里	|

参考如下代码显示弹窗：

```html
//定义弹窗的ref属性为alerts或其他自定义的名字
<alerts ref="alerts"></alerts>
```

```js
showAlerts:function(){
	this.$refs.alerts.show(); //显示弹窗
	this.refs.alerts.hide();
}
```