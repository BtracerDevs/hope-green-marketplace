'use client';

import {useEffect, useId, useRef, useState} from 'react';
import {useRouter} from 'next/navigation';
import {ChevronDown} from 'lucide-react';

const SUPPORTED = ['en', 'pt', 'es', 'fr'] as const;
type Locale = (typeof SUPPORTED)[number];

const LOCALE_META: Record<Locale, { label: string; flag: string }> = {
  en: { label: 'English',   flag: '🇺🇸' },
  pt: { label: 'Português', flag: '🇧🇷' },
  es: { label: 'Español',   flag: '🇪🇸' },
  fr: { label: 'Français',  flag: '🇫🇷' }
};

export default function LocaleSwitcher() {
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>('en');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const menuId = useId();

  // init from storage/cookie
  useEffect(() => {
    const stored =
      typeof window !== 'undefined'
        ? (localStorage.getItem('locale') as Locale | null)
        : null;

    const initial = stored && SUPPORTED.includes(stored) ? stored : 'en';
    setLocale(initial);
    document.cookie = `locale=${initial}; path=/; max-age=31536000; samesite=lax`;
  }, []);

  function update(next: Locale) {
    setLocale(next);
    localStorage.setItem('locale', next);
    document.cookie = `locale=${next}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  }

  // close on outside click
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!menuRef.current?.contains(t) && !triggerRef.current?.contains(t)) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onScroll = () => setOpen(false);
    document.addEventListener('mousedown', onDown);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('mousedown', onDown);
      window.removeEventListener('scroll', onScroll);
    };
  }, [open]);

  // focus the active item when open
  useEffect(() => {
    if (!open || activeIndex == null) return;
    const el = itemRefs.current[activeIndex];
    const id = requestAnimationFrame(() => el?.focus());
    return () => cancelAnimationFrame(id);
  }, [open, activeIndex]);

  const current = LOCALE_META[locale];

  function openMenu(focusIndex = 0) {
    setOpen(true);
    setActiveIndex(focusIndex);
  }
  function closeMenu() {
    setOpen(false);
    setActiveIndex(null);
  }
  function toggleMenu() {
    setOpen((v) => !v);
  }

  function onTriggerKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      openMenu(0);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      openMenu(SUPPORTED.length - 1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (open) closeMenu();
      else openMenu(0);
    } else if (e.key === 'Escape') {
      if (open) {
        e.preventDefault();
        closeMenu();
      }
    }
  }

  function onMenuKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeMenu();
      triggerRef.current?.focus();
      return;
    }
    if (e.key === 'Tab') {
      closeMenu();
      return;
    }
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
      e.preventDefault();
      const count = SUPPORTED.length;
      let next = activeIndex ?? 0;
      if (e.key === 'ArrowDown') next = (next + 1) % count;
      if (e.key === 'ArrowUp') next = (next - 1 + count) % count;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = count - 1;
      setActiveIndex(next);
      return;
    }
  }

  return (
    <div className="relative inline-block text-left">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={toggleMenu}
        onKeyDown={onTriggerKeyDown}
        className="inline-flex items-center gap-2 text-black rounded-lg bg-white border border-gray-300  px-3 py-3 text-lg hover:bg-gray-50 focus:outline-none"
      >
        <span className="text-lg" aria-hidden>{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
        <ChevronDown size={16} className="opacity-60" />
        <span className="sr-only">Change language</span>
      </button>

      {open && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label="Select language"
          tabIndex={-1}
          onKeyDown={onMenuKeyDown}
          className="absolute right-0 z-50 mt-2 min-w-[10rem] rounded-xl border border-gray-200 bg-white p-1 shadow-lg"
        >
          {SUPPORTED.map((code, idx) => {
            const meta = LOCALE_META[code];
            const checked = code === locale;
            const isActive = idx === activeIndex;

            return (
              <button
                key={code}
                role="menuitemradio"
                aria-checked={checked}
                tabIndex={-1}
                onMouseMove={() => setActiveIndex(idx)}
                onClick={() => {
                  update(code);
                  closeMenu();
                  triggerRef.current?.focus();
                }}
                className={[
                  'flex w-full text-black items-center gap-2 rounded-lg px-3 py-2 text-left text-sm',
                  'hover:bg-gray-100',
                  isActive ? 'bg-gray-100' : ''
                ].join(' ')}
              >
                <span className="text-lg" aria-hidden>{meta.flag}</span>
                <span className="flex-1">{meta.label}</span>
                {checked && <span className="text-xs opacity-60">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
