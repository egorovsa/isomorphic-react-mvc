const NotificationManager = require('react-notifications').NotificationManager;

export enum NotificationTypes {
    info = 'info',
    success = 'success',
    warning = 'warning',
    error = 'error',
}

export class NotificationService {
    static createNotification(
        type: NotificationTypes,
        text: string,
        title: string = '',
        time: number = 3000,
        cb: () => void = () => undefined
    ) {
        switch (type) {
            case 'info':
                NotificationManager.info(text, title, time, cb);
                break;
            case 'success':
                NotificationManager.success(text, title, time, cb);
                break;
            case 'warning':
                NotificationManager.warning(text, title, time, cb);
                break;
            case 'error':
                NotificationManager.error(text, title, time, cb);
                break;
            default:
                break;
        }
    }
}