'use client';

import { cva } from 'class-variance-authority';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '@/shared/utils';

interface SliderProps {
  value:      number;
  onChange?:  (value: number) => void;
  min?:       number;
  max?:       number;
  step?:      number;
  disabled?:  boolean;
  className?: string;
  showThumb?: boolean;
}

const trackVariants = cva('h-1 rounded-full bg-grayscale-700 relative cursor-pointer', {
  variants: {},
});

const fillVariants = cva('h-full rounded-full absolute left-0 top-0 bg-blue-solid', {
  variants: {},
});

const thumbVariants = cva('absolute top-1/2 -translate-y-1/2 rounded-full border-2 border-grayscale-100 cursor-grab active:cursor-grabbing w-3 h-3 bg-blue-solid', {
  variants: {},
});

export function Slider(props: SliderProps) {
  const {
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    className,
    showThumb = true,
  } = props;

  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragValue, setDragValue] = useState(value);

  // 드래그 중일 때는 dragValue를 사용, 아닐 때는 value를 사용
  const displayValue = isDragging ? dragValue : value;
  const clampedValue = Math.min(max, Math.max(min, displayValue));
  const percentage = ((clampedValue - min) / (max - min)) * 100;

  // Track 클릭 시 해당 위치로 이동 (애니메이션 적용)
  const handleTrackClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || isDragging) {
      return;
    }

    if (!trackRef.current) {
      return;
    }

    const rect = trackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickPercentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const newValue = min + (clickPercentage / 100) * (max - min);
    const steppedValue = Math.round(newValue / step) * step;
    const clampedSteppedValue = Math.min(max, Math.max(min, steppedValue));

    onChange?.(clampedSteppedValue);
  }, [disabled, isDragging, min, max, step, onChange]);

  // Thumb 드래그 시작
  const handleThumbMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }

    e.stopPropagation();
    setIsDragging(true);
    setDragValue(value);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!trackRef.current) {
        return;
      }

      const rect = trackRef.current.getBoundingClientRect();
      const x = moveEvent.clientX - rect.left;
      const movePercentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const newValue = min + (movePercentage / 100) * (max - min);
      const steppedValue = Math.round(newValue / step) * step;
      const clampedSteppedValue = Math.min(max, Math.max(min, steppedValue));

      setDragValue(clampedSteppedValue);
      onChange?.(clampedSteppedValue);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [disabled, value, min, max, step, onChange]);

  // Thumb 터치 시작
  const handleThumbTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }

    e.stopPropagation();
    setIsDragging(true);
    setDragValue(value);

    const handleTouchMove = (moveEvent: TouchEvent) => {
      if (!trackRef.current) {
        return;
      }

      const touch = moveEvent.touches[0];

      if (!touch) {
        return;
      }

      const rect = trackRef.current.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const movePercentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const newValue = min + (movePercentage / 100) * (max - min);
      const steppedValue = Math.round(newValue / step) * step;
      const clampedSteppedValue = Math.min(max, Math.max(min, steppedValue));

      setDragValue(clampedSteppedValue);
      onChange?.(clampedSteppedValue);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };

    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    // 초기 터치 위치에서도 값 업데이트
    if (e.touches[0] && trackRef.current) {
      const rect = trackRef.current.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const movePercentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const newValue = min + (movePercentage / 100) * (max - min);
      const steppedValue = Math.round(newValue / step) * step;
      const clampedSteppedValue = Math.min(max, Math.max(min, steppedValue));

      setDragValue(clampedSteppedValue);
      onChange?.(clampedSteppedValue);
    }
  }, [disabled, value, min, max, step, onChange]);

  // value가 변경될 때 dragValue도 업데이트 (드래그 중이 아닐 때만)
  useEffect(() => {
    if (!isDragging) {
      setDragValue(value);
    }
  }, [value, isDragging]);

  return (
    <div className={cn('w-full', className)}>
      <div
        ref={trackRef}
        className={trackVariants()}
        onClick={handleTrackClick}
      >
        {/* 진행된 부분 (파란색) */}
        <div
          className={cn(fillVariants())}
          style={{
            width: `${percentage}%`,
            transition: isDragging ? 'none' : 'width 0.2s ease-out',
          }}
        />

        {/* 남은 부분 (흰색) */}
        <div
          className={cn(fillVariants(), 'bg-grayscale-100 right-0 left-auto')}
          style={{
            width: `${100 - percentage}%`,
            transition: isDragging ? 'none' : 'width 0.2s ease-out',
          }}
        />

        {/* 썸 */}
        {showThumb && (
          <div
            className={cn(thumbVariants(), {
              'scale-110': isDragging,
            })}
            style={{
              left: `${percentage}%`,
              transition: isDragging ? 'none' : 'left 0.2s ease-out, scale 0.1s ease-out',
            }}
            onMouseDown={handleThumbMouseDown}
            onTouchStart={handleThumbTouchStart}
          />
        )}
      </div>
    </div>
  );
}
