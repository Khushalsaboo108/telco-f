'use client'

import React, { useRef, useEffect } from 'react';

interface VideoBlockProps {
    src: string;
    poster: string;
}

const VideoBlock: React.FC<VideoBlockProps> = ({ src, poster }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (videoRef.current) {
                    if (entry.isIntersecting) {
                        videoRef.current.play();
                    } else {
                        videoRef.current.pause();
                    }
                }
            },
            { threshold: 0.5 }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    return (
        <div className="max-w-4xl w-full overflow-hidden rounded-lg shadow-lg">
            <video
                ref={videoRef}
                className="w-full h-auto"
                muted
                loop
                autoPlay
                poster={poster}
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoBlock;
