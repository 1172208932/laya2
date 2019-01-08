export default class ODCControl {

}
/**上传用户分数到微信，之前有只能上传String类型的限制，现在可以不能指定类型 */
ODCControl.set = function (KVDataList) {
    let time = Date.now()
    KVDataList.push({ key: "update_time", value: time + "" })
    KVDataList.forEach(element => {
        element['value'] = String(element['value'])
    })
    console.log(`OD | ${JSON.stringify(KVDataList)}`)
    py.setUserCloudStorage({
        KVDataList: KVDataList,
        success(res) {
            console.warn("OD | SET | SUC | " + JSON.stringify(res));
        },
        fail(res) {
            console.error("OD | SET | FAIL | " + JSON.stringify(res));
        }
    })
}

ODCControl.remove = function (keys) {
    py.removeUserCloudStorage({
        keyList: keys,
        success(res) {
            console.warn("OD | REMOVE | SUC | " + JSON.stringify(res));
        },
        fail(res) {
            console.error("OD | REMOVE | FAIL | " + JSON.stringify(res));
        }
    })
}