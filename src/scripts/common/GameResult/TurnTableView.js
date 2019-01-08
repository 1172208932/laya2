import TurnTableControl from "./TurnTableControl";

export default class TurnTableView extends PaoYa.View {
    constructor() { super(); }
    onAwake() {
        this.data = this.params.result;
        this.dealData();
        this.initView();
        this.startAnimation();

    }
    dealData() {
        let userId = PaoYa.DataCenter.user.id;
        if (this.data.win_user.user_id == userId) {
            this.myInfo = this.data.win_user;
            this.otherInfo = this.data.lose_user;
        } else {
            this.myInfo = this.data.lose_user;
            this.otherInfo = this.data.win_user;
        }
        //是否本人抽奖
        this.isDrawMe = (this.data.wheel_do_user_id == userId);
        //是否本人获奖
        this.isRewardMe = (this.data.wheel_user_id == userId);
        this.myPlace = "";//记录我在转盘位置
        this.otherPlace = "";//记录对方在转盘位置
        this.ownerPlace = "";//获奖者位置;
        this.lblNameArr = this.lblBox._children;
        this.imgArr = this.imgBox._children;
        this.gridsNum = 8;
    }
    initView() {
        this.lblReward.text = this.data.wheel_reward;
        let userId = PaoYa.DataCenter.user.id;
        this.imgMe.skin = PaoYa.Utils.makeIcon(this.myInfo.user_icon);
        this.imgOther.skin = PaoYa.Utils.makeIcon(this.otherInfo.user_icon);
        this.lblMyName.text = PaoYa.Utils.formatName(this.myInfo.user_name);
        this.lblOtherName.text = PaoYa.Utils.formatName(this.otherInfo.user_name);
        this.boxInfo._children[0].text = (this.isRewardMe) ? this.lblMyName.text : this.lblOtherName.text;
        this.boxInfo._children[1].text = "运气爆棚，获得奖金" + this.data.wheel_reward;
        if (this.data.wheel_do_user_id == userId) {
            if (this.data.win_userid == userId) {//1,2,3,5,6,7
                this.myPlace = "0,1,2,4,5,6";
                this.otherPlace = "3,7";
                this.lblMyRate.text = "获奖率 ：75%";
                this.lblOtherRate.text = "获奖率 ：25%";
            } else {
                this.myPlace = "0,2,4,6";
                this.otherPlace = "1,3,5,7";
                this.boxResult.text = "本局平局，比比运气吧，祝你好运！";
                this.boxResult.color = '#fa7543'
                this.lblMyRate.text = "获奖率 ：50%";
                this.lblOtherRate.text = "获奖率 ：50%";
            }
        } else {
            this.btnLucky.visible = false;//抽奖按钮隐藏
            if (this.data.win_userid) {
                this.myPlace = "3,7";
                this.otherPlace = "0,1,2,4,5,6";
                this.boxResult.text = "对战失败，您有25%几率获奖，祝你好运！";
                this.boxResult.color = "#37abfb";
                this.lblMyRate.text = "获奖率 ：25%";
                this.lblOtherRate.text = "获奖率 ：75%";
                if (PaoYa.DataCenter.showIntegralPercent == 1) {//zxx
                    this.boxResult.text = "对战失败，您有35%几率获奖，祝你好运！";
                }
            } else {
                this.myPlace = "1,3,5,7";
                this.otherPlace = "0,2,4,6";
                this.boxResult.text = "本局平局，比比运气吧，祝你好运！";
                this.boxResult.color = '#fa7543'
                // this.boxTip.children[1].text = "50%";
                this.lblMyRate.text = "获奖率 ：50%";
                this.lblOtherRate.text = "获奖率 ：50%";
            }
        }
        if (PaoYa.DataCenter.showIntegralPercent == 1) {//zxx
            let imgBuff1 = new Laya.Image('remote/share/red_10.png')
            imgBuff1.pos(212, 175)
            this.addChild(imgBuff1)
            let imgBuff2 = new Laya.Image('remote/share/green_10.png')
            imgBuff2.pos(534, 175)
            this.addChild(imgBuff2)
            let ownNum = Number(this.lblMyRate.text.replace(/[^0-9]/ig, "")) + 10
            let otherNum = Number(this.lblOtherRate.text.replace(/[^0-9]/ig, "")) - 10
            this.lblMyRate.text = `获奖率 ${ownNum}%`;
            this.lblOtherRate.text = `获奖率 ${otherNum}%`;
        }
        PaoYa.DataCenter.showIntegralPercent = 0

        //获奖者位置
        this.ownerPlace = (this.isRewardMe) ? this.myPlace : this.otherPlace;
        //转盘双方信息
        for (var i = 0; i < this.gridsNum; i++) {
            if (this.myPlace.indexOf(i + "") != -1) {
                this.lblNameArr[i].text = this.lblMyName.text;
                this.imgArr[i].skin = this.imgMe.skin;
                this.spriteBg.graphics.drawPie(286, 286, this.spriteBg.width / 2, -112.5 + i * 45, -67.5 + i * 45, "#ffe0aa");
            } else {
                this.lblNameArr[i].text = this.lblOtherName.text;
                this.imgArr[i].skin = this.imgOther.skin;
                this.spriteBg.graphics.drawPie(286, 286, this.spriteBg.width / 2, -112.5 + i * 45, -67.5 + i * 45, "#fff9d9");
            }
        }
    }
    startAnimation() {
        //1.按钮呼吸效果 
        var _this = this;
        if (this.isDrawMe) {
            this.timeLine = new Laya.TimeLine();
            this.timeLine.to(_this.btnLucky, {
                scaleX: 1.2,
                scaleY: 1.2
            }, 500, null, 0).to(_this.btnLucky, {
                scaleX: 1,
                scaleY: 1
            }, 500, null, 1).to(_this.btnLucky, {
                scaleX: 0.8,
                scaleY: 0.8
            }, 500, null, 1).to(_this.btnLucky, {
                scaleX: 1,
                scaleY: 1
            }, 500, null, 1)
            this.timeLine.play(0, true);

            //2.按钮下面箭头动画
            this.arrowSkeleton = new Laya.Skeleton();
            this.arrowSkeleton.load("https://res.xingqiu123.com/wxgame/service/jian_tou.sk", Laya.Handler.create(this, function () {
                this.arrowSkeleton.pos(360, 560);
                this.arrowSkeleton.play("jian_tou", true);
                this.addChild(this.arrowSkeleton);
            }));
            this.lblTip.visible = true;
        }

        //3.倒计时（a.抽奖的倒计时b.等待人的倒计时）
        this.timerService = new PaoYa.TimerService(11);
        this.timerService.on(PaoYa.TimerService.PROGRESS, this, function (minute) {
            this.dealWithTime(minute);
        });
        this.timerService.start();
    }
    dealWithTime(minute) {
        if (minute == 0) {
            this.timerService.stop();
            if (this.isDrawMe) {
                this.getComponent(TurnTableControl).startLucky();
            } else if (!this.rotate) {
                var random = this.ownerPlace.split(",").randomItem;
                this.rotateByIndex(random);
            }
            return;
        }
        if (this.isDrawMe) {
            this.btnLucky.visible = true;
            this.btnLucky.label = `抽取获奖用户(${minute}s)`;
        } else {
            this.lblUnlucky.visible = true;
            this.lblUnlucky.text = `等待抽取获奖用户(${minute}s)`;
        }
    }

