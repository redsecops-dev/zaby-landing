"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { ChevronRight } from "lucide-react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react"

import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

interface Tip {
  text: string
  image: string
  url?: string
}

interface LoadingCarouselProps {
  tips?: Tip[]
  className?: string
  autoplayInterval?: number
  showNavigation?: boolean
  showIndicators?: boolean
  showProgress?: boolean
  aspectRatio?: "video" | "square" | "wide"
  textPosition?: "top" | "bottom"
  onTipChange?: (index: number) => void
  backgroundTips?: boolean
  backgroundGradient?: boolean
  shuffleTips?: boolean
  barClassName?: string
}

const defaultTips: Tip[] = [
  {
    text: "SEO analysis app. Scraping, analysis, insights, and AI recommendations.",
    image: "/models/genz_gamify.png",
    url: "https://zaby.io",
  },
  {
    text: "Real-Time Monitoring: Built for high-integrity assessments with AI-powered suspicious activity logs.",
    image: "/models/generate_questions.gif",
    url: "https://zaby.io",
  },
  {
    text: "Agentic Question Generator: Multi-agent validated question generation from documents and wikis.",
    image: "/models/genz_gamify.png",
    url: "https://zaby.io",
  },
]

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function getTipKey(tip: Tip): string {
  return `${tip.text}-${tip.image}`
}

const carouselVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
}

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } },
}

const aspectRatioClasses = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[2/1]",
}

