export interface StoryI {
  [key: string]: string;
}

export interface Column {
  key: string;
  label: string;
  width: string;
  sortable: boolean;
}
