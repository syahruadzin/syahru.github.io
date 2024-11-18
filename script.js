const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

document.addEventListener("DOMContentLoaded", function () {
    let lottieContainer = document.querySelectorAll(".animation");

    
    if (lottieContainer) {
        LottieScrollTrigger({
            trigger: ".animation",
            start: "top center",
            endTrigger: ".end-lottie",
            end: `bottom center+=${
            document.querySelector(".animation").offsetHeight
            }`,
            renderer: "svg",
            target: ".animation",
            path: "https://lottie.host/9fcd0a9c-60e3-47c0-b5f1-3d9375705452/qsggZeqm8G.json",
            scrub: 2,
        });
    }
});

function LottieScrollTrigger(vars) {
    let playhead = { frame: 0 },
        target = gsap.utils.toArray(vars.target)[0],
        speeds = {slow: "+=2000", medium: "+=1000", fast: "+=500"},
        st = {
            trigger: ".trigger",
            end: speeds[vars.speed] || "+=1000",
            scrub: 1,
            markers: false,
        },
        ctx = gsap.context && gsap.context(),
        animation = lottie.loadAnimation({
            container: target,
            renderer: vars.renderer || "svg",
            loop: false,
            autoplay: false,
            path: vars.path,
            rendererSettings: vars.rendererSettings || {
                preserveAspectRatio: "xMidYMid slice",
            },
        });
           
    for (let p in vars) {
    st[p] = vars[p];
}

let currentScroll = 0;
let isScrollingDown = true;

// Set up the GSAP tween for continuous movement
let tween = gsap.to(".marquee_part", {
    xPercent: -6,  // Move the text container to the left
    repeat: -9,  // Infinite loop
    duration: 30,  // Duration for complete movement (adjust as needed)
    ease: "linear"
})
.totalProgress(0);  // Start the animation from the beginning

// Initial position setting for the marquee
gsap.set(".marquee_inner", { xPercent: 0 });

// Add scroll event listener to reverse direction based on scroll
window.addEventListener("scroll", function() {
    if (window.pageYOffset > currentScroll) {
        isScrollingDown = true;
    } else {
        isScrollingDown = false;
    }
    gsap.to(tween, {
        timeScale: isScrollingDown ? 1 : -1,  // Reverse direction
    });
    currentScroll = window.pageYOffset;  // Update scroll position
});

/*animate*/

animation.addEventListener("DOMLoaded", function () {
    let createTween = function () {
        animation.frameTween = gsap.to(playhead, {
            frame: animation.totalFrames - 1,
            ease: "none",
            onUpdate: () => animation.goToAndStop(playhead.frame, true),
            scrollTrigger: st,
        });
        return () => animation.destroy && animation.destroy();
    };
    ctx && ctx.add ? ctx.add(createTween) : createTween();
  });
  
  return animation;
}

let listItems = [...document.querySelectorAll('h5')];

let options = {
    rootMargin: '0%',
    threshold: 0.0
}

let observer = new IntersectionObserver(showItem, options);

function showItem(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let letters = [...entry.target.querySelectorAll('span')];
            letters.forEach((letter, idx) => {
                setTimeout(() => {
                    letter.classList.add('active');
                }, idx * 30)
            })
            entry.target.children[0].classList.add('active');
        }
    })
}

listItems.forEach(item => {
    let newString = '';
    let itemText = item.children[0].innerText.split('');
    itemText.map(letter => (newString += letter == ' ' ? `<span class='gap'></span>` : `<span>${letter}</span>`));
    item.innerHTML = newString;
    observer.observe(item);
});

document.addEventListener("DOMContentLoaded", function () {
    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const services = gsap.utils.toArray(".service");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    };

    const observerCallback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                console.log(entry.isIntersecting);
                const service = entry.target;
                const imgContainer = service.querySelector(".img2");
                
                ScrollTrigger.create({
                    trigger: service,
                    start: "bottom bottom",
                    end: "top top",
                    scrub: true,
                    onUpdate: (self) => {
                        let progress = self.progress;
                        let newWidth = 30 + 70 * progress;
                        gsap.to(imgContainer, {
                            width: newWidth + "%",
                            duration: 0.1,
                            ease: "none",
                        });
                    },
                });

                ScrollTrigger.create({
                    trigger: service,
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                    onUpdate: (self) => {
                        let progress = self.progress;
                        let newHeight = 150 + 300 * progress;
                        gsap.to(service, {
                            height: newHeight + "px",
                            duration: 0.1,
                            ease: "none",
                        });
                    },
                });

                observer.unobserve(service);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    services.forEach((service) => {
        observer.observe(service);
    });
});