import { useInView } from "../../hooks/useInView";

export default function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
