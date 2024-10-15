import CourseList from '@/components/admin/course/CourseList';
import { Suspense } from 'react';

export default function List() {
  return (
    <Suspense>
      <CourseList />
    </Suspense>
  );
}
