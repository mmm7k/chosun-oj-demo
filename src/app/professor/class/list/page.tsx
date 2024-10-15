import ClassList from '@/components/professor/class/ClassList';
import { Suspense } from 'react';

export default function List() {
  return (
    <Suspense>
      <ClassList />
    </Suspense>
  );
}
