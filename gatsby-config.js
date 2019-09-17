module.exports = {
  siteMetadata: {
    title: 'N7 Schedule',
    description: 'A simple schedule for n7 student',
    author: '@ato0m3',
  },
  plugins: [
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-transformer-json',
    'gatsby-plugin-react-helmet',
    'gatsby-image',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'N7Schedule',
        short_name: 'N7Schedule',
        start_url: '/2019/38',
        icon: 'src/images/calendar.png',
        display: 'standalone',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/src/data/`,
        ignore: ['**/\.*'], // ignore files starting with a dot
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
