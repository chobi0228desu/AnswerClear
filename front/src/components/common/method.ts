// 共通メソッド用

//alertと同時にconsole.logも出す
export const alertLog = (str: string,message: any) => {
    alert(message);
    console.log(str, message);
};