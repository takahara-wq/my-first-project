import { Separator } from "@/components/ui/separator";

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <div className={className}>
      <h2 className="mb-4 text-center text-sm font-bold tracking-[0.2em] text-slate-400">
        {children}
      </h2>
      <Separator className="mx-auto max-w-[200px] bg-slate-600" />
    </div>
  );
}
