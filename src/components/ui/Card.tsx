import { motion } from "framer-motion";
import { cn } from "../../utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className,
  hover = false,
  onClick,
}: CardProps) {
  return (
    <motion.div
      whileHover={
        hover ? { y: -4, boxShadow: "0 10px 40px rgba(0,0,0,0.1)" } : undefined
      }
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      onClick={onClick}
      className={cn(
        "bg-white rounded-xl shadow-sm border border-gray-100 p-6",
        hover && "cursor-pointer",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
