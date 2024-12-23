export interface CsvHeader {
    field: string;
    variations: string[];
  }
  
  export interface CsvValidationError {
    row: number;
    field: string;
    value: string;
    message: string;
  }
  
  export interface CsvParsingResult<T> {
    data: T[];
    errors: CsvValidationError[];
  }