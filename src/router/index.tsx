import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, ScrollRestoration } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HomeHeroSkeleton from '@/components/skeletons'; // Reuse the hero skeleton for full page loading

// ── Lazy load all pages ──
// These form the separate chunks that Vite will build
const Home = lazy(() => import('@/pages/Home'));
const Courses = lazy(() => import('@/pages/Courses'));
const Instructors = lazy(() => import('@/pages/Instructors'));
const Pricing = lazy(() => import('@/pages/Pricing'));
const Contact = lazy(() => import('@/pages/Contact'));
const Login = lazy(() => import('@/pages/Login'));
const Signup = lazy(() => import('@/pages/Signup'));
const StudentDashboard = lazy(() => import('@/pages/StudentDashboard'));
const FindSchool = lazy(() => import('@/pages/FindSchool'));
const ExamSimulator = lazy(() => import('@/pages/learner/ExamSimulator'));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'));
const TeacherDashboard = lazy(() => import('@/pages/TeacherDashboard'));
const SchoolDetails = lazy(() => import('@/pages/SchoolDetails'));

const LearnerLayout = lazy(() => import('@/pages/learner/LearnerLayout'));
const DashboardOverview = lazy(() => import('@/pages/learner/DashboardOverview'));
const DashboardVideos = lazy(() => import('@/pages/learner/DashboardVideos'));
const DashboardExams = lazy(() => import('@/pages/learner/DashboardExams'));
const DashboardPDFs = lazy(() => import('@/pages/learner/DashboardPDFs'));
const DashboardChat = lazy(() => import('@/pages/learner/DashboardChat'));

// We create a map of import functions to feed to the NavBar for prefetching
const prefetchRoutes = {
    '/': () => import('@/pages/Home'),
    '/courses': () => import('@/pages/Courses'),
    '/instructors': () => import('@/pages/Instructors'),
    '/pricing': () => import('@/pages/Pricing'),
    '/contact': () => import('@/pages/Contact'),
    '/login': () => import('@/pages/Login'),
    '/signup': () => import('@/pages/Signup'),
    '/dashboard': () => import('@/pages/StudentDashboard'),
    '/ecoles': () => import('@/pages/FindSchool'),
};

const PageSkeleton = () => (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <HomeHeroSkeleton />
    </div>
);

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                <ScrollRestoration />
                <Layout routes={prefetchRoutes} />
            </>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<PageSkeleton />}>
                        <Home />
                    </Suspense>
                ),
            },
            {
                path: 'courses',
                element: (
                    <Suspense fallback={<PageSkeleton />}>
                        <Courses />
                    </Suspense>
                ),
            },
            {
                path: 'instructors',
                element: (
                    <Suspense fallback={<PageSkeleton />}>
                        <Instructors />
                    </Suspense>
                ),
            },
            {
                path: 'pricing',
                element: (
                    <Suspense fallback={<PageSkeleton />}>
                        <Pricing />
                    </Suspense>
                ),
            },

            {
                path: 'ecoles',
                element: (
                    <Suspense fallback={<PageSkeleton />}>
                        <FindSchool />
                    </Suspense>
                ),
            },
            {
                path: 'ecoles/:slug',
                element: (
                    <Suspense fallback={<PageSkeleton />}>
                        <SchoolDetails />
                    </Suspense>
                ),
            },
            {
                path: 'learner/exam',
                element: (
                    <Suspense fallback={<PageSkeleton />}>
                        <ExamSimulator />
                    </Suspense>
                ),
            },

        ],
    },
    // Auth routes typically don't share the main layout (or have a simplified one)
    {
        path: '/login',
        element: (
            <>
                <ScrollRestoration />
                <Suspense fallback={<PageSkeleton />}>
                    <Login />
                </Suspense>
            </>
        ),
    },
    {
        path: '/dashboard',
        element: (
            <>
                <ScrollRestoration />
                <Suspense fallback={<PageSkeleton />}>
                    <LearnerLayout />
                </Suspense>
            </>
        ),
        children: [
            { index: true, element: <Suspense fallback={<PageSkeleton />}><DashboardOverview /></Suspense> },
            { path: 'videos', element: <Suspense fallback={<PageSkeleton />}><DashboardVideos /></Suspense> },
            { path: 'exams', element: <Suspense fallback={<PageSkeleton />}><DashboardExams /></Suspense> },
            { path: 'pdfs', element: <Suspense fallback={<PageSkeleton />}><DashboardPDFs /></Suspense> },
            { path: 'chat', element: <Suspense fallback={<PageSkeleton />}><DashboardChat /></Suspense> },
        ]
    },
    {
        path: '/admin',
        element: (
            <>
                <ScrollRestoration />
                <Suspense fallback={<PageSkeleton />}>
                    <AdminDashboard />
                </Suspense>
            </>
        ),
    },
    {
        path: '/teacher',
        element: (
            <>
                <ScrollRestoration />
                <Suspense fallback={<PageSkeleton />}>
                    <TeacherDashboard />
                </Suspense>
            </>
        ),
    },
    {
        path: '/signup',
        element: (
            <>
                <ScrollRestoration />
                <Suspense fallback={<PageSkeleton />}>
                    <Signup />
                </Suspense>
            </>
        ),
    },
    // Fallbacks for missing pages in this demo
    {
        path: 'contact',
        element: <div style={{ padding: 'var(--space-12)', textAlign: 'center' }}><h2>Contact Page (To Do)</h2></div>
    },
    {
        path: 'instructors',
        element: <div style={{ padding: 'var(--space-12)', textAlign: 'center' }}><h2>Instructors Page (To Do)</h2></div>
    }
]);

export function AppRouter() {
    return <RouterProvider router={router} />;
}
