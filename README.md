# 框架使用说明

## 环境准备

- 推荐使用pnpm，否则依赖可能安装不上。
- Node.js 版本要求18.x以上。
- 推荐安装 nvm 来管理 Node.js 版本。

## 工具配置

如果您使用的 IDE 是vscode(推荐)的话，可以安装以下工具来提高开发效率及代码格式化

- ESLint - 脚本代码检查
- Prettier - 代码格式化
- Code Spell Checker
- Tailwind CSS IntelliSense
- DotENV - .env 文件 高亮

## 如何运行项目

- 安装依赖

  ```bash
  pnpm i
  ```

  运行开发模式(编译并支持修改热加载)

  ```bash
  npm run dev
  ```

  测试环境打包

  ```bash
  npm run build:test
  ```

  生产模式打包

  ```bash
   npm run build:prod
  ```

## 技术栈

- Vite
- React
- react-router-dom
- material-ui
- less
- tailwind
- 状态管理工具待定

## 支持特性

- 💎 material 是一个轻量、可靠的移动端组件库
- 🚀 最新技术栈：使用 React18/Vite5/Material前端前沿技术开发
- 📱 tailwind 框架加持，解放样式编写和管理
- 👮 `eslint`+`prettier`
- 👩🏻 css module
- 📈 Ahooks

## 包管理工具

