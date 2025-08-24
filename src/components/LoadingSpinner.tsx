import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="animate-spin rounded-full border-2 border-border border-t-accent"></div>
    </div>
  );
};

export default LoadingSpinner;

export const ProductCardSkeleton = () => (
  <div className="bg-card rounded-2xl p-6 animate-pulse">
    <div className="bg-muted rounded-xl h-48 mb-4"></div>
    <div className="space-y-3">
      <div className="bg-muted h-4 rounded w-3/4"></div>
      <div className="bg-muted h-3 rounded w-1/2"></div>
      <div className="bg-muted h-6 rounded w-1/3"></div>
      <div className="flex gap-2">
        <div className="bg-muted h-8 rounded-full flex-1"></div>
        <div className="bg-muted h-8 rounded-full flex-1"></div>
      </div>
    </div>
  </div>
);

export const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    {Array.from({ length: count }).map((_, index) => (
      <ProductCardSkeleton key={index} />
    ))}
  </div>
);