export interface Todo {
  _id: string;
  owner: string;
  category: string;
  body: string;
  status: string;
  avatar?: string;
}
