// Custom hook: attaches a scroll-triggered reveal animation to a DOM element.
//
// Usage:
//   const ref = useReveal(200)  // 200ms delay before animation starts
//   return <div ref={ref} className="dcard">...</div>
//
// The element needs two CSS classes defined (added in Phase R1's @layer base,
// or inline in the component — see the CSS section below):
//   .dcard          → base state: opacity:0 (hidden before reveal)
//   .dcard.show     → triggers the cardReveal keyframe
//   .dcard.done     → locks the final state after animation ends

import { useRef, useEffect } from 'react'

export function useReveal(delay = 0) {
  // useRef gives us a stable reference to the DOM element across renders.
  // Unlike a regular variable, ref.current persists without causing re-renders.
    const ref = useRef(null)

    useEffect(() => {
        // After the component mounts, ref.current points to the real DOM element.
        // We read it once at the start of the effect.  
        const el = ref.current
        if (!el) return  // Guard: element not yet in DOM (rare but possible)

        // Create the observer. The callback fires whenever visibility changes.
        // [entry] destructures the array — IntersectionObserver always passes an array,
        // but we only ever observe one element here, so we take the first item.
        const observer = new IntersectionObserver(
        ([entry]) => {
            // Only act when the element becomes visible — ignore when it leaves
            if (!entry.isIntersecting) return

            // Apply the delay (staggered effect for card grids)
            setTimeout(() => {
            // Set the CSS animation-delay on the element directly.
            // This must happen before adding the 'show' class, which starts the animation.
            el.style.animationDelay = `${delay}ms`

            // Adding 'show' triggers the cardReveal keyframe.
            // The CSS for .show must set animation-name: cardReveal.
            el.classList.add('show')

            // After the animation completes, lock the final state.
            // Without 'done', the element could flicker if the animation replays.
            function handleAnimationEnd() {
                el.classList.add('done')
                // Remove the listener — it only needs to fire once
                el.removeEventListener('animationend', handleAnimationEnd)
            }
            el.addEventListener('animationend', handleAnimationEnd)

            }, delay)

            // Unobserve — we only want to animate in once, not every time
            // the element scrolls in and out of the viewport
            observer.unobserve(el)
        },
        { threshold: 0.1 }
        // threshold: 0.1 means: fire when 10% of the element is visible.
        // Lower values (0) fire as soon as one pixel is visible.
        // Higher values (0.5) wait until the element is half visible.
        )

        // Start observing the element
        observer.observe(el)

        // ── Cleanup Function ───────────────────────────────────────────────────
        // React calls this function when the component unmounts OR before the
        // effect re-runs (if dependencies change).
        //
        // Without this: if the component unmounts while the observer is active,
        // the callback could fire on a detached DOM element — causing a memory
        // leak and a React warning ("Can't perform a React state update on an
        // unmounted component").
        //
        // observer.disconnect() stops ALL observations on this observer instance.
        return () => observer.disconnect()

    }, [delay])
    // [delay] in the dependency array: if delay changes between renders,
    // the effect re-runs with the new value. For card grids with fixed delays,
    // this never happens in practice — but correctness requires listing it.

    return ref
}