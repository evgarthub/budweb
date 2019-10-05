import { Phone, MapPin, Mail, Facebook, Send, Circle } from 'react-feather';

export const getLinkType = (type, value) => {
    let t;

    switch(type) {
        case 'phone':
            t = 'tel:';
            break;
        case 'email':
            t = 'mailto:';
            break;
        case 'address':
            t = 'https://www.google.com/maps/search/';
            break;
        default:
            t = ''
    }

    return t + value;
};

export const getLinkIcon = (type) => {
    switch(type) {
        case 'phone':
            return Phone;

        case 'address':
            return MapPin;

        case 'email':
            return Mail;

        case 'facebook':
            return Facebook;
        
        case 'telegram':
            return Send;

        default:
            return Circle;
    }
};

export const getStatusText = (status) => {

    switch(status) {
        default:
        case 'open':
            return 'Новий';

        case 'review':
            return 'Обговорення';

        case 'progress':
            return 'В роботi';

        case 'declined':
            return 'Вiдхилено';
        
        case 'hold':
            return 'Очiкування';

        case 'done':
            return 'Виконано';
    }
};

export const getStatusColor = (status) => {

    switch(status) {
        default:
        case 'open':
            return 'is-info';

        case 'review':
            return 'is-primary';

        case 'progress':
            return 'is-warning';

        case 'declined':
            return 'is-danger';
        
        case 'hold':
            return 'is-dark';

        case 'done':
            return 'is-success';
    }
};
