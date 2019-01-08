export default class UserView extends PaoYa.View {
    onAdded() {
        this.hBox = this.getChildByName("hBox")
        this.imgIcon = this.getChildByName("imgIcon");
        this.imgIconMask = this.getChildByName("imgIconMask");
        this.lblCity = this.getChildByName("lblCity");
        this.imgAddressBg = this.getChildByName("imgAddressBg");
        this.imgCountWin = this.getChildByName("imgCountWin");
        this.lblName = this.hBox.getChildByName("lblName");
        this.imgSex = this.hBox.getChildByName("imgSex");
        this.imgNameBg=this.getChildByName("imgNameBg");
    }
    setData(data) {
        if (data.icon != undefined) {
            this.imgIcon.skin = data.icon
        }
        if (data.name != undefined) {
            this.lblName.text = data.name //|| "等待对方入场..."
        }
        if (data.city != undefined) {
            if (data.city) {
                this.lblCity.visible = true
                this.imgAddressBg.visible = true
                this.lblCity.text = data.city
                this.lblCity.centerX = 0
            } else {
                this.lblCity.visible = false
                this.imgAddressBg.visible = false
            }
        }
        if (data.gender != undefined) {
            if (data.gender) {
                this.hBox.space = 8
                this.imgSex.visible = true
                if (data.gender == "男") {
                    this.imgSex.skin = "local/common/boy-white.png";
                } else if (data.gender == "女") {
                    this.imgSex.skin = "local/common/girl-white.png";
                    this.changeGirlStyle();
                } else {
                    this.imgSex.skin = "local/common/girl-white.png";
                    this.changeGirlStyle()
                }
            } else {
                this.hBox.space = 0;
                this.imgSex.visible = false;
            }

        }
        this.hBox.centerX = 0
        if (data.countWin != undefined) {
            if (data.countWin) {
                this.imgCountWin.visible = true
                this.imgCountWin.skin = data.countWin
            } else {
                this.imgCountWin.visible = false
            }
        }
    }
    changeGirlStyle() {
        this.imgIconMask.skin = "local/common/usericon-mask-girl.png";
        this.imgNameBg.skin = "local/common/username-bg-girl.png";
        this.imgAddressBg.skin = "local/common/usericon-bg-girl.png";
    }
}