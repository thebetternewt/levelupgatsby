import React from 'react';

export default props => {
  const { title, date } = props.data.markdownRemark.frontmatter;
  const { html } = props.data.markdownRemark;
  return (
    <div>
      <span>{date}</span>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "MMM DD, YYYY")
      }
      html
    }
  }
`;
