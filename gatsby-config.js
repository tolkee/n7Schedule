module.exports = {
  siteMetadata: {
    title: 'N7 Schedule',
    description: 'A simple schedule for n7 student',
    author: '@ato0m3',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/src/data/`,
        ignore: ['**/\.*'], // ignore files starting with a dot
      },
    },
    'gatsby-transformer-json',
    'gatsby-plugin-react-helmet',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
