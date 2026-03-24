import { Funnel_Display, Ubuntu_Sans, Ubuntu_Sans_Mono } from 'next/font/google';

export const funnelDisplay = Funnel_Display({
  subsets: ['latin'],
  variable: '--font-funnel-display',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const ubuntuSans = Ubuntu_Sans({
  subsets: ['latin'],
  variable: '--font-ubuntu-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const ubuntuSansMono = Ubuntu_Sans_Mono({
  subsets: ['latin'],
  variable: '--font-ubuntu-sans-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});
