import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/tag';
import { injectGlobal } from 'styled-components';

import 'prismjs/themes/prism-okaidia.css';

import Link from './Link';
import mdxComponents from './mdx';

injectGlobal`
  html, body {
    margin: 0;
    padding: 0;
  }

  ${() => {
    /* Override PrismJS Defaults */ return null;
  }}

  pre {
    background-color: #2f1e2e !important;
    border-radius: 4px;
    font-size: 14px;
  }

  .gatsby-highlight-code-line {
    background-color: #4f424c;
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 1em;
  }
`;

export default ({ site, frontmatter = {}, children }) => {
  const {
    title,
    description: siteDescription,
    keywords: siteKeywords,
  } = site.siteMetadata;

  const {
    keywords: frontmatterKeywords,
    description: frontmatterDescription,
  } = frontmatter;

  const keywords = (frontmatterKeywords || siteKeywords).join(', ');
  const description = frontmatterDescription || siteDescription;

  return (
    <Fragment>
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: description },
          { name: 'keywords', content: keywords },
        ]}
      >
        <html lang="en" />
      </Helmet>

      <MDXProvider components={mdxComponents}>
        <Fragment>{children}</Fragment>
      </MDXProvider>
    </Fragment>
  );
};

export const pageQuery = graphql`
  fragment site on Site {
    siteMetadata {
      title
      description
      author
      keywords
    }
  }
`;
