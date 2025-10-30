export interface ApiBaseDto<T> {
  data:      T | null;
  error:     unknown | null;
  method:    string;
  instance:  string;
  timestamp: Date;
  details?:  string;
  status:    number;
}
