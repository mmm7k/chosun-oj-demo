import StudentList from '@/components/admin/student/StudentList';
import { Suspense } from 'react';

export default function List() {
  return (
    <Suspense>
      <StudentList />
    </Suspense>
  );
}
