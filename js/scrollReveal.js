window.sr = ScrollReveal({ reset:true })

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
