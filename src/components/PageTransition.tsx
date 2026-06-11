import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const pageVariants: Variants = {
    initial: { opacity: 0, y: 10 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.18, ease: 'easeOut' },
    },
    exit: {
        opacity: 0,
        y: -6,
        transition: { duration: 0.12 },
    },
};

interface PageTransitionProps {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export default function PageTransition({ children, className, style }: PageTransitionProps) {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={className}
            style={{ flex: 1, ...style }}
        >
            {children}
        </motion.div>
    );
}
