"use client";

import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface NavItem {
    label: string;
    href: string;
}

interface PillNavProps {
    logo?: string;
    logoAlt?: string;
    items: NavItem[];
    activeHref?: string;
    className?: string;
    ease?: string;
    baseColor?: string;
    pillColor?: string;
    hoveredPillTextColor?: string;
    pillTextColor?: string;
    theme?: 'light' | 'dark';
    initialLoadAnimation?: boolean;
}

export default function PillNav({
    logo,
    logoAlt = "Logo",
    items,
    activeHref,
    className,
    ease = "power2.out",
    baseColor,
    pillColor,
    hoveredPillTextColor,
    pillTextColor,
    theme = 'dark',
    initialLoadAnimation = true,
}: PillNavProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const pillRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

    useGSAP(() => {
        const activeIndex = items.findIndex(item => item.href === activeHref);
        const activeElement = itemsRef.current[activeIndex];

        if (activeElement && pillRef.current) {
            const { offsetLeft, offsetWidth } = activeElement;

            gsap.to(pillRef.current, {
                x: offsetLeft,
                width: offsetWidth,
                duration: 0.4,
                ease: ease,
            });
        }
    }, { dependencies: [activeHref, items], scope: containerRef });

    return (
        <div
            className={cn(
                "flex items-center gap-4 px-4 py-2 rounded-full",
                theme === 'dark' ? "bg-zinc-900/80 border-zinc-800" : "bg-white/80 border-zinc-200",
                "border backdrop-blur-md shadow-lg",
                className
            )}
            style={{ backgroundColor: baseColor }}
        >
            {logo && (
                <Link href="/" className="mr-2 flex-shrink-0">
                    <Image src={logo} alt={logoAlt} width={32} height={32} className="w-8 h-8" />
                </Link>
            )}

            <div ref={containerRef} className="relative flex items-center">
                {/* The Animated Pill Background */}
                <div
                    ref={pillRef}
                    className="absolute h-full rounded-full transition-opacity"
                    style={{
                        backgroundColor: pillColor || (theme === 'dark' ? '#ffffff' : '#000000'),
                        top: 0,
                        left: 0,
                        zIndex: 0
                    }}
                />

                {items.map((item, index) => {
                    const isActive = activeHref === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            ref={(el) => { itemsRef.current[index] = el; }}
                            className={cn(
                                "relative z-10 px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-full group",
                                isActive
                                    ? (theme === 'dark' ? "text-black" : "text-white")
                                    : (theme === 'dark' ? "text-zinc-400" : "text-zinc-600")
                            )}
                            style={{
                                color: isActive ? pillTextColor : undefined
                            }}
                        >
                            <span
                                className="relative z-10 transition-colors duration-300"
                                style={{
                                    color: isActive
                                        ? pillTextColor
                                        : hoveredPillTextColor
                                            ? undefined // Let Tailwind handle default non-active color, then apply hover style
                                            : undefined
                                }}
                            >
                                {item.label}
                            </span>
                            {/* Apply hover color via pseudo-element or direct style if hoveredPillTextColor is present */}
                            {!isActive && hoveredPillTextColor && (
                                <span
                                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                                    style={{ color: hoveredPillTextColor }}
                                >
                                    {item.label}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
