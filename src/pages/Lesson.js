import { useContext } from 'react';
import { Layout } from '../components/Home/Layout';

import { SessionContext } from '../index';
import { ContextProvider } from '../ContextVideoChat';

import { Student } from '../components/Lesson/Student/Student';
import { Teacher } from '../components/Lesson/Teacher/Teacher';

export const Lesson = () => {
    const { session } = useContext(SessionContext);

    if (session === null) return (window.location.href = '/login');
    //add ready statement
    else if (session.permission === 'teacher')
        return (
            <ContextProvider session={session}>
                <Teacher />
            </ContextProvider>
        );
    else if (session.permission === 'student')
        return (
            <ContextProvider session={session}>
                <Student />
            </ContextProvider>
        );
};
