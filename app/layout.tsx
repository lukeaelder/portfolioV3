import SmoothScrollProvider from '@/components/gsap/SmoothScroll.context';
import './globals.css';
import { Antonio } from 'next/font/google';

const font = Antonio({
    subsets: ['latin'],
    variable: '--font-variable',
});

export const metadata = {
    title: 'Luke Elder',
    description: 'Luke Elder is a full-stack developer and designer.',
    icons: {
        icon: '/favicon.ico',
    },
    themeColor: '#f5f5f5',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en' className={`${font.variable}`}>
            <head />
            <body>
                <SmoothScrollProvider>{children}</SmoothScrollProvider>
            </body>
        </html>
    );
}
