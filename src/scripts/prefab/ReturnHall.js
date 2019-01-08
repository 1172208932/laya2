import Utils from "../utils/utils";

export default class ReturnHall extends PaoYa.Component {
    onClick() {
        PaoYa.DataTrack.trackType(PaoYa.DataTrackType.HallBack)
        Utils.goToHall()
    }
}