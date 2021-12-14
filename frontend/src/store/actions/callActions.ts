export const CALL_SET_LOCAL_STREAM = 'CALL.SET_LOCAL_STREAM';

export const setLocalStream = (localStream: any) => {
    return {
        type: CALL_SET_LOCAL_STREAM,
        localStream,
    } as const;
};

export type Actions = | ReturnType<typeof setLocalStream>;