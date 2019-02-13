import AlertDialog from "./AlertDialog";

export default class SettingDialog extends Laya.Dialog {
    static setUp() {
        if (localStorage.getItem("musicSwitchState") && localStorage.getItem("musicSwitchState") != 'false') {
            Laya.SoundManager.musicVolume = 0;
        }
        else {
            Laya.SoundManager.musicVolume = 1;
        }
        if (localStorage.getItem("effectSwitchState") && localStorage.getItem("effectSwitchState") != 'false') {
            Laya.SoundManager.soundMuted = true;
        }
        else {
            Laya.SoundManager.soundMuted = false;
        }
    };
    onEnable() {
        this.init();
    }
    init() {
        this.btnCopy.on(Laya.Event.CLICK, this, this.copy);
        this.musicSwitch.on(Laya.Event.CLICK, this, this.setMusicVolume);
        this.effectSwitch.on(Laya.Event.CLICK, this, this.setEffectVolume);
        if (localStorage.getItem("musicSwitchState") && localStorage.getItem("musicSwitchState") != 'false') {
            this.musicSwitch.skin = "local/common/volumeBar0.png";
            Laya.SoundManager.musicVolume = 0;
        }
        else {
            this.musicSwitch.skin = "local/common/volumeBar1.png";
            Laya.SoundManager.musicVolume = 1;
        }
        if (localStorage.getItem("effectSwitchState") && localStorage.getItem("effectSwitchState") != 'false') {
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
        let musicVolume = Laya.SoundManager.musicVolume == 0 ? 1 : 0;
        let musicMuted = musicVolume == 0 ? true : false;
        Laya.SoundManager.setMusicVolume(musicVolume);
        localStorage.setItem("musicSwitchState", musicMuted);
        this.musicSwitch.skin = musicMuted ? "local/common/volumeBar0.png" : "local/common/volumeBar1.png";
    }
    setEffectVolume() {
        Laya.SoundManager.soundMuted = !Laya.SoundManager.soundMuted;
        localStorage.setItem("effectSwitchState", Laya.SoundManager.soundMuted);
        this.effectSwitch.skin = Laya.SoundManager.soundMuted ? "local/common/volumeBar0.png" : "local/common/volumeBar1.png";
    }
    onDisable() {
        this.destroy();
    }
}