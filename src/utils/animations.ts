import gsap from 'gsap';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const animatePageIn = () => {
    const banner1 = document.getElementById('banner-1');
    const banner2 = document.getElementById('banner-2');
    const banner3 = document.getElementById('banner-3');
    const banner4 = document.getElementById('banner-4');

    if (banner1 && banner2 && banner3 && banner4) {
        const tl = gsap.timeline();

        tl.set([banner1, banner2, banner3, banner4], {
            yPercent: 0,
        }).to([banner1, banner2, banner3, banner4], {
            yPercent: 100,
            stagger: 0.2,
        })
    }
}


export const animatePageOut = (href: string, router: AppRouterInstance) => {
    const banner1 = document.getElementById('banner-1');
    const banner2 = document.getElementById('banner-2');
    const banner3 = document.getElementById('banner-3');
    const banner4 = document.getElementById('banner-4');

    if (banner1 && banner2 && banner3 && banner4) {
        const tl = gsap.timeline();

        tl.set([banner1, banner2, banner3, banner4], {
            yPercent: -100,
        }).to([banner1, banner2, banner3, banner4], {
            yPercent: 0,
            stagger: 0.2,
            onComplete: () => {
                router.push(href);
            }
        })
    }
}

export const animateBox = () => {
    const tl = gsap.timeline();

    tl.from(".box", { 
        duration: 1.5, 
        x: 100, 
        y: 100, 
        scale: 100, 
        rotation: 180,
        delay: 1, 
        backgroundColor: "white"
    });
}

export const scaleOut = () => {
    const tl = gsap.timeline();

    tl.to(".biggify", {
        duration: 1,
        scale: 0.1,
        backgroundColor: "black",
    });
}
