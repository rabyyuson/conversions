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
            className='w-[300px] h-[200px] scale-150 ml-[-5px]'
            ref={containerRef}
        ></div>
    );
};

export default LottieAnimation;
