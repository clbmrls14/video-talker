import { setLocalStream } from "../../store/actions/callActions"
import { store } from "../../store/store"

const defaultContraints = {
    video: true,
    audio: true
}

export const getLocalStream = () => {
    navigator.mediaDevices.getUserMedia(defaultContraints)
        .then(stream => {
            store.dispatch(setLocalStream(stream));
        })
        .catch(err => {
            console.log('error occurred when trying to get local stream');
            console.log(err);
        });
}