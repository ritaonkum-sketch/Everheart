import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Everheart · Galactic Empire', description: 'A playable story of loyalty, ambition, and connection among the stars.' };
export default function Layout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
