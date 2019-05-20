import anime from 'animejs';

const pageEnter = item => {
    anime({
        targets: item,
        opacity: [0, 1],
        transform: ['scale(0.8)', 'scale(1)'],
        duration: 1000,
        delay: 10,
        easing: 'easeInOutQuint'
    });
}

const pageExit = item => {
    anime({
        targets: item,
        opacity: [1, 0],
        transform: 'scale(0.8)',
        duration: 1000,
        easing: 'linear'
    });
}

const aboutExpand = item => {
    anime.timeline({
        targets: item.nextSibling,
        easing: 'easeInOutExpo',
    }).add({
        padding: [0, '1.5em'],
        duration: 1000,
    }).add({
        duration: 1000,
        maxHeight: [0, '3000px'],
        opacity: [0, 1],
        visibility: 'visible',
    }, '-=800');
}

const aboutCollapse = item => {
    anime.timeline({
        targets: item.nextSibling,
        easing: 'easeOutQuad'
    }).add({
        maxHeight: 0,
        opacity: 0,
        visibility: 'hidden',
        duration: 100,
    }).add({
        padding: 0,
        duration: 10,
    });
}

const navExpand = () => {
    anime.timeline({
        targets: '.navbar-menu',
        easing: 'easeInOutExpo',
    }).add({
        duration: 800,
        maxHeight: '100vh',
        opacity: 1,
    });
}

const navCollapse = () => {
    anime.timeline({
        targets: '.navbar-menu',
        easing: 'easeInOutExpo',
    }).add({
        duration: 400,
        opacity: 0,
        maxHeight: 0
    });
}

export {
    pageEnter,
    pageExit,
    aboutExpand,
    aboutCollapse,
    navExpand,
    navCollapse,
}
