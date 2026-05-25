import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function wrapWordsForGSAP(node: ChildNode) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.nodeValue ?? "";
    if (!text.trim()) return;
    const words = text.split(/(\s+)/);
    const fragment = document.createDocumentFragment();
    words.forEach((word) => {
      if (word.trim() === "") {
        fragment.appendChild(document.createTextNode(word));
      } else {
        const wrapper = document.createElement("span");
        wrapper.style.display = "inline-block";
        wrapper.style.overflow = "hidden";
        wrapper.style.verticalAlign = "bottom";
        wrapper.style.lineHeight = "1.1";
        const inner = document.createElement("span");
        inner.style.display = "inline-block";
        inner.style.transform = "translateY(110%)";
        inner.className = "gsap-word";
        inner.textContent = word;

        const parentEl = node.parentNode as HTMLElement;
        if (parentEl && parentEl.classList && parentEl.classList.contains("bg-clip-text")) {
          parentEl.classList.forEach((cls) => {
            inner.classList.add(cls);
          });
          parentEl.className = "";
        }

        wrapper.appendChild(inner);
        fragment.appendChild(wrapper);
      }
    });
    node.parentNode?.replaceChild(fragment, node);
  } else if (
    node.nodeType === Node.ELEMENT_NODE &&
    (node as Element).tagName !== "BR" &&
    !(node as Element).classList.contains("gsap-word")
  ) {
    Array.from(node.childNodes).forEach(wrapWordsForGSAP);
  }
}

interface ScrollTriggerOptions {
  isModal?: boolean;
  revealClass?: string;
  wordClass?: string;
  customAnimation?: (scroller: Element | Window, ctx: gsap.Context) => void;
}

export function useScrollTriggerAnimation(
  containerRef: React.RefObject<HTMLElement | null>,
  options?: ScrollTriggerOptions
) {
  const isModal = options?.isModal ?? true;
  const revealClass = options?.revealClass ?? ".reveal-text";
  const wordClass = options?.wordClass ?? ".gsap-word";
  const customAnimation = options?.customAnimation;

  useEffect(() => {
    let ctx: gsap.Context | null = null;
    let timer: NodeJS.Timeout;

    const initGSAP = () => {
      let scroller: Element | Window | null = null;
      if (isModal) {
        scroller = document.querySelector('[data-preview-scroller="true"]');
        if (!scroller) {
          timer = setTimeout(initGSAP, 10);
          return;
        }
      } else {
        scroller = window;
      }

      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const revealEls = containerRef.current?.querySelectorAll(revealClass) ?? [];
        revealEls.forEach((el) => {
          Array.from(el.childNodes).forEach(wrapWordsForGSAP);
          gsap.to(el.querySelectorAll(wordClass), {
            y: "0%",
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.04,
            scrollTrigger: {
              trigger: el,
              scroller: scroller as any,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          });
        });

        if (customAnimation && scroller) {
          customAnimation(scroller, ctx!);
        }
      }, containerRef);
    };

    initGSAP();

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, [containerRef, isModal, revealClass, wordClass, customAnimation]);
}
