import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Check, Home, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import SuccessIcon from '@/assets/icons/success';
import AppLogo from '@/components/app-logo';
import { dashboard, home } from '@/routes';

type ConfettiSide = 'left' | 'right';

const confettiColors = ['#0f8a62', '#ffbd72', '#806edc', '#72d5ac', '#f28b82'];

type ConfettiPiece = {
  id: number;
  side: ConfettiSide;
  top: string;
  color: string;
  rotate: number;
  width: number;
  height: number;
  round: boolean;
};

const createConfettiPiece = (id: number): ConfettiPiece => {
  const side: ConfettiSide = id % 2 === 0 ? 'left' : 'right';

  return {
    id,
    side,
    top: `${4 + ((id * 13) % 18)}%`,
    color: confettiColors[id % confettiColors.length],
    rotate: (id * 47) % 180,
    width: id % 3 === 0 ? 7 : 5,
    height: id % 3 === 0 ? 13 : 8,
    round: id % 4 === 0,
  };
};

export default function OnboardingSuccess() {
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    let nextId = 0;

    const emitConfetti = () => {
      const piece = createConfettiPiece(nextId);
      nextId += 1;

      setConfettiPieces((pieces) => [...pieces, piece]);
    };

    emitConfetti();

    const emitter = window.setInterval(emitConfetti, 130);
    const stopEmitter = window.setTimeout(() => {
      window.clearInterval(emitter);
    }, 5000);

    return () => {
      window.clearInterval(emitter);
      window.clearTimeout(stopEmitter);
    };
  }, []);

  const removeConfettiPiece = (id: number) => {
    setConfettiPieces((pieces) => pieces.filter((piece) => piece.id !== id));
  };

  return (
    <>
      <Head title="Setup complete" />

      <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#fbfcfa] px-5 py-8 text-[#17343c] sm:px-8 sm:py-12">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-44 -right-36 size-120 rounded-full bg-[#dff4eb] blur-3xl" />
          <div className="absolute -bottom-48 -left-40 size-128 rounded-full bg-[#fff0d6] blur-3xl" />
          <div className="absolute top-1/2 left-1/2 size-160 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d9eee3]/70" />
          <div className="absolute top-1/2 left-1/2 size-128 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d9eee3]/60" />

          {confettiPieces.map((piece) => {
            const inwardX = piece.side === 'left' ? 1 : -1;

            return (
              <motion.span
                key={piece.id}
                aria-hidden="true"
                className="absolute block"
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  x: inwardX * -16,
                  y: 0,
                  rotate: piece.rotate,
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1, 0.8],
                  x: [inwardX * -16, inwardX * 48, inwardX * 132],
                  y: ['0vh', '20vh', '58vh', '110vh'],
                  rotate: [
                    piece.rotate,
                    piece.rotate + 130,
                    piece.rotate + 260,
                  ],
                }}
                style={{
                  top: piece.top,
                  left:
                    piece.side === 'left'
                      ? `${5 + (piece.id % 5) * 2}%`
                      : undefined,
                  right:
                    piece.side === 'right'
                      ? `${5 + (piece.id % 5) * 2}%`
                      : undefined,
                  width: piece.width,
                  height: piece.height,
                  borderRadius: piece.round ? '999px' : '3px',
                  backgroundColor: piece.color,
                }}
                transition={{
                  duration: 2.8,
                  ease: 'easeIn',
                }}
                onAnimationComplete={() => removeConfettiPiece(piece.id)}
              />
            );
          })}
        </div>

        <div className="absolute top-6 left-5 z-20 sm:top-8 sm:left-8">
          <Link href={home()} aria-label="Book Me home">
            <AppLogo />
          </Link>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 grid w-full max-w-4xl overflow-hidden rounded-[34px] border border-[#dfece5] bg-white/90 shadow-[0_28px_80px_rgba(35,83,64,0.14)] backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="relative flex min-h-80 items-center justify-center overflow-hidden bg-[#eaf8f1] p-8 sm:min-h-96 sm:p-12 lg:min-h-135">
            <div className="absolute top-1/2 left-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-2xl" />
            <motion.div
              animate={{ y: [0, -7, 0], rotate: [0, 1.5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10"
            >
              <SuccessIcon className="size-56 drop-shadow-[0_20px_20px_rgba(23,52,60,0.12)] sm:size-64" />
            </motion.div>
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.65,
                type: 'spring',
                stiffness: 260,
                damping: 15,
              }}
              className="absolute right-[18%] bottom-[16%] z-20 flex size-12 items-center justify-center rounded-2xl border-4 border-[#eaf8f1] bg-[#0f8a62] text-white shadow-[0_12px_24px_rgba(15,138,98,0.28)] sm:right-[17%] sm:bottom-[18%]"
            >
              <Check aria-hidden="true" className="size-6" strokeWidth={3} />
            </motion.div>
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#c7e8d8] bg-[#effaf4] px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] text-[#0f8a62] uppercase"
            >
              <Sparkles aria-hidden="true" className="size-3.5" /> Setup
              complete
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.55 }}
              className="max-w-lg text-4xl leading-[1.02] font-bold tracking-[-0.06em] text-[#17343c] sm:text-5xl"
            >
              Your next chapter starts here.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.55 }}
              className="mt-5 max-w-md text-sm leading-6 text-[#718081] sm:text-base"
            >
              Your Book Me account is ready. Everything is set up so you can
              spend less time organizing and more time doing meaningful work.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.55 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href={dashboard()}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0f8a62] px-6 text-sm font-bold text-white shadow-[0_10px_24px_rgba(15,138,98,0.2)] transition hover:bg-[#0b7653] hover:shadow-[0_14px_28px_rgba(15,138,98,0.25)] focus-visible:ring-4 focus-visible:ring-[#bce9d4] focus-visible:outline-none"
              >
                Go to dashboard
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href={home()}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold text-[#53696b] transition hover:bg-[#f3f8f5] hover:text-[#0f8a62] focus-visible:ring-4 focus-visible:ring-[#bce9d4] focus-visible:outline-none"
              >
                <Home aria-hidden="true" className="size-4" /> Back home
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-8 text-xs leading-5 text-[#91a09f]"
            >
              A calmer way to manage your time, your clients, and your day.
            </motion.p>
          </div>
        </motion.section>
      </main>
    </>
  );
}
