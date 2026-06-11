-- ==============================================================================
-- MTF AUTO-ECOLE: SUPABASE PRODUCTION SCHEMA
-- ==============================================================================
-- Execute this script in your Supabase SQL Editor to create the required tables
-- for the live student dashboard workflow.
-- 1. Profiles Table (Extends auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    first_name TEXT DEFAULT '',
    last_name TEXT DEFAULT '',
    phone TEXT DEFAULT '',
    address TEXT DEFAULT '',
    avatar_url TEXT DEFAULT '',
    is_premium BOOLEAN DEFAULT false,
    language TEXT DEFAULT 'fr',
    role TEXT DEFAULT 'learner',
    -- 'learner', 'teacher', 'admin'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Secure Profiles (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR
SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR
INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR
UPDATE USING (auth.uid() = id);
-- 2. Videos Catalog
CREATE TABLE public.videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    duration TEXT NOT NULL,
    -- e.g., "12:30"
    video_url TEXT NOT NULL,
    section_id TEXT NOT NULL,
    -- 'code', 'conduite', 'mecanique', 'eco'
    order_index INTEGER NOT NULL DEFAULT 0,
    is_premium_only BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Videos are viewable by all authenticated users" ON public.videos FOR
SELECT USING (auth.role() = 'authenticated');
-- 3. User Video Progress (Tracks what videos the user watched)
CREATE TABLE public.user_video_progress (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    video_id UUID REFERENCES public.videos(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'locked',
    -- 'locked', 'in_progress', 'watched'
    last_timestamp_seconds INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY(user_id, video_id)
);
ALTER TABLE public.user_video_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own progress" ON public.user_video_progress FOR
SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON public.user_video_progress FOR
INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON public.user_video_progress FOR
UPDATE USING (auth.uid() = user_id);
-- 4. Calendar Events (Lessons, Meetings, Exams)
CREATE TABLE public.calendar_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    -- 'driving', 'meeting', 'exam'
    date DATE NOT NULL,
    time_range TEXT NOT NULL,
    -- e.g., "14:00 - 15:30"
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    monitor_name TEXT DEFAULT '',
    status TEXT DEFAULT 'pending',
    -- 'pending', 'confirmed', 'cancelled'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own events" ON public.calendar_events FOR
SELECT USING (auth.uid() = user_id);
-- 5. Exam History
CREATE TABLE public.exam_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    exam_title TEXT NOT NULL,
    score INTEGER NOT NULL,
    passed BOOLEAN NOT NULL,
    wrong_answers JSONB DEFAULT '[]',
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.exam_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own exams" ON public.exam_history FOR
SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own exams" ON public.exam_history FOR
INSERT WITH CHECK (auth.uid() = user_id);
-- 6. PDFs Catalog
CREATE TABLE public.pdfs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    file_url TEXT NOT NULL,
    size TEXT NOT NULL,
    -- e.g., "2.4 MB"
    category TEXT NOT NULL,
    -- 'code', 'panneaux'
    is_premium_only BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.pdfs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "PDFs are viewable by all authenticated users" ON public.pdfs FOR
SELECT USING (auth.role() = 'authenticated');