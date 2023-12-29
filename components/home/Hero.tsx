'use client';

import Image from 'next/image';
import mockup from './mockup.png';

export default function Hero() {
  return (
    <div>
      <Image
        className="mx-auto h-full w-auto select-none object-contain"
        src={mockup.src}
        alt="home"
        height={600}
        width={600}
      />
      <style jsx>{`
        @media (min-width: 1024px) {
          div {
            cursor: pointer;
            height: 600px;
            transform: perspective(800px) rotateY(-20deg) scale(0.9) rotateX(10deg);
            filter: blur(2px);
            opacity: 0.5;
            transition: 0.6s ease all;

            &:hover {
              padding-top: 50px;
              transform: perspective(800px) rotateY(15deg) translateY(-50px) rotateX(5deg) scale(1);
              filter: blur(0);
              opacity: 1;
            }
          }
        }
      `}</style>
    </div>
  );
}
