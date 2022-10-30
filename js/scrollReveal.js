window.sr = ScrollReveal({ reset:true })

// INDEX

sr.reveal('header nav', {
    distance: '150%',
    origin: 'top',
    opacity: null,
    duration: 1100
})
sr.reveal('#presentation', { duration: 2000})
sr.reveal('.section-presentation img', {
    rotate: {x: 0, y: 80, z: 0},
    duration: 1500
})
sr.reveal('.section-presentation div', { duration: 1500})

// CHAT

sr.reveal('#chat', {
    duration: 700
})

sr.reveal('#chat nav', {
    distance: '150%',
    origin: 'top',
    opacity: null,
    duration: 1700
})

sr.reveal('#channels', {
    distance: '150%',
    origin: 'left',
    opacity: null,
    duration: 700
})

sr.reveal('#direct-messages', {
    distance: '150%',
    origin: 'left',
    opacity: null,
    duration: 700
})

sr.reveal('#messages', {
    distance: '150%',
    origin: 'right',
    opacity: null,
    duration: 1700
})

sr.reveal('#conversation', {
    duration: 700
})