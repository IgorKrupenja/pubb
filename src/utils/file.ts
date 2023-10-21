import fs from 'fs';

import { Article } from '../interfaces';

import { getArticleFrontMatter } from '.';

// TODO: Needs refactor, see #7. Consider calling getArticleFrontMatter() outside of this.
export const getArticle = (path: string): Article => {
  if (!path) throw new Error('No article path provided.');

  const file = fs.readdirSync(path).find((file) => file.endsWith('.md'));

  if (!file) throw new Error('getArticle: No markdown file found in article path.');

  const markdown = fs.readFileSync(`${path}/${file}`).toString();
  const frontMatter = getArticleFrontMatter(markdown);

  // const markdown = matter(fs.readFileSync(`${path}/${file}`));
  // const frontMatter = markdown.data as ArticleFrontMatter;

  return {
    ...frontMatter,
    content: markdown,
    coverImagePath: `${path}/${frontMatter.coverImage}`,
  };
};