export function LoadingCarousel({
  onTipChange,
  className,
  tips = defaultTips,
  showProgress = true,
  aspectRatio = "video",
  showNavigation = false,
  showIndicators = true,
  backgroundTips = false,
  textPosition = "bottom",
  autoplayInterval = 4500,
  backgroundGradient = false,
  shuffleTips = false,
  barClassName,
}: LoadingCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const [displayTips] = useState(() =>
    shuffleTips ? shuffleArray(tips) : tips
  )

  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: autoplayInterval,
        stopOnInteraction: false,
      }),
    [autoplayInterval]
  )

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())
    setDirection(
      api.scrollSnapList().indexOf(api.selectedScrollSnap()) - current
    )

    const onSelect = () => {
      const newIndex = api.selectedScrollSnap()
      setCurrent(newIndex)
      setDirection(api.scrollSnapList().indexOf(newIndex) - current)
      onTipChange?.(newIndex)
    }

    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect)
    }
  }, [api, current, onTipChange])

  const handleSelect = useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api]
  )

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.5, ease: "easeOut" }
      }
      className={cn(
        "mx-auto w-full max-w-6xl overflow-hidden rounded-2xl bg-zinc-950 shadow-[0_20px_50px_rgba(0,0,0,0.3)]",
        className
      )}
    >
      <div className="w-full overflow-hidden">
        <Carousel
          setApi={setApi}
          plugins={[autoplay]}
          className="relative w-full"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            <AnimatePresence initial={false} custom={direction}>
              {(displayTips || []).map((tip) => (
                <CarouselItem key={getTipKey(tip)} className="min-w-0">
                  <motion.div
                    variants={carouselVariants}
                    initial={prefersReducedMotion ? false : "enter"}
                    animate="center"
                    exit={prefersReducedMotion ? undefined : "exit"}
                    custom={direction}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.6, ease: [0.32, 0.72, 0, 1] }
                    }
                    className={`relative ${aspectRatioClasses[aspectRatio]} w-full overflow-hidden`}
                  >
                    <Image
                      src={tip.image}
                      alt={`Visual representation for tip: ${tip.text}`}
                      fill
                      className="object-cover"
                      priority
                    />
                    {backgroundGradient && (
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                    )}

                    {backgroundTips ? (
                      <motion.div
                        variants={textVariants}
                        initial={prefersReducedMotion ? false : "hidden"}
                        animate="visible"
                        className={`absolute ${
                          textPosition === "top" ? "top-0" : "bottom-0"
                        } left-0 right-0 min-w-0 p-6 md:p-10`}
                      >
                        {displayTips[current]?.url ? (
                          <a
                            href={displayTips[current]?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block min-w-0 rounded-sm focus-visible:outline-none"
                          >
                            <p className="wrap-break-word text-center text-lg font-semibold leading-tight tracking-tight text-white text-pretty sm:text-xl md:text-left md:text-2xl">
                              {tip.text}
                            </p>
                          </a>
                        ) : (
                          <p className="wrap-break-word text-center text-lg font-semibold leading-tight tracking-tight text-white text-pretty sm:text-xl md:text-left md:text-2xl">
                            {tip.text}
                          </p>
                        )}
                      </motion.div>
                    ) : null}
                  </motion.div>
                </CarouselItem>
              ))}
            </AnimatePresence>
          </CarouselContent>
          {showNavigation && (
            <>
              <CarouselPrevious className="absolute left-4 top-1/2 h-9 w-9 -translate-y-1/2 bg-white/10 text-white border-white/20 hover:bg-white/20 transition-all active:scale-95" />
              <CarouselNext className="absolute right-4 top-1/2 h-9 w-9 -translate-y-1/2 bg-white/10 text-white border-white/20 hover:bg-white/20 transition-all active:scale-95" />
            </>
          )}
        </Carousel>
        <div
          className={cn(
            "p-5 md:p-6 bg-zinc-900 border-t border-white/5",
            barClassName
          )}
        >
          <div className="flex flex-col gap-4">
            {showIndicators && (
              <div className="flex w-full gap-1">
                {(displayTips || []).map((tip, index) => {
                  const isActive = index === current
                  const isComplete = index < current

                  return (
                    <button
                      key={getTipKey(tip)}
                      type="button"
                      className="relative h-0.5 flex-1 items-center transition-all focus:outline-none group"
                      onClick={() => handleSelect(index)}
                      aria-label={`Go to tip ${index + 1}`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <div className="absolute inset-0 rounded-full bg-current opacity-10 transition-colors group-hover:opacity-20" />
                      <span className="relative block h-full w-full overflow-hidden rounded-full">
                        {showProgress ? (
                          isComplete ? (
                            <span className="absolute inset-0 rounded-full bg-current opacity-60" />
                          ) : isActive ? (
                            <motion.span
                              key={current}
                              initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
                              animate={{ scaleX: 1 }}
                              transition={
                                prefersReducedMotion
                                  ? { duration: 0 }
                                  : {
                                      duration: autoplayInterval / 1000,
                                      ease: "linear",
                                    }
                              }
                              className="absolute inset-0 origin-left rounded-full bg-current opacity-80"
                            />
                          ) : null
                        ) : (
                          <span
                            className={cn(
                              "absolute inset-0 origin-left rounded-full bg-current opacity-80 transition-transform",
                              prefersReducedMotion
                                ? "duration-0"
                                : "duration-500 cubic-bezier(0.32, 0.72, 0, 1)",
                              isActive ? "scale-x-100" : "scale-x-0"
                            )}
                          />
                        )}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
            <div className="flex min-w-0 items-center justify-between gap-2">
              {!backgroundTips && (
                <div className="min-w-0 max-w-full">
                  {displayTips[current]?.url ? (
                    <a
                      href={displayTips[current]?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wrap-break-word block max-w-full rounded-sm text-sm md:text-base font-medium leading-relaxed tracking-tight text-inherit transition-colors opacity-90 hover:opacity-100"
                    >
                      {displayTips[current]?.text}
                    </a>
                  ) : (
                    <span className="wrap-break-word block max-w-full text-sm md:text-base font-medium leading-relaxed tracking-tight text-inherit opacity-90">
                      {displayTips[current]?.text}
                    </span>
                  )}
                </div>
              )}
              {backgroundTips && (
                <div className="flex items-center gap-1.5 ml-auto">
                  <span className="text-[10px] font-bold tracking-widest opacity-50 uppercase font-mono">
                    {current + 1} / {displayTips?.length || 0}
                  </span>
                  <ChevronRight aria-hidden="true" className="h-3 w-3 opacity-50" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default LoadingCarousel
