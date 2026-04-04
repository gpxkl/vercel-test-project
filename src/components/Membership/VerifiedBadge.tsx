import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';

interface VerifiedBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number; // Size in px, default 14 as per SDD
  className?: string;
}

const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  size = 14,
  className,
  ...rest
}) => {
  return (
    <div className={cn('inline-flex items-center justify-center', className)} {...rest}>
      <ShieldCheck
        size={size}
        className="text-primary-foreground"
        style={{ color: 'var(--primary)' }} // Override to ensure primary color if needed
      />
    </div>
  );
};

export default VerifiedBadge;
