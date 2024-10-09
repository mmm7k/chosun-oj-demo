'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface PageParamsProps {
  onPageChange: (page: number) => void;
}

export default function PageParams({ onPageChange }: PageParamsProps) {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page') || '1';

  useEffect(() => {
    onPageChange(parseInt(pageParam));
  }, [pageParam, onPageChange]);

  return null;
}
