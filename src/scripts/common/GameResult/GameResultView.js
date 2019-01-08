import GameAgainDialog from "../../dialog/GameAgainDialog";

export default class GameResultView extends PaoYa.View {
    onAwake() {
        GameAgainDialog.JSONView = Laya.loader.getRes('scenes/dialog/GameAgain.scene')
        this.dealData();
        this.initView();
    }
    dealData() {
        this.data = this.params.result;
        this.type = this.params.type;
        let userId = PaoYa.DataCenter.user.id;
        let winUserId = this.data.win_userid;
        if (winUserId == userId) {
            this.data.result = 1;
            this.imgMyResultBg.visible = true;
            this.lblMyResult.text = "胜利";
        } else if (winUserId == 0) {
            this.data.result = 0;
        } else {
            this.data.result = -1;
            this.imgOtherResultBg.visible = true;
            this.imgOtherResultBg.skin = "remote/result/icon1.png";
            this.lblOtherResult.text = "胜利";
        }
        if (userId == this.data.lose_user.user_id) {
            this.myInfo = this.data.lose_user;
            this.otherInfo = this.data.win_user;
        } else {
            this.myInfo = this.data.win_user;
            this.otherInfo = this.data.lose_user;
        }
        //处理匹配成功数据 获取gender和location
        this.dealMatchData();
        this.ratioType = 0;
        this.data.has_wheel_reward = (this.data.wheel_user_id == userId) ? 1 : 0;
    }
    dealMatchData() {
        let userId = PaoYa.DataCenter.user.id;
        this.matchData = JSON.parse(JSON.stringify(this.params.matchData.match_list));
        if (userId != this.matchData[0].user_id) {
            this.matchData.push(this.matchData.shift());
        }
        this.myInfo.location = this.matchData[0].location;
        this.myInfo.gender = this.matchData[0].gender;
        this.otherInfo.location = this.matchData[1].location;
        this.otherInfo.gender = (this.matchData[1].gender) ? this.matchData[1].gender : "女";
    }
    initView() {
        if (PaoYa.DataCenter.isFromMiniProgram) {
            this.btnBack.visible = false;
            this.imgJump.visible = true;
        }
        if (!this.myInfo.integral) {
            this.boxBP.removeSelf();
        } else {
            this.lblBP.text = "+" + this.myInfo.integral;
        }
        if (!this.otherInfo.integral) {
            this.boxBPOther.removeSelf();
        } else {
            this.lblBPOther.text = "+" + this.otherInfo.integral;
        }
        if (this.type == PaoYa.GameEntryType.Match) {
            this.showMatchInfo();
        } else {
            this.showBattleInfo();
        }
        this.showBothInfo();//展示双方用户信息
        this.startAnimation();
        //积分展示
        let rewardRatio = this.myInfo.reward_ratio || 0;
        if (rewardRatio && !PaoYa.DataCenter.loginData.is_review && !Laya.Render.isConchApp) {
            let ratioInfo = rewardRatio.split('-');
            if (this.myInfo.cross_link_view == 'display') {
                PaoYa.navigator.popup('CrossLinkDialog', this.params)
            } else {
                PaoYa.navigator.popup('DoubleDialog', { ratioType: ratioInfo[1], ratioInfo: ratioInfo[0] })
            }
        }
    }
    showMatchInfo() {
        switch (this.data.result) {
            case 0:
                if (this.data.has_wheel_reward == 0) {
                    this.myScore.text = '我不服气，再战一局';
                    this.otherScore.text = '我运气不错，略胜一筹';
                    this.imgTitle.skin = 'remote/result/victory1.png'
                } else {
                    this.myScore.text = '我运气不错，略胜一筹';
                    this.otherScore.text = '我不服气，再战一局';
                    this.imgTitle.skin = 'remote/result/victory2.png'
                }
                break;
            case 1:
                if (this.data.has_wheel_reward == 0) {
                    this.myScore.text = '我技高一筹，积分翻倍';
                    this.otherScore.text = '我锦鲤附身，运气爆棚';
                    this.imgTitle.skin = 'remote/result/victory3.png'
                } else {
                    this.myScore.text = '我水平高，运气好';
                    this.otherScore.text = '我的好运马上就来';
                    this.imgTitle.skin = 'remote/result/victory5.png'
                }
                break;
            default:
                if (this.data.has_wheel_reward == 0) {
                    this.myScore.text = '我的好运马上就来';
                    this.otherScore.text = '我水平高，运气好';
                    this.imgTitle.skin = 'remote/result/lose1.png'
                } else {
                    this.myScore.text = '我锦鲤附身，运气爆棚';
                    this.otherScore.text = '我技高一筹，积分翻倍';
                    this.imgTitle.skin = 'remote/result/victory4.png'
                }
                break
        }
        this.lblPercent.parent.visible = false;
        if (this.data.has_wheel_reward) {
            this.lblBeanOther.parent.removeSelf();
            PaoYa.DataCenter.loginData.last_win = 1  
            this.lblBean.text = '+' + this.data.wheel_reward;
            if (PaoYa.DataCenter.showBeanPercent == 1) {
                let imgBuff = new Laya.Image('remote/share/red_20.png')
                imgBuff.pos(355, 532)
                this.addChild(imgBuff)
                this.lblBean.text = '+' + parseInt(this.data.wheel_reward * 1.1);
            }
            var horizontalPages = PaoYa.game.params.horizontalPages;
            if (!Laya.Render.isConchApp && !(horizontalPages && horizontalPages.length > 0)) {
                this.imgPrompt.visible = true;
                this.imgPrompt.pos(140, 20);
                this.startPromptAnimation();
            }
        } else {
            this.lblBean.parent.removeSelf();
            PaoYa.DataCenter.loginData.last_win = 0
            this.lblBeanOther.text = '+' + this.data.wheel_reward;
        }
    }
    showBattleInfo() {
        //对战 积分豆子均不展示
        this.lblBeanOther.parent.removeSelf();
        this.lblBean.parent.removeSelf();
        //超越
        this.lblPercent.text = this.myInfo.win_chang + "%";
        this.lblTip.visible = false;
        if (this.myInfo.new_score != undefined) {
            this.myScore.text = this.myInfo.new_score + "分";
            this.otherScore.text = this.otherInfo.new_score + '分';
        } else {
            if (this.data.result == 1) {
                this.myScore.text = '胜利';
                this.otherScore.text = '失败';
            } else if (this.data.result == -1) {
                this.myScore.text = '失败';
                this.otherScore.text = '胜利';
            } else {
                this.myScore.text = '平局';
                this.otherScore.text = '平局';
            }
        }
        if (this.data.result >= 0) {
            this.imgTitle.skin = 'remote/result/victory2.png'
        } else {
            this.imgTitle.skin = 'remote/result/victory1.png'
        }
        if (this.data.result != 1) {
            this.btnShare.label = "换换手气";
        }
    }
    showBothInfo() {
        this.imgMyIcon.texture = PaoYa.Utils.makeIcon(this.myInfo.user_icon);
        this.imgMySex.texture = PaoYa.Utils.makeGenderIcon(this.myInfo.gender);
        this.lblMyName.text = PaoYa.Utils.formatName(this.myInfo.user_name);
        this.lblMyCity.text = this.myInfo.location || "";

        this.imgOtherIcon.texture = PaoYa.Utils.makeIcon(this.otherInfo.user_icon);
        this.imgOtherSex.texture = PaoYa.Utils.makeGenderIcon(this.otherInfo.gender);
        this.lblOtherName.text = PaoYa.Utils.formatName(this.otherInfo.user_name);
        this.lblOtherCity.text = this.otherInfo.location || "";
    }
    startPromptAnimation() {
        let x = 140;
        this.tlPrompt = new Laya.TimeLine();
        this.tlPrompt.to(this.imgPrompt, { x: x + 40 }, 600).to(this.imgPrompt, { x: x }, 600);
        this.tlPrompt.play(0, true);
    }
    startAnimation() {
        //1豆子积分  和 再来一局的呼吸效果  //匹配独有
        //此动画有待优化
        this.timeLine = new Laya.TimeLine();
        this.timeLine.to(this.aniBox, {
            scaleX: 1.2,
            scaleY: 1.2
        }, 500, null, 0).to(this.aniBox, {
            scaleX: 1,
            scaleY: 1
        }, 500, null, 1).to(this.aniBox, {
            scaleX: 0.8,
            scaleY: 0.8
        }, 500, null, 1).to(this.aniBox, {
            scaleX: 1,
            scaleY: 1
        }, 500, null, 1).to(this.btnAgain, {
            scaleX: 1.2,
            scaleY: 1.2
        }, 500, null, 1).to(this.btnAgain, {
            scaleX: 1,
            scaleY: 1
        }, 500, null, 1).to(this.btnAgain, {
            scaleX: 0.8,
            scaleY: 0.8
        }, 500, null, 1).to(this.btnAgain, {
            scaleX: 1,
            scaleY: 1
        }, 500, null, 1)
        this.timeLine.play(0, true);
    }
    stopAllAnimation() {
        if (this.timeLine) {
            this.timeLine.pause();
            this.timeLine.destroy();
            this.timeLine = null;
        }
        if (this.tlPrompt) {
            this.tlPrompt.pause();
            this.tlPrompt.destroy();
            this.tlPrompt = null;
        }
    }
    onDestroy() {
        this.stopAllAnimation();
    }
}