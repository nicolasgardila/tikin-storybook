'use client';

import { useState } from 'react';

interface IconEntry {
  name: string;
  svg: string;
}

const icons: IconEntry[] = [
  // Navigation
  { name: 'House', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><path d="M152 208V160a8 8 0 0 0-8-8H112a8 8 0 0 0-8 8v48a8 8 0 0 1-8 8H48a8 8 0 0 1-8-8V115.5a8 8 0 0 1 2.6-5.9l80-72.7a8 8 0 0 1 10.8 0l80 72.7a8 8 0 0 1 2.6 5.9V208a8 8 0 0 1-8 8H160a8 8 0 0 1-8-8Z"/></svg>' },
  { name: 'ArrowLeft', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><line x1="216" y1="128" x2="40" y2="128"/><polyline points="112 56 40 128 112 200"/></svg>' },
  { name: 'ArrowRight', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><line x1="40" y1="128" x2="216" y2="128"/><polyline points="144 56 216 128 144 200"/></svg>' },
  { name: 'ArrowUp', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><line x1="128" y1="216" x2="128" y2="40"/><polyline points="56 112 128 40 200 112"/></svg>' },
  { name: 'ArrowDown', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><line x1="128" y1="40" x2="128" y2="216"/><polyline points="56 144 128 216 200 144"/></svg>' },
  { name: 'CaretDown', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><polyline points="208 96 128 176 48 96"/></svg>' },
  { name: 'CaretUp', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><polyline points="48 160 128 80 208 160"/></svg>' },
  { name: 'CaretRight', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><polyline points="96 48 176 128 96 208"/></svg>' },
  { name: 'CaretLeft', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><polyline points="160 208 80 128 160 48"/></svg>' },
  { name: 'X', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><line x1="200" y1="56" x2="56" y2="200"/><line x1="200" y1="200" x2="56" y2="56"/></svg>' },
  { name: 'List', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><line x1="40" y1="128" x2="216" y2="128"/><line x1="40" y1="64" x2="216" y2="64"/><line x1="40" y1="192" x2="216" y2="192"/></svg>' },

  // Actions
  { name: 'Plus', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><line x1="40" y1="128" x2="216" y2="128"/><line x1="128" y1="40" x2="128" y2="216"/></svg>' },
  { name: 'Minus', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><line x1="40" y1="128" x2="216" y2="128"/></svg>' },
  { name: 'Pencil', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><path d="M92.7 216H48a8 8 0 0 1-8-8v-44.7a8 8 0 0 1 2.3-5.6L165.7 34.3a8 8 0 0 1 11.3 0l44.7 44.7a8 8 0 0 1 0 11.3L98.3 213.7a8 8 0 0 1-5.6 2.3Z"/><line x1="136" y1="64" x2="192" y2="120"/></svg>' },
  { name: 'Trash', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><line x1="216" y1="56" x2="40" y2="56"/><line x1="104" y1="104" x2="104" y2="168"/><line x1="152" y1="104" x2="152" y2="168"/><path d="M200 56V208a8 8 0 0 1-8 8H64a8 8 0 0 1-8-8V56"/><path d="M168 56V40a16 16 0 0 0-16-16H104a16 16 0 0 0-16 16v16"/></svg>' },
  { name: 'Copy', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><rect x="32" y="72" width="144" height="144" rx="8"/><path d="M184 72V48a8 8 0 0 0-8-8H48a8 8 0 0 0-8 8V176a8 8 0 0 0 8 8h24" transform="translate(40 -24)"/></svg>' },
  { name: 'Download', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><line x1="128" y1="24" x2="128" y2="168"/><polyline points="80 120 128 168 176 120"/><path d="M216 168v40a8 8 0 0 1-8 8H48a8 8 0 0 1-8-8V168"/></svg>' },
  { name: 'Upload', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><line x1="128" y1="168" x2="128" y2="24"/><polyline points="176 72 128 24 80 72"/><path d="M216 168v40a8 8 0 0 1-8 8H48a8 8 0 0 1-8-8V168"/></svg>' },
  { name: 'Share', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><polyline points="176 104 224 56 176 8" transform="translate(0 24)"/><path d="M176 200H88a56 56 0 0 1-56-56v0a56 56 0 0 1 56-56h72" transform="translate(0 24)"/></svg>' },
  { name: 'Check', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><polyline points="216 72 104 184 48 128"/></svg>' },
  { name: 'MagnifyingGlass', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><circle cx="116" cy="116" r="84"/><line x1="175.4" y1="175.4" x2="224" y2="224"/></svg>' },

  // Communication
  { name: 'Bell', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><path d="M96 192a32 32 0 0 0 64 0"/><path d="M56 104a72 72 0 0 1 144 0c0 36 8 64 24 80H32c16-16 24-44 24-80Z"/></svg>' },
  { name: 'ChatCircle', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><path d="M45.4 177A96 96 0 1 1 79 210.6L45.8 220a8 8 0 0 1-9.8-9.8Z"/></svg>' },
  { name: 'Envelope', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><rect x="24" y="56" width="208" height="144" rx="8"/><polyline points="224 56 128 144 32 56"/></svg>' },
  { name: 'Phone', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><path d="M92.5 24.7 68.1 49.1A16 16 0 0 0 63.5 60C58 87 71 121 103 153s66 45 93 39.5a16 16 0 0 0 10.9-4.6l24.4-24.4a16 16 0 0 0 0-22.6L198 108.7a16 16 0 0 0-22.6 0l-12.3 12.3a80 80 0 0 1-28-28l12.3-12.3a16 16 0 0 0 0-22.6L115.1 24.7a16 16 0 0 0-22.6 0Z"/></svg>' },

  // User
  { name: 'User', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><circle cx="128" cy="96" r="64"/><path d="M32 224c0-35.3 43-64 96-64s96 28.7 96 64"/></svg>' },
  { name: 'UserCircle', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><circle cx="128" cy="128" r="96"/><circle cx="128" cy="112" r="36"/><path d="M68 212c8.4-29.3 35.4-52 60-52s51.6 22.7 60 52"/></svg>' },
  { name: 'Users', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><circle cx="88" cy="108" r="52"/><path d="M8 224c0-30.9 35.8-56 80-56s80 25.1 80 56"/><circle cx="192" cy="108" r="36"/><path d="M248 224c0-22-20-40-44.9-47.5"/></svg>' },
  { name: 'SignOut', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><polyline points="174 86 216 128 174 170"/><line x1="104" y1="128" x2="216" y2="128"/><path d="M104 216H48a8 8 0 0 1-8-8V48a8 8 0 0 1 8-8h56"/></svg>' },
  { name: 'SignIn', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><polyline points="174 86 216 128 174 170"/><line x1="24" y1="128" x2="216" y2="128"/></svg>' },

  // Content
  { name: 'Eye', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><circle cx="128" cy="128" r="32"/><path d="M128 56C48 56 16 128 16 128s32 72 112 72 112-72 112-72-32-72-112-72Z"/></svg>' },
  { name: 'EyeSlash', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><line x1="48" y1="40" x2="208" y2="216"/><path d="M154.9 157.6A32 32 0 0 1 98.4 101"/><path d="M74.4 68.2C33.2 89.6 16 128 16 128s32 72 112 72a124 124 0 0 0 53.6-12.2"/><path d="M208.4 169.1C228 150 240 128 240 128s-32-72-112-72a124 124 0 0 0-20.5 1.7"/></svg>' },
  { name: 'Star', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><path d="M128 16l30.6 66.3L232 93.6l-52 48.5L192.2 216 128 179.1 63.8 216 76 142.1l-52-48.5 73.4-11.3Z"/></svg>' },
  { name: 'Heart', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><path d="M128 224S24 168 24 100a52 52 0 0 1 52-52c22.5 0 38.3 11 52 30 13.7-19 29.5-30 52-30a52 52 0 0 1 52 52c0 68-104 124-104 124Z"/></svg>' },
  { name: 'Bookmark', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><path d="M192 224l-64-40-64 40V48a8 8 0 0 1 8-8h112a8 8 0 0 1 8 8Z"/></svg>' },
  { name: 'Flag', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><line x1="40" y1="240" x2="40" y2="40"/><path d="M40 168s8-24 48-24 56 24 96 24 32-24 32-24V40s8 24-32 24-56-24-96-24-48 24-48 24Z"/></svg>' },

  // System
  { name: 'Gear', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><circle cx="128" cy="128" r="40"/><path d="M130.1 28h-4.2a8 8 0 0 0-7.9 6.9l-3.6 25.4a84 84 0 0 0-24 13.9l-24-9.4a8 8 0 0 0-10 3.5l-2.1 3.7a8 8 0 0 0 2 10.4l20.4 16a84 84 0 0 0 0 27.2l-20.4 16a8 8 0 0 0-2 10.4l2.1 3.7a8 8 0 0 0 10 3.5l24-9.4a84 84 0 0 0 24 13.9l3.6 25.4a8 8 0 0 0 7.9 6.9h4.2a8 8 0 0 0 7.9-6.9l3.6-25.4a84 84 0 0 0 24-13.9l24 9.4a8 8 0 0 0 10-3.5l2.1-3.7a8 8 0 0 0-2-10.4l-20.4-16a84 84 0 0 0 0-27.2l20.4-16a8 8 0 0 0 2-10.4l-2.1-3.7a8 8 0 0 0-10-3.5l-24 9.4a84 84 0 0 0-24-13.9l-3.6-25.4a8 8 0 0 0-7.9-6.9Z"/></svg>' },
  { name: 'Info', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><circle cx="128" cy="128" r="96"/><polyline points="120 120 128 120 128 176 136 176"/><circle cx="128" cy="84" r="4" fill="currentColor" stroke="none"/></svg>' },
  { name: 'Warning', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><path d="M116.3 36.2 21.7 194a16 16 0 0 0 13.7 24h189.2a16 16 0 0 0 13.7-24L143.7 36.2a16 16 0 0 0-27.4 0Z"/><line x1="128" y1="112" x2="128" y2="144"/><circle cx="128" cy="176" r="4" fill="currentColor" stroke="none"/></svg>' },
  { name: 'XCircle', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><circle cx="128" cy="128" r="96"/><line x1="160" y1="96" x2="96" y2="160"/><line x1="160" y1="160" x2="96" y2="96"/></svg>' },
  { name: 'CheckCircle', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><circle cx="128" cy="128" r="96"/><polyline points="176 104 112 168 80 136"/></svg>' },
  { name: 'Clock', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><circle cx="128" cy="128" r="96"/><polyline points="128 72 128 128 184 128"/></svg>' },
  { name: 'Calendar', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><rect x="40" y="40" width="176" height="176" rx="8"/><line x1="176" y1="24" x2="176" y2="56"/><line x1="80" y1="24" x2="80" y2="56"/><line x1="40" y1="88" x2="216" y2="88"/></svg>' },

  // Finance
  { name: 'CreditCard', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><rect x="24" y="56" width="208" height="144" rx="8"/><line x1="24" y1="96" x2="232" y2="96"/><line x1="24" y1="136" x2="232" y2="136"/><line x1="64" y1="168" x2="96" y2="168"/><line x1="136" y1="168" x2="184" y2="168"/></svg>' },
  { name: 'Bank', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><polygon points="24 96 128 32 232 96 24 96"/><line x1="56" y1="96" x2="56" y2="176"/><line x1="104" y1="96" x2="104" y2="176"/><line x1="152" y1="96" x2="152" y2="176"/><line x1="200" y1="96" x2="200" y2="176"/><line x1="24" y1="176" x2="232" y2="176"/><line x1="16" y1="208" x2="240" y2="208"/></svg>' },
  { name: 'CurrencyDollar', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><line x1="128" y1="24" x2="128" y2="232"/><path d="M184 88a40 40 0 0 0-40-40H108a40 40 0 0 0 0 80h44a40 40 0 0 1 0 80H108a40 40 0 0 1-40-40"/></svg>' },
  { name: 'Wallet', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><rect x="32" y="56" width="192" height="160" rx="8"/><path d="M32 88h192"/><circle cx="180" cy="144" r="12" fill="currentColor" stroke="none"/><path d="M32 72V56a16 16 0 0 1 16-16h136a16 16 0 0 1 16 16"/></svg>' },
  { name: 'Receipt', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><path d="M32 208V56a8 8 0 0 1 8-8h176a8 8 0 0 1 8 8v152l-32-16-32 16-32-16-32 16-32-16Z"/><line x1="80" y1="104" x2="176" y2="104"/><line x1="80" y1="136" x2="176" y2="136"/></svg>' },
  { name: 'ArrowsLeftRight', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><polyline points="176 168 216 128 176 88"/><polyline points="80 88 40 128 80 168"/><line x1="216" y1="128" x2="40" y2="128"/></svg>' },

  // Media
  { name: 'Camera', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><path d="M208 56H172l-12-24a8 8 0 0 0-7.2-4h-49.6a8 8 0 0 0-7.2 4L84 56H48a16 16 0 0 0-16 16v112a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V72a16 16 0 0 0-16-16Z"/><circle cx="128" cy="132" r="40"/></svg>' },
  { name: 'Image', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><rect x="32" y="48" width="192" height="160" rx="8"/><circle cx="100" cy="116" r="20"/><path d="M224 168l-44-44a8 8 0 0 0-11.3 0L68 224"/></svg>' },
  { name: 'File', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><path d="M200 224H56a8 8 0 0 1-8-8V40a8 8 0 0 1 8-8h96l56 56v128a8 8 0 0 1-8 8Z"/><polyline points="152 32 152 88 208 88"/></svg>' },
  { name: 'Folder', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><path d="M216 72H130.7L102.3 51.2A8 8 0 0 0 97.5 48H40a8 8 0 0 0-8 8v152a8 8 0 0 0 8 8h176a8 8 0 0 0 8-8V80a8 8 0 0 0-8-8Z"/></svg>' },
];

export function IconSearch() {
  const [query, setQuery] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const filtered = icons.filter((icon) =>
    icon.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleCopy = async (svg: string, index: number) => {
    try {
      await navigator.clipboard.writeText(svg);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch {
      console.warn('Clipboard API not available. SVG not copied.');
    }
  };

  return (
    <div style={{ marginTop: '1.5rem' }}>
      {/* Search input */}
      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Buscar icono..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '0.625rem 1rem',
            borderRadius: '8px',
            border: '1px solid var(--docs-border)',
            background: 'var(--docs-bg)',
            color: 'var(--docs-fg)',
            fontSize: '0.875rem',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        <span
          style={{
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '0.75rem',
            color: 'var(--docs-muted)',
          }}
        >
          {filtered.length} de {icons.length}
        </span>
      </div>

      {/* Icon grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '0.5rem',
        }}
      >
        {filtered.map((icon, i) => (
          <button
            key={icon.name}
            onClick={() => handleCopy(icon.svg, i)}
            title={`Copiar SVG de ${icon.name}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.75rem 0.5rem',
              borderRadius: '8px',
              border: '1px solid var(--docs-border)',
              background: copiedIndex === i ? 'var(--ds-brand)' : 'var(--docs-bg)',
              color: copiedIndex === i ? '#fff' : 'var(--docs-fg)',
              cursor: 'pointer',
              transition: 'background 150ms, color 150ms, border-color 150ms',
              fontSize: '0.625rem',
              lineHeight: 1.2,
              textAlign: 'center',
              wordBreak: 'break-word',
            }}
          >
            <span
              dangerouslySetInnerHTML={{ __html: icon.svg }}
              style={{ width: 24, height: 24, flexShrink: 0 }}
            />
            <span>{copiedIndex === i ? 'Copiado!' : icon.name}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p
          style={{
            textAlign: 'center',
            color: 'var(--docs-muted)',
            padding: '2rem 0',
            fontSize: '0.875rem',
          }}
        >
          No se encontraron iconos para &ldquo;{query}&rdquo;
        </p>
      )}
    </div>
  );
}
