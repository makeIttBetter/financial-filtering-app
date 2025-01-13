// frontend/src/interfaces/IncomeStatementsPaged.ts

import { IncomeStatement } from "./IncomeStatement";
import { PaginationDTO } from "./PaginationDTO";
import { SortingDTO } from "./SortingDTO";

/*
  Developer note: This interface represents a paged response:
  - items: the actual data
  - pagination: page info
  - sorting: current sort info
*/

export interface IncomeStatementsPaged {
    items: IncomeStatement[];
    pagination: PaginationDTO;
    sorting: SortingDTO;
}
