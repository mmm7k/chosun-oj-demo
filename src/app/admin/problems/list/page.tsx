import ProblemList from '@/components/admin/problems/ProblemList';
import { Suspense } from 'react';

export default function List() {
  return (
    <Suspense>
      <ProblemList />
    </Suspense>
  );
}
