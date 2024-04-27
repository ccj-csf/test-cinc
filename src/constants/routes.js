/**
 * 导出网站导航相关的路由常量。
 * 这些常量定义了应用中各个页面的路由路径。
 * 无参数。
 * 无返回值。
 */
export const HOME_ROUTE = "/"; // 主页路由
export const ABOUT_ROUTE = "/about"; // 关于页面路由
export const CONTACT_ROUTE = "/contact"; // 联系页面路由
export const FAQ_ROUTE = "/faqs"; // 常见问题页面路由
export const LOGIN_ROUTE = "/login"; // 登录页面路由
export const LOGIN_EMAIL_ROUTE = "/login/email";

//for dashboard
export const DASHBOARD_ROUTE = "/cvn";

//for cloud
export const CLOUD = "cloud";
export const CLOUD_CLUSTER = "cluster";

export const CLOUD_ROUTE = DASHBOARD_ROUTE + "/" + CLOUD;
export const CLUSTER_ROUTE = CLOUD_ROUTE + "/" + CLOUD_CLUSTER;

//for worker
export const WORKER = "worker";
export const WORKER_CREATE = "create";
export const WORKER_ID = ":id";

export const WORKER_ROUTE = DASHBOARD_ROUTE + "/" + WORKER;
export const WORKER_CREATE_ROUTE = WORKER_ROUTE + "/" + WORKER_CREATE;

//for explorer
export const EXPLORER = "explorer";
export const EXPLORER_NETWORK = "networkMap";
export const EXPLORER_CLUSTERS = "clusters";
export const EXPLORER_WORKERS = "workers";

export const EXPLORER_ROUTE = DASHBOARD_ROUTE + "/" + EXPLORER;
export const EXPLORER_NETWORK_ROUTE = EXPLORER_ROUTE + "/" + EXPLORER_NETWORK;
export const EXPLORER_CLUSTERS_ROUTE = EXPLORER_ROUTE + "/" + EXPLORER_CLUSTERS;
export const EXPLORER_WORKERS_ROUTE = EXPLORER_ROUTE + "/" + EXPLORER_WORKERS;
