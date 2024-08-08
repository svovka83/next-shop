import { cn } from "@/lib/utils";

interface Props {
  imageUrl: string;
  className?: string;
}

export const CartItemDetailsImage: React.FC<Props> = ({
  imageUrl,
  className,
}) => {
  return <img className={cn("w-[60px] h-[60px]", className)} src={imageUrl} />;
};
