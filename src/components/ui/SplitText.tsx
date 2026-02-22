"use client";

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

type SplitType = 'chars' | 'words' | 'lines' | 'chars,words' | 'chars,lines' | 'words,lines';

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    ease?: string;
    splitType?: SplitType;
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    threshold?: number;
    rootMargin?: string;
    textAlign?: React.CSSProperties['textAlign'];
    tag?: string;
    onLetterAnimationComplete?: () => void;
    /* If true, trigger animation immediately without scroll */
    autoplay?: boolean;
}

const SplitText = ({
    text,
    className = '',
    delay = 50,
    duration = 1.25,
    ease = 'power3.out',
    splitType = 'chars',
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
    threshold = 0.1,
    rootMargin = '-100px',
    textAlign = 'center',
    tag = 'p',
    onLetterAnimationComplete,
    autoplay = false,
}: SplitTextProps) => {
    const ref = useRef<HTMLElement>(null);
    const animationCompletedRef = useRef(false);
    const onCompleteRef = useRef(onLetterAnimationComplete);
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        onCompleteRef.current = onLetterAnimationComplete;
    }, [onLetterAnimationComplete]);

    useEffect(() => {
        if (document.fonts.status === 'loaded') {
            setFontsLoaded(true);
        } else {
            document.fonts.ready.then(() => {
                setFontsLoaded(true);
            });
        }
    }, []);

    useGSAP(
        () => {
            if (!ref.current || !text || !fontsLoaded) return;
            if (animationCompletedRef.current) return;
            const el = ref.current;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const elAny = el as any;
            if (elAny._rbsplitInstance) {
                try { elAny._rbsplitInstance.revert(); } catch (_) { /* noop */ }
                elAny._rbsplitInstance = null;
            }

            const startPct = (1 - threshold) * 100;
            const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
            const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
            const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
            const sign =
                marginValue === 0 ? '' :
                    marginValue < 0 ? `-=${Math.abs(marginValue)}${marginUnit}` :
                        `+=${marginValue}${marginUnit}`;
            const start = `top ${startPct}%${sign}`;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let targets: any;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const assignTargets = (self: any) => {
                if (splitType.includes('chars') && self.chars.length) targets = self.chars;
                if (!targets && splitType.includes('words') && self.words.length) targets = self.words;
                if (!targets && splitType.includes('lines') && self.lines.length) targets = self.lines;
                if (!targets) targets = self.chars || self.words || self.lines;
            };

            const splitInstance = new GSAPSplitText(el, {
                type: splitType,
                linesClass: 'split-line',
                wordsClass: 'split-word',
                charsClass: 'split-char',
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onSplit: (self: any) => {
                    assignTargets(self);

                    const tweenConfig: gsap.TweenVars = {
                        ...to,
                        duration,
                        ease,
                        stagger: delay / 1000,
                        onComplete: () => {
                            animationCompletedRef.current = true;
                            onCompleteRef.current?.();
                        },
                        willChange: 'transform, opacity',
                        force3D: true,
                    };

                    if (!autoplay) {
                        tweenConfig.scrollTrigger = {
                            trigger: el,
                            start,
                            once: true,
                            fastScrollEnd: true,
                            anticipatePin: 0.4,
                        };
                    }

                    const tween = gsap.fromTo(targets, { ...from }, tweenConfig);
                    return tween;
                },
            });

            elAny._rbsplitInstance = splitInstance;

            return () => {
                ScrollTrigger.getAll().forEach(st => {
                    if (st.trigger === el) st.kill();
                });
                try { splitInstance.revert(); } catch (_) { /* noop */ }
                elAny._rbsplitInstance = null;
            };
        },
        {
            dependencies: [
                text, delay, duration, ease, splitType,
                JSON.stringify(from), JSON.stringify(to),
                threshold, rootMargin, fontsLoaded, autoplay,
            ],
            scope: ref,
        }
    );

    const style: React.CSSProperties = {
        textAlign,
        overflow: 'hidden',
        display: 'inline-block',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        willChange: 'transform, opacity',
    };

    const Tag = tag as React.ElementType;
    return (
        <Tag ref={ref} style={style} className={`split-parent ${className}`}>
            {text}
        </Tag>
    );
};

export default SplitText;
