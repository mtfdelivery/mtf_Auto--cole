import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    fr: {
        translation: {
            "dashboard.overview": "Vue d'ensemble",
            "dashboard.videos": "Vidéos (Leçons)",
            "dashboard.planning": "Mon Planning",
            "dashboard.exams": "Examens Blancs",
            "dashboard.pdfs": "Fiches PDF",
            "dashboard.chat": "Messagerie",
            "dashboard.assistance": "Assistance",
            "dashboard.profile": "Mon Profil",
            "dashboard.logout": "Déconnexion",
            "header.welcome": "Bienvenue",
            "notifications.title": "Notifications",
            "notifications.all": "TOUS",
            "notifications.unread": "NON LUES",
            "notifications.empty": "Pas de notifications",
        }
    },
    ar: {
        translation: {
            "dashboard.overview": "نظرة عامة",
            "dashboard.videos": "مقاطع الفيديو (دروس)",
            "dashboard.planning": "جدول المواعيد",
            "dashboard.exams": "الامتحانات التجريبية",
            "dashboard.pdfs": "ملفات PDF",
            "dashboard.chat": "الرسائل",
            "dashboard.assistance": "المساعدة",
            "dashboard.profile": "ملفي الشخصي",
            "dashboard.logout": "تسجيل الخروج",
            "header.welcome": "مرحباً",
            "notifications.title": "الإشعارات",
            "notifications.all": "الكل",
            "notifications.unread": "غير مقروءة",
            "notifications.empty": "لا توجد إشعارات",
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'fr',
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
