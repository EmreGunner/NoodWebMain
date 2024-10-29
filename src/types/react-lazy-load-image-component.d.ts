declare module 'react-lazy-load-image-component' {
  import { ComponentType, ImgHTMLAttributes } from 'react';

  export interface LazyLoadImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    afterLoad?: () => void;
    beforeLoad?: () => void;
    delayMethod?: 'debounce' | 'throttle';
    delayTime?: number;
    effect?: string;
    placeholder?: React.ReactNode;
    threshold?: number;
    useIntersectionObserver?: boolean;
    visibleByDefault?: boolean;
    wrapperClassName?: string;
    scrollPosition?: { x: number; y: number };
  }

  export const LazyLoadImage: ComponentType<LazyLoadImageProps>;
} 