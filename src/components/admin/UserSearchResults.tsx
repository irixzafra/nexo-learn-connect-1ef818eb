
import React from 'react';
import { Loader2, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserSearchResult } from '@/components/layout/header/role-simulator/types';

interface UserSearchResultsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResults: UserSearchResult[];
  isSearching: boolean;
  noResults: boolean;
  searchError: string | null;
  handleSelectUser: (userId: string, userName: string | null) => void;
}

const UserSearchResults: React.FC<UserSearchResultsProps> = ({
  searchTerm,
  setSearchTerm,
  searchResults,
  isSearching,
  noResults,
  searchError,
  handleSelectUser
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="search">Buscar usuario por nombre</Label>
      <div className="relative">
        <Input
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Nombre del usuario"
          className="pr-10"
          disabled={isSearching}
          autoComplete="off"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          {isSearching ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : (
            <SearchIcon className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </div>
      
      {/* Resultados de búsqueda */}
      {searchResults.length > 0 && (
        <div className="mt-2 border rounded-md overflow-hidden max-h-[200px] overflow-y-auto">
          <ul className="divide-y">
            {searchResults.map((user) => (
              <li 
                key={user.id} 
                className="px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                onClick={() => handleSelectUser(user.id, user.full_name)}
              >
                <div className="flex justify-between items-center">
                  <span>{user.full_name || 'Sin nombre'}</span>
                  <span className="text-xs text-muted-foreground bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                    {user.role}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Mensaje de no resultados */}
      {noResults && searchTerm && !isSearching && (
        <div className="text-center p-3 text-sm text-muted-foreground bg-slate-50 dark:bg-slate-800 rounded-md">
          No se encontraron usuarios con ese nombre
        </div>
      )}
      
      {/* Mensaje de error */}
      {searchError && (
        <div className="text-center p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-md">
          {searchError}
        </div>
      )}
    </div>
  );
};

export default UserSearchResults;
