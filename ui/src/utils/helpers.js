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
