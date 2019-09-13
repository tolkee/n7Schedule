import React from "react"

import SEO from "../components/seo"

const IndexPage = (data) => (
  <>
    <SEO title="N7 Schedule" />
    test
  </>
)

export const query = graphql`
  query {
    allDataJson {
      edges {
        node {
          VCALENDAR {
            VEVENT {
              DTSTART
              DTEND
              DTSTAMP
              DESCRIPTION
              LOCATION
              STATUS
              SUMMARY
              TRANSP
              DTSTART_VALUE_DATE
              DTEND_VALUE_DATE
            }
          }
        }
      }
    }
  }
`

export default IndexPage
