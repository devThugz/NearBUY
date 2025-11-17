import React from 'react';
interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}
export default function Logo({
  size = 'md',
  showText = true
}: LogoProps) {
  const sizes = {
    sm: {
      image: 32,
      text: 'text-lg'
    },
    md: {
      image: 48,
      text: 'text-xl'
    },
    lg: {
      image: 160,
      text: 'text-3xl'
    }
  };
  const imageSize = sizes[size].image;
  return <div className="flex items-center">
      <img src="/NearBuy_Logo.png" alt="NEARBUY Logo" className="rounded-lg object-contain" style={{
      width: imageSize,
      height: imageSize
    }} />
      {showText && <div className={`ml-2 font-bold ${sizes[size].text}`}>
          <span className="bg-gradient-to-r from-m2m-accent-blue to-m2m-success bg-clip-text text-transparent">
            NEARBUY
          </span>
        </div>}
    </div>;
}