export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export enum ResultCode {
    SUCCEEDED,
    FAILED,
    CAPTCHA = 10,
}
