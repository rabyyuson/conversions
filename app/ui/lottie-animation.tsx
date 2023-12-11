import React, { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';
import { LottieAnimationProps } from '@/app/lib/types';

const LottieAnimation = ({ animationData }: LottieAnimationProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<AnimationItem | null>(null);

    useEffect(() => {
        if (containerRef.current && animationData) {
            animRef.current = lottie.loadAnimation({
                container: containerRef.current,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                animationData: animationData,
            });
        }

        return () => {
            if (animRef.current) {
                animRef.current.destroy();
            }
        };
    }, [animationData]);

    return (
        <div
            className='mt-5 md:mt-0 h-[150px] md:w-[300px] md:h-[200px] scale-150 md:ml-[-5px]'
            ref={containerRef}
        ></div>
    );
};

export default LottieAnimation;
