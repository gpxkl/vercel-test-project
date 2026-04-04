// project/src/components/ui/Avatar.tsx
import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  color?: string; // Fallback background color
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

const Avatar: React.FC<AvatarProps> = ({ src, alt = 'avatar', color = '#D1CFC9', size = 'md', className }) => {
  const classes = `rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 ${sizeClasses[size]} ${className}`;

  return (
    <div className={classes} style={{ backgroundColor: !src ? color : undefined }}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="text-white text-lg font-bold"></span>
      )}
    </div>
  );
};

export default Avatar;
