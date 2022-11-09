require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
const { project } = require('./package.json');

const buildCredentials = ({
  SPREADSHEET_ID,
  PROJECT_ID,
  PRIVATE_KEY,
  PRIVATE_KEY_ID,
  CLIENT_EMAIL,
  CLIENT_ID,
  AUTH_URI,
  TOKEN_URI,
  AUTH_PROVIDER_X509_CERT_URL,
  CLIENT_X509_CERT_URL,
}) => ({
  spreadsheetId: SPREADSHEET_ID,
  credentials: {
    type: 'service_account',
    project_id: PROJECT_ID || project.id,
    private_key_id: PRIVATE_KEY_ID || project.keyId,
    private_key: (PRIVATE_KEY || project.key).replace(/(\\r)|(\\n)/g, '\n'),
    client_email: CLIENT_EMAIL || project.email,
    client_id: CLIENT_ID,
    auth_uri: AUTH_URI,
    token_uri: TOKEN_URI,
    auth_provider_x509_cert_url: AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: `${CLIENT_X509_CERT_URL}/${encodeURIComponent(
      CLIENT_EMAIL || project.email
    )}`,
  },
});
module.exports = ({ googleTagManagerId }) => ({
  siteMetadata: {
    title: `Nextrend`,
    description: `Nextrend`,
    siteUrl: 'https://new.nextrend.com.au/graphql',
    wordPressSiteUrl: 'https://new.nextrend.com.au/graphql',
    siteUrl: `https://nextrend.gatsbyjs.io/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
        {
          allSitePage {
            nodes {
              path
            }
          }
          allWpContentNode(filter: {nodeType: {in: ["Page", "SimpleProduct","GroupProduct"]}}) {
            nodes {
              ... on WpPage {
                uri
                modifiedGmt
              }
              ... on WpSimpleProduct {
                slug
                modifiedGmt
              }
              ... on WpGroupProduct {
                slug
                modifiedGmt
              }
            }
          }
        }
      `,
        resolveSiteUrl: () => 'https://nextrend.gatsbyjs.io/',
        resolvePages: ({
          allSitePage: { nodes: allPages },
          allWpContentNode: { nodes: allWpNodes },
        }) => {
          const renameObj = allWpNodes.map(el => {
            if(Object.keys(el).includes('slug')) {
              const newObject = {};
              delete Object.assign(newObject, el, {['uri']: el['slug'] })['slug'];
              return {...newObject,uri: `/${newObject.uri}`}
            }else {
              return el
            }
          })
          const wpNodeMap = renameObj.reduce((acc, node) => {
            
            const { uri } = node
            acc[uri] = node

            return acc
          }, {})

          return allPages.map(page => {
            return { ...page, ...wpNodeMap[page.path] }
          })
        },
        serialize: ({ path, modifiedGmt }) => {
          return {
            url: path,
            lastmod: modifiedGmt,
          }
        },
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        // Defaults used for gatsbyImageData and StaticImage
        defaults: {},
        // Set to none to allow builds to continue on image errors
        failOn: `none`,
        // deprecated options and their defaults:
        base64Width: 20,
        useMozJpeg: process.env.GATSBY_JPEG_ENCODER === `MOZJPEG`,
        stripMetadata: true,
        defaultQuality: 50,
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: 'gatsby-source-google-spreadsheets',
      options: buildCredentials(process.env),
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `https://new.nextrend.com.au/graphql`,
        verbose: true,
        schema: {
          timeout: 3000000,
          perPage: 20,
          requestConcurrency: 2,
          previewRequestConcurrency: 2,
        },
        type: {
          MediaItem: {
            localFile: {
              // killed all concurrency which the command line probably overrode
              requestConcurrency: 50,
              // large images would die if they were larger than.. like, 5mb by default? undocumented and threw no warnings, just died.
              maxFileSizeBytes: 100000000,
            },
          },
        },
        develop: {
          nodeUpdateInterval: 3000,
          hardCacheMediaFiles: true,
        },
        production: {
          hardCacheMediaFiles: false,
          allow404Images: true,
        },
        debug: {
          graphql: {
            showQueryOnError: false,
            showQueryVarsOnError: true,
            copyQueryOnError: true,
            panicOnError: true,
            // a critical error is a WPGraphQL query that returns an error and no response data. Currently WPGQL will error if we try to access private posts so if this is false it returns a lot of irrelevant errors.
            onlyReportCriticalErrors: true,
          },
        },
        excludeFieldNames: [`blocksJSON`, `saveContent`],
        type: {
          // __all: {
          //   limit: 10,
          // },
          // Post:{limit: process.env.NODE_ENV === `development` ? 30 : 1500,},
          // Product:{
          //   limit:process.env.NODE_ENV === `development` ? 100 : 1500
          // },
          ProductBlock: {
            limit: process.env.NODE_ENV === `development` ? 0 : 0,
          },
          // ProductTag: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // Tag: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaArmHeight: {
          //   limit: process.env.NODE_ENV === `development` ? 30 : 1000,
          // },
          // PaRecyclable: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaBaseSite: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaMadeIn: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaFootRail: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaFabricVinyl: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaLeg: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaSeatDimensions: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaAssembly: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaLegShape: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaFrameColour: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaDesignedBy: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaMaterial: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaCushions: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaSeatBackrest: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaSeat: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaArmHeight: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaForTopSize: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaCastorWheel: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaFrameHeight: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaDurability: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaBackrestType: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaFrameWidth: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaFrameMeshColour: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaBrand: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaApplication: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaFrameLength: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaColour: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaOptions: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaSeatHeight: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // ContentType: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // LandingPage: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaSizeColour: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // FAQ: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // Project: {
          //   limit: process.env.NODE_ENV === `development` ? 1000 : 1000,
          // },
          // CustomProductCategory: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaStain: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaUpholstered: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaTableType: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaTableSize: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaTable: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaWll: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaTableBaseColour: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaTesting: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaStaticLoad: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaTableHeight: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaStackable: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaStoolTopColour: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaSizeShape: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaTableColour: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaWarranty: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaTableTopLength: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaTableTopWidth: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaSeatType: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaBaseSize: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaDimensions: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaSize: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // PaUnitWeight: {
          //   limit: process.env.NODE_ENV === `development` ? 0 : 1000,
          // },
          // VisibleProduct: {
          //   limit: process.env.NODE_ENV === `development` ? 30 : 1000,
          // },
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Nextrend`,
        short_name: `Nextrend`,
        start_url: `/`,
        background_color: `#eaeaea`,
        theme_color: `#1e1e1e`,
        display: `standalone`,
        icon: `${__dirname}/src/images/favicon.png`,
        crossOrigin: `use-credentials`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: "gatsby-plugin-no-sourcemaps",
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `nextrend`,
      },
    },
    `gatsby-plugin-client-side-redirect`
  ],
});