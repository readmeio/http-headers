import type { Parent, Node } from 'unist';

import { fromMarkdown } from 'mdast-util-from-markdown';
import fetch from 'node-fetch';
import { find } from 'unist-util-find';
import { findAfter } from 'unist-util-find-after';
import flatFilter from 'unist-util-flat-filter';

// Core Resource - Sourcing headers directly from MDN
export const sourceUrl = 'https://raw.githubusercontent.com/mdn/content/main/files/en-us/web/http/headers/index.md';
// Store MDN response in memory for future lookups
let markdown: string;

/**
 * Fetch MDN HTTP Header source markdown.
 */
export async function retrieveMarkdown(): Promise<string> {
  return fetch(sourceUrl).then(res => res.text());
}

/**
 * Normalizes and converts a header into markdown-representative identifier
 * @example
 * normalizeHeader('content-length') -> '{{HTTPHeader("Content-Length")}}'
 */
export const normalizeHeader = (header: string): string => {
  const normalizedValue = header
    .split('-')
    .map(h => h.charAt(0).toUpperCase() + h.slice(1))
    .join('-');

  return `{{HTTPHeader("${normalizedValue}")}}`;
};

interface ChildTextNode extends Node {
  value: string;
}

/**
 * Performs lookup in MDN HTTP Header markdown for target header.
 * Returns a description, if found.
 */
export const searchHeaderDescription = (tree: Parent, header: string): string => {
  if (tree && header) {
    const headerNode = find(tree as any, { value: normalizeHeader(header) });

    if (headerNode) {
      const descriptionNode = findAfter(tree, headerNode, { type: 'text' }) as ChildTextNode;
      if (descriptionNode?.value) return descriptionNode.value.split(': ')?.[1];
    }
  }
  return '';
};

/**
 * Performs lookup in MDN HTTP Header markdown for target list of HTTP headers.
 */
export default async function getHeaderDescription(header: string | string[]): Promise<Record<string, string>> {
  try {
    if (!markdown) {
      markdown = await retrieveMarkdown();
    }

    const mdast = fromMarkdown(markdown, 'utf-8') as any;
    const tree = flatFilter(mdast, node => node?.type === 'text') as Parent;

    const headers = Array.isArray(header) ? header : [header];
    return headers.reduce((acc, h) => {
      acc[h] = searchHeaderDescription(tree, h);
      return acc;
    }, {} as Record<string, string>);
  } catch (e) {
    return {};
  }
}
