import React, { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';
import { LottieAnimationProps } from '@/app/lib/types';

const LottieAnimation = ({ animationData }: LottieAnimationProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    let anim: AnimationItem | null = null;

    useEffect(() => {
        if (containerRef.current && animationData) {
            anim = lottie.loadAnimation({
                container: containerRef.current,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                animationData: animationData,
            });
        }

        return () => {
            if (anim) {
                anim.destroy();
            }
        };
    }, [animationData]);

    return (
        <div
            ref={containerRef}
            style={{
                width: '300px',
                height: '150px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        ></div>
    );
};

export default LottieAnimation;
