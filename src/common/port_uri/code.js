/*
状态码	含义	说明
200	OK	请求成功
201	CREATED	创建成功
202	ACCEPTED	更新成功
400	BAD REQUEST	请求的地址不存在或者包含不支持的参数
401	UNAUTHORIZED	未授权
403	FORBIDDEN	被禁止访问
404	NOT FOUND	请求的资源不存在
500	INTERNAL SERVER ERROR	内部错误
*/


//成功
export const success = 10000
//错误
export const error = 80000
//未登录
export const unlogin = 80001
//账号或密码错误
export const username_or_password_error = 80002
