import AnnouncementList from '@/components/professor/announcement/AnnouncementList';
import { Suspense } from 'react';

export default function List() {
  return (
    <Suspense>
      <AnnouncementList />
    </Suspense>
  );
}