    rotateByIndex(index) {
        this.rotate = true;
        this.indexHead = index
        this.timerService.stop();
        this.lblUnlucky.visible = true;
        this.lblUnlucky.text = "等待揭晓获奖用户";
        var tween = new Laya.Tween();
        tween.to(this.table, {
            rotation: 360 - 45 * index + 360 * 4
        }, 5000, Laya.Ease.circOut, Laya.Handler.create(this, function () { }));
        Laya.timer.once(5500, this, function () {
            this.table.rotation = 360 - 45 * index + 360 * 4;
            this.showWheelReult();
        });
    }
    showWheelReult() {
        //播放豆子动画 ，动画播放完 关掉弹框，抛出事件  //x:680
        var suffixSound = Laya.Render.isConchApp ? '.wav' : '.mp3';
        Laya.timer.once(1000, this, function () {
            Laya.SoundManager.playSound(PaoYa.DataCenter.CDNURL + 'common/sound/FlyGoldSound' + suffixSound, 1);
        })

        var newImg = new Laya.Image()
        newImg.pos(372, 484)
        newImg.size(76, 76)
        newImg.anchorX = 0.5
        newImg.anchorY = 0.5
        newImg.skin = this.imgArr[this.indexHead].skin
        this.addChild(newImg);
        this.imgArr[this.indexHead].visible = false

        this.timeLineHeade = new Laya.TimeLine();
        this.timeLineHeade.to(newImg, {
            scaleX: 1.2,
            scaleY: 1.2
        }, 500, null, 0).to(newImg, {
            scaleX: 1,
            scaleY: 1
        }, 500, null, 1).to(newImg, {
            scaleX: 0.8,
            scaleY: 0.8
        }, 500, null, 1).to(newImg, {
            scaleX: 1,
            scaleY: 1
        }, 500, null, 1)
        this.timeLineHeade.play(0, true);
        let url = (this.isRewardMe) ? "spine/get_l.sk" : "spine/get_r.sk";
        let shield = new Laya.Skeleton();
        shield.load(url, Laya.Handler.create(this, function () {
            shield.play(0, false);
        }));
        shield.pivot(0, 0)
        shield.pos(375, 599)
        shield.playbackRate(0.8)
        shield.centerX = 0
        shield.centerY = 0
        this.addChild(shield);
        this.shield = shield;
        Laya.timer.once(4000, this, function () {
            this.stopAnimationAfterWheel();
            PaoYa.navigator.push("GameResultView", this.params);
        });
        this.lblUnlucky.visible = false;
        this.boxInfo.visible = true;
    }
    //stop按钮消失前动画
    stopBtnAnimation() {
        //1.按钮消失，出现文字 ---“等待揭晓获奖用户” 取消呼吸效果
        this.timeLine && this.timeLine.destroy();
        this.timeLine = null;
        this.removeChild(this.arrowSkeleton);
        this.arrowSkeleton && this.arrowSkeleton.destroy();
        this.arrowSkeleton = null;
        this.lblTip.visible = false;
        this.btnLucky.visible = false;
    }
    //stop转盘转完后的动画
    stopAnimationAfterWheel() {
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this.table);
        this.timeLineHeade && this.timeLineHeade.destroy();
        this.timeLineHeade = null;
        this.shield && this.shield.destroy();
        this.shield = null;
    }
    onDestroy() {
        this.timerService.stop();
        this.stopBtnAnimation();
        this.stopAnimationAfterWheel();
    }
}