- pnpm
- 优势
  - 高效的磁盘空间利用
  - 更快的安装速度
  - 严格的依赖隔离
  - 内容寻址的包存储
  - 原子的操作
  - 灵活的多包管理
  - [快速入门](https://pnpm.io/)

## 传送门

- React[使用文档](https://react.dev/)
- Mui [使用文档](https://mui.com/material-ui/getting-started/)
- VueRouter [使用文档](https://reactrouter.com/en/main)
- Ahooks[使用文档](https://ahooks.js.org/)
- Vite[使用文档](https://cn.vitejs.dev/)
- Tailwind 原子化 css 框架， [使用文档](https://www.tailwindcss.cn/)

## 基本框架结构说明

```bash
├── .vscode                    # vscode配置
├── public                      # 公共静态资源目录
├── src                        # 源码: 业务代码主要集中在此目录
│   ├── api                    # api 封装
│   ├── assets                 # 静态资源
│   ├── biz-components         # 全局公用业务组件
│   ├── components             # 全局公用组件
│   ├── config                 # 项目配置文件
│   ├── constants              # 常量文件
│   ├── hooks                  # 全局hook
│   ├── layouts                # 布局组件
│   ├── pages                  # 页面
│   ├── router                 # 路由配置
│   ├── store                  # store状态管理
│   ├── styles                 # 样式管理
│   ├── utils                  # 工具类
│   ├── App.jsx                # 根组件
│   ├── App.less               # 根组件样式
│   ├── main.ts                # 入口文件
├── .env                       # 环境变量公用配置
├── .env.dev                   # 开发环境变量公用配置
├── .env.prod                  # 生产环境变量公用配置
├── .env.test                  # 测试环境变量公用配置
├── .eslintignore              # eslint 检验忽略文件
├── .eslintrc.js               # eslint 配置
├── .gitignore                 # git 忽略文件配置项
├── index.html                 # html
├── package.json               # package
├── postcss.config.js          # postcss配置文件
├── prettierrc                 # prettier配置文件
├── README.md                  # 使用文档
├── tailwind.config.js         # tailwind 配置文件
├── vite.config.js             # vite 配置文件
```

## 目录补充说明

- src 目录

- 业务相关的代码主要集中在 src 目录下

- api: 请求封装，后面会详细讲解

- assets: 静态资源放在该目录下，管理 images 和 icons
  - images 管理图片资源，图片命名采用模块+图片名的方式,eg:home-bg.png
    - 公用图片不用加模块前缀，一般来说模块名为路由对应页面的路径
    - 采用中划线进行连接
  - icons 管理svg资源,如果现在的codesign管理的方案不能满足需求的情况可在里面进行扩展
    - 在components下封装了一个SvgIcon的组件，在[svg管理平台上](https://codesign.qq.com/app/icon/dGZQlK3qqDYwa0X/detail?team_id=Ol9y5n1gzGwgn9d&projectId=dGZQlK3qqDYwa0X)上传管理svg资源后，直接在项目中引入SvgIcon使用即可，name对应为上传svg的名称，通过样式可以调整svg的颜色以及大小
    - 使用如下

```jsx
import { SvgIcon } from "../../components";
const Home = () => {
  return (
    <div>
      <SvgIcon name="arrow-up text-[20px] text-red-500"></SvgIcon>
    </div>
  );
};

export default Home;
```

- components: 全局公用组件

  - 文件名和组件名必填且使用 Pascal 命名且保持一致
  - 全局组件多个业务用到才可提取到当前文件下进行管理，不然请就近维护
  - 详细目录结构参照 components 下 button 组件的结构，不需要的文件可删除，比如 components 文件
  - 自定义组件通过目录下 index.js 做统一导出，页面通过引入导出文件进行使用，具体使用请查看 index.js 文件
  - 具体适用如下

```jsx
import { Button } from "@/components";
import { useNavigateWithParams } from "@/hooks";

const Login = () => {
  const { goToHome } = useNavigateWithParams();
  return (
    <div className="flex flex-col items-center justify-center">
      <div>login</div>
      <Button onClick={goToHome}>to home</Button>
    </div>
  );
};

export default Login;
```

- biz-components: 全局业务公用组件

  - 使用方式和components一致
  - 具体使用参考App.jsx中ErrorBoundary使用

- config: 配置文件管理

  - 你认为可以抽离成配置的文件的都可以抽到当前文件夹下维护

- constants: 常量文件管理
  - 常量文件管理按照功能进行拆分，详细操作constants下已有文件
  - 通过目录下 index.js 做统一导出，页面通过引入导出文件进行使用
  - 使用如下

```jsx
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  CLUSTER_ROUTE,
  WORKER_ROUTE,
} from "@/constants";
```

- hooks

  - 逻辑复用采用 hooks 方式
  - 文件名以 use 开头，比如 useMessage，文件命名已 use 开头，eg：useTable、useConfirm
  - 项目引入引入了 ahooks，自定义 hooks 前请先查看有没有封装好的 hook，具体使用方式请查看传送门中有文档地址
  - 目前封装了两个自定义hook，一个是message弹窗，一个是路由的跳转
  - useMessage以及useNavigateWithParams使用如下

```jsx
import Button from "@mui/material/Button";

import { useMessage, useNavigateWithParams } from "@/hooks";
const Home = () => {
  const { goToLogin } = useNavigateWithParams();
  const { showMessage, showErrorMessage, showSuccessMessage } = useMessage();

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 px-8 py-6 bg-white">
        <div>Home</div>
        <Button variant="contained" onClick={goToLogin} color="success">
          to login
        </Button>
        <Button
          variant="contained"
          onClick={() => showErrorMessage("This is a error message!")}
          color="error"
        >
          失败信息
        </Button>
        <Button
          variant="contained"
          onClick={() => showSuccessMessage("This is a success message!")}
          color="success"
        >
          成功信息
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            showMessage({ message: "This is a message!", severity: "warning" })
          }
          color="success"
        >
          传递更多消息参数
        </Button>
        <Button variant="contained" onClick={handleSetToken} color="success">
          设置token
        </Button>
      </div>
    </div>
  );
};

export default Home;
```

- layouts

  - 存在一级布局组件
  - 如果有二级或者三级就近在pages模块中进行维护即可，二级布局具体可参照pages/cloud
  - 使用参照router下routes使用

  - router: 路由相关文件
  - 路由跳转请使用useNavigateWithParams进行跳转，path定义在常量文件中
  - route 定义规范
    - 多个单词 path 用-连接，eg：goods-detail
    - 具体使用如下
    - 路由WrapperRouteComponent组件包裹可以控制当前页面是否需要权限校验以及设置当前页面的标题

```js
/**
 * 导入Navigate组件和其他必要路由信息
 */
import { Navigate } from "react-router-dom";
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  CLUSTER_ROUTE,
  WORKER_ROUTE,
} from "@/constants";
import DefaultLayout from "@/layouts/default";
import WrapperRouteComponent from "./WrapperRouteComponent";
import Home from "@/pages/home";
import Login from "@/pages/login";
import ClustersLayout from "../pages/cloud/ClustersLayout";
import Clusters, { clustersLoader } from "../pages/cloud/Clusters";
import ClusterInformation from "../pages/cloud/ClusterInformation";
import WorksLayout from "../pages/worker/WorksLayout";
/**
 * 加载集群详情数据的函数
 * @returns 返回模拟的集群详情对象
 */
const clusterDetailLoader = () => {
  return {
    clusterID: "cluster123",
    clusterName: "ClusterHello",
  };
};

/**
 * 应用的路由配置
 */
const routes = [
  {
    path: "", // 根路径
    element: <DefaultLayout />, // 默认布局
    children: [
      {
        path: HOME_ROUTE, // 主页路由
        element: (
          <WrapperRouteComponent auth={true} title="home">
            <Home />
          </WrapperRouteComponent>
        ), // 主页组件
      },
      {
        path: WORKER_ROUTE, // 工作区路由
        element: <WorkerLayout />, // 工作区布局组件
      },
    ],
  },
  {
    path: LOGIN_ROUTE, // 登录路由
    element: <Login />, // 登录组件
  },
  {
    path: "*", // 通配符路径，用于重定向到登录页
    element: <Navigate to={LOGIN_ROUTE} />,
  },
];

export { routes }; // 导出路由配置
```

- store: 以文件为模块的形式组织

- styles: 样式管理

  - modules 样式模块管理

    1. index.less 样式导出文件
    2. util.less 工具类，项目已经集成 tailwind，建议不在里面添加，除非 tailwind 满足不了
    3. variables.less，样式变量管理
    4. mui.less，全局 mui 样式覆盖文件

- utils: 公用工具函数等

  - 文件名以小驼峰命名，eg：setPageTitle
  - 工具类能使用 lodash-es 来处理，尽量通过使用 lodash 来处理，不重复造轮子
  - auth 用户信息相关 操作逻辑
  - date 时间处理封装，新增的方法请尽量借用 dayjs 处理
  - storage 存储处理
  - is 判断是否是 xx 类型工具函数
  - regex 校验、正则工具
  - 工具类封装推荐尽量使用class封装，参考auth以及regex，如果你习惯is.js的方式也可以
  - 最终都通过index.js文件做导出使用
  - 使用如下

```jsx
import Button from "@mui/material/Button";
import { AuthUtils } from "@/utils";
const Home = () => {
  const handleSetToken = () => {
    AuthUtils.setToken("token");
  };
  return (
    <div>
      <div className="grid grid-cols-3 gap-2 px-8 py-6 bg-white">
        <Button variant="contained" onClick={handleSetToken} color="success">
          设置token
        </Button>
      </div>
    </div>
  );
};

export default Home;
```

- pages: 主要的页面放置在其中, 根目录下不能有任何组件文件, 所有的页面都需要以文件夹的形式组织

  - 顶部文件夹以一级菜单为单位命名文件夹方便查找和定位
  - 文件内 index.jsx 作为入口文件
  - 文件名采用中划线连接，eg：order-detail
  - 导出组件采用大驼峰命名
  - 需要组件拆分的场景，新建 components 文件管理当前模块组件，组件名 Pascal 命名
  - 多模块复用组件请考虑抽离到全局 components 文件下
  - index.less 为页面组件样式
  - 如果当前页面需要抽离hook以及其他公用能力只是在当前页面使用，在当前页面文件下维护即可

## Api 层设计

- http请求
  - 基于axios二次封装
  - http 基于 axios 封装
  - transform 文件下拆分各钩子对应处理处理
  - 之所以新建 axios 文件做包裹，方便后续通过适配器模式更换请求模块
  - 具体使用参考api/user模块
  - 通过index.js进行统一导出使用
  - 参考
- 封装 api
- 隔离 api 实现 (ajax, axios, fetch), 换实现时, 只需修改 Api 相关文件的部分实现, 不会影响到业务层，注意类名须以 Api 结尾
- 通过类的形式调用，也可以避免命名空间冲突的问题
- http 模块对 axios 进行了二次封装，增加拦截器功能等功能
- axios 请求封装存放于 src/utils/http/axios 文件夹内部

- CommonApi 基类,可在此类中做公用数据处理

```js
import CommonApi from "./common";

// 用户API类，继承自CommonApi，提供用户相关的API调用
class UserApi extends CommonApi {
  /**
   * 登录方法
   * @param {Object} params - 登录参数，具体结构根据实际需求定义
   * @return {Promise} 返回一个Promise对象，成功或失败会相应resolve或reject
   */
  login(params) {
    return this.post({
      url: "/login",
      params,
      errorMessageMode: "none", // 错误消息模式为模态框
    });
  }

  /**
   * 获取用户信息
   * @return {Promise} 返回一个Promise对象，成功或失败会相应resolve或reject，成功时resolve用户信息
   */
  getUserInfo() {
    return this.get({
      url: "/getUserInfo",
      errorMessageMode: "none", // 不显示错误消息
    });
  }

  /**
   * 登出方法
   * @return {Promise} 返回一个Promise对象，表示登出操作的成功或失败
   */
  logout() {
    return this.delete({
      url: "/logout",
    });
  }

  /**
   * 获取用户列表
   * @param {Object} params - 请求参数，用于过滤用户列表，具体结构根据实际需求定义
   * @return {Promise} 返回一个Promise对象，成功或失败会相应resolve或reject，成功时resolve用户列表
   */
  getUsers(params) {
    return this.get({
      url: "/api/users",
      params,
    });
  }
}

// UserApi类的实例化对象，用于外部引用
const UserApiInstance = new UserApi();
export default UserApiInstance;


// 使用层
import { useEffect } from "react";
import { UserApiInstance } from "../../api";
const Home = () => {
  useEffect(() => {
    UserApiInstance.getUsers({}).then((res) => {
      console.log(res);
    });
  }, []);
  useEffect(() => {
    UserApiInstance.login({}).then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <div>
      <div className="grid grid-cols-3 gap-2 px-8 py-6 bg-white">
        <div>Home</div>
      </div>
    </div>
  );
};

export default Home;

```

## 异步操作

- 尽可能使用 async + await 处理
- 可读性更强+异常捕捉

## 前端储存

- 使用 api 尽量封装后再使用
- 不要直接裸用
- 对于 cookie 的操作使用`js-cookie`，请基于此库进行二次封装使用,[文档](https://github.com/js-cookie/js-cookie)
- storage 的操作使用`store2`，请基于此库进行二次封装使用,[文档](https://github.com/nbubna/store)

## 添加一个新功能

- 首先在 pages 中添加新页面的路由配置
- 在 api 中新建新页面需要操作数据的 api
- 将 router/routes 中配置路由

## 代码提交 建议使用Conventional Commits规范提交

## 分支管理 参考 Git Flow、GitHub Flow、GitLab Flow

## ESLint

- 不管是多人合作还是个人项目，代码规范都是很重要的。这样做不仅可以很大程度地避免基本语法错误，也保证了代码的可读性。
- 项目已经集成 eslint 校验，并且配置了vscode 自动格式化配置，前置条件需要先安装eslint+Prettier插件
- 所有的配置文件都在 .eslintrc.js 中。 根据官方的 eslint 规则做了少许的修改，后续可根据根据使用情况进行配置

## 其他

- 编辑器体检 使用 vscode
- 如有需要增加的类库讨论后再做新增
- 其他: 使用第三方库或者组件等的时候, 不要裸用或者裸继承. 最好自己封装一层
  - 因为:没法进行一些通用处理
- 如果使用的库出现问题, 只能到处去修改
- 尽量避免使用硬编码(在代码中直接裸写一些后面可能会变化的值, 且在到处使用)

- 如 `if ( code === 1 )`

  `if ( code === ResTypes.SUCCESS )`
