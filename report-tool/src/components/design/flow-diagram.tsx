import { FlowColumn } from "@/components/design/flow-column";
import { flowColumns, columnTheme } from "@/lib/design-data";
import { cn } from "@/lib/utils";

export function FlowDiagram() {
  return (
    <div className="mx-auto max-w-[1100px]">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-0">
        {flowColumns.map((column) => (
          <FlowColumn key={column.id} column={column} />
        ))}
      </div>

      <div className="relative mt-4 hidden px-[12.5%] py-4 xl:grid xl:grid-cols-4">
        <div
          className="pointer-events-none absolute top-1/2 right-[12.5%] left-[12.5%] h-0.5 -translate-y-1/2 bg-gradient-to-r from-red-500/60 via-amber-500/60 to-green-500/60"
          aria-hidden
        />
        {flowColumns.map((column) => (
          <div key={column.id} className="flex justify-center">
            <div
              className={cn(
                "relative z-10 size-3 rounded-full border-2",
                columnTheme[column.id].dot
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
