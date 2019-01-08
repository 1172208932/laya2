export default class LoginReward extends Laya.Dialog {
    initData(data) {
        data.login_bonus_list.forEach((item, index) => {
            if (item.pao_gold == '0') {
                this['iconType' + index].skin = 'local/common/jf.png'
                this['lblTitle' + index].text = '积分'
                this['lblNum' + index].text = item.integral
                if (index == 6) {
                    this.iconType6.pos(67, 29)
                    this.iconType6.size(60, 60)
                }
            } else {
                this['lblNum' + index].text = item.pao_gold
            }
        })
        for (let i = 1; i < data.reward_day; i++) {
            this['imgMask' + i].visible = true
        }
    }
}