export interface Memory {
  content: string;
  markdown: string;
  meta: Meta;
}

export interface Meta {
  title: string;
  id: string;
  links: Array<Link>;
}

export interface Link {
  target_id: string;
  source_id: string;
}
