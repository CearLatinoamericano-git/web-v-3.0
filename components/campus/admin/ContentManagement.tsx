import { useState } from 'react';
import { CoursesManagement } from './CoursesManagement';
import { CourseCreator } from './CourseCreator';
import { CourseContentBuilder } from './CourseContentBuilder';
import { StudentManagement } from './StudentManagement';
import { ScheduleManagement } from './ScheduleManagement';

type ContentView = 'list' | 'creator' | 'editor' | 'students' | 'schedules';

interface ContentManagementProps {
  onBack?: () => void;
}

export function ContentManagement({ onBack }: ContentManagementProps = {}) {
  const [currentView, setCurrentView] = useState<ContentView>('list');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const handleCreateCourse = () => {
    setCurrentView('creator');
  };

  const handleEditCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView('editor');
  };

  const handleViewCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView('editor');
  };

  const handleManageStudents = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView('students');
  };

  const handleManageSchedules = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView('schedules');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedCourseId(null);
  };

  const handleCourseCreated = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView('editor');
  };

  if (currentView === 'creator') {
    return (
      <CourseCreator
        onBack={handleBackToList}
        onComplete={handleCourseCreated}
      />
    );
  }

  if (currentView === 'editor' && selectedCourseId) {
    return (
      <CourseContentBuilder
        courseId={selectedCourseId}
        onBack={handleBackToList}
      />
    );
  }

  if (currentView === 'students' && selectedCourseId) {
    return (
      <StudentManagement 
        courseId={selectedCourseId}
        onBack={handleBackToList} 
      />
    );
  }

  if (currentView === 'schedules') {
    return (
      <ScheduleManagement 
        onBack={handleBackToList} 
        initialCourseId={selectedCourseId || undefined}
      />
    );
  }

  return (
    <CoursesManagement
      onCreateCourse={handleCreateCourse}
      onEditCourse={handleEditCourse}
      onViewCourse={handleViewCourse}
      onManageStudents={handleManageStudents}
      onManageSchedules={handleManageSchedules}
      onManageContent={(courseId: string) => {
        setSelectedCourseId(courseId);
        setCurrentView('editor');
      }}
      onManageAttendance={(courseId: string) => {
        setSelectedCourseId(courseId);
        console.log('Gestionar asistencia del curso:', courseId);
      }}
      onManageGrades={(courseId: string) => {
        setSelectedCourseId(courseId);
        console.log('Gestionar calificaciones del curso:', courseId);
      }}
      onManageCertificates={(courseId: string) => {
        setSelectedCourseId(courseId);
        console.log('Gestionar certificados del curso:', courseId);
      }}
      onBack={onBack}
    />
  );
}