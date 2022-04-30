import { useContext } from 'react';
import { Layout } from '../components/Home/Layout';

import { SessionContext } from '../index';
import { ContextProviderStudent } from '../context/Lesson/Student';
import { ContextProviderTeacher } from '../context/Lesson/Teacher';

import { Student } from '../components/Lesson/Student/Student';
import { Teacher } from '../components/Lesson/Teacher/Teacher';

export const Lesson = () => {
    const { session } = useContext(SessionContext);

    if (session === null) return (window.location.href = '/login');
    //add ready statement
    else if (session.permission === 'teacher')
        return (
            <ContextProviderTeacher session={session}>
                <Teacher />
            </ContextProviderTeacher>
        );
    else if (session.permission === 'student')
        return (
            <ContextProviderStudent session={session}>
                <Student />
            </ContextProviderStudent>
        );
};
