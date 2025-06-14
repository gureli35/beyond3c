import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CardProps } from '@/types';

const Card: React.FC<CardProps> = ({
  children,
  title,
  image,
  href,
  className = '',
}) => {
  const cardContent = (
    <div className={`card ${className}`}>
      {image && (
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={title || 'Card image'}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      
      {title && (
        <h3 className="font-montserrat font-semibold text-xl mb-3 text-accent-500">
          {title}
        </h3>
      )}
      
      <div className="text-accent-500">
        {children}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block transition-transform duration-200 hover:scale-105">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default Card;
