import { createContext, useState, ReactNode } from "react";


type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};


export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);


type SearchProviderProps = {
  children: ReactNode;
};


export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};