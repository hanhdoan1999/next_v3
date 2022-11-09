import { gql } from '@apollo/client';
const GET_LOGO = gql`
  query GET_LOGO {
    customer(customerId: $customerId) {
      email
      firstName
      lastName
      role
      displayName
      username
      billing {
        address1
        address2
        city
        company
        country
        email
        firstName
        lastName
        phone
        postcode
        state
      }
      orders(where: { customerId: $customerId }) {
        edges {
          node {
            billing {
              address1
              address2
              city
              company
              country
              email
              firstName
              lastName
              phone
              postcode
              state
            }
            customerNote
            date
            dateCompleted
            datePaid
            orderNumber
            lineItems {
              edges {
                node {
                  product {
                    node {
                      ... on SimpleProduct {
                        id
                        name
                      }
                    }
                  }
                  quantity
                  subtotal
                  total
                }
              }
            }
            status
            subtotal
            total
            shippingTotal
            shipping {
              address1
              address2
              city
              company
              country
              email
              firstName
              lastName
              phone
              postcode
              state
            }
            transactionId
          }
        }
      }
      totalSpent
      metaData {
        key
        value
      }
      shipping {
        address1
        address2
        city
        company
        country
        email
        firstName
        lastName
        phone
        postcode
        state
      }
      orderCount
    }
    userImage: user(id: $id, idType: DATABASE_ID) {
      userFields {
        userImage {
          sourceUrl
        }
      }
    }
  }
`;

export default GET_LOGO;
