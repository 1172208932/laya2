import AlertDialog from "./AlertDialog";

export default class SettingDialog extends Laya.Dialog {
    onEnable() {
        this.setUp()
    }
    setUp() {
        if (localStorage.getItem("musicSwitchState") || localStorage.getItem("musicSwitchState") == 'true') {
            Laya.SoundManager.musicMuted = true;
        }
        else {
            Laya.SoundManager.musicMuted = false;
        }
        if (localStorage.getItem("effectSwitchState") || localStorage.getItem("effectSwitchState") == 'true') {
            Laya.SoundManager.soundMuted = true;
        }
        else {
            Laya.SoundManager.soundMuted = false;
        }
        this.init()
    };
    init() {
        this.btnCopy.on(Laya.Event.CLICK, this, this.copy);
        this.musicSwitch.on(Laya.Event.CLICK, this, this.setMusicVolume);
        this.effectSwitch.on(Laya.Event.CLICK, this, this.setEffectVolume);
        if (localStorage.getItem("musicSwitchState") || localStorage.getItem("musicSwitchState") == 'true') {
            this.musicSwitch.skin = "local/common/volumeBar0.png";
            Laya.SoundManager.musicMuted = true;
        }
        else {
            this.musicSwitch.skin = "local/common/volumeBar1.png";
            Laya.SoundManager.musicMuted = false;
        }
        if (localStorage.getItem("effectSwitchState") || localStorage.getItem("effectSwitchState") == 'true') {
            this.effectSwitch.skin = "local/common/volumeBar0.png";
            Laya.SoundManager.soundMuted = true;
        }
        else {
            this.effectSwitch.skin = "local/common/volumeBar1.png";
            Laya.SoundManager.soundMuted = false;
        }
    }
    copy() {
        py.setClipboardData({
            data: "泡泡游戏",
            success: function () {
            }
        });
    }
    setMusicVolume() {
        Laya.SoundManager.musicMuted = !Laya.SoundManager.musicMuted;
        localStorage.setItem("musicSwitchState", Laya.SoundManager.musicMuted);
        this.musicSwitch.skin = Laya.SoundManager.musicMuted ? "local/common/volumeBar0.png" : "local/common/volumeBar1.png";
    }
    setEffectVolume() {
        Laya.SoundManager.soundMuted = !Laya.SoundManager.soundMuted;
        localStorage.setItem("effectSwitchState", Laya.SoundManager.soundMuted);
        this.effectSwitch.skin = Laya.SoundManager.soundMuted ? "local/common/volumeBar0.png" : "local/common/volumeBar1.png";
    }
}