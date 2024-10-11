import StudentList from '@/components/professor/student/StudentList';
import { Suspense } from 'react';

export default function List() {
  return (
    <Suspense>
      <StudentList />
    </Suspense>
  );
}
