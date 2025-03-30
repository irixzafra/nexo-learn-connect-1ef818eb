
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Filter, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

export interface FilterOption {
  id: string;
  label: string;
  type: 'select' | 'multiselect' | 'date' | 'range' | 'toggle';
  component: React.ReactNode;
}

export interface PageFiltersProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filterOptions?: FilterOption[];
  className?: string;
  onApplyFilters?: () => void;
  onResetFilters?: () => void;
  filterCount?: number;
}

const PageFilters: React.FC<PageFiltersProps> = ({
  searchPlaceholder = 'Buscar...',
  searchValue = '',
  onSearchChange,
  filterOptions = [],
  className,
  onApplyFilters,
  onResetFilters,
  filterCount = 0,
}) => {
  return (
    <div className={cn("flex flex-col sm:flex-row gap-4", className)}>
      {/* Search box */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={searchPlaceholder}
          className="pl-10 w-full"
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
        {searchValue && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={() => onSearchChange?.('')}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filters */}
      {filterOptions.length > 0 && (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span>Filtros</span>
              {filterCount > 0 && (
                <span className="ml-1 rounded-full bg-primary text-primary-foreground w-5 h-5 flex items-center justify-center text-xs">
                  {filterCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
              <SheetDescription>
                Ajusta los filtros para refinar los resultados
              </SheetDescription>
            </SheetHeader>
            <Separator className="my-4" />
            <div className="grid gap-6 py-4">
              {filterOptions.map((option) => (
                <div key={option.id} className="grid gap-2">
                  <Label htmlFor={option.id}>{option.label}</Label>
                  {option.component}
                </div>
              ))}
            </div>
            <SheetFooter className="sm:justify-between flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={onResetFilters}
                className="sm:mt-0 w-full sm:w-auto"
              >
                Resetear filtros
              </Button>
              <SheetClose asChild>
                <Button onClick={onApplyFilters} className="w-full sm:w-auto">
                  Aplicar filtros
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default PageFilters;
