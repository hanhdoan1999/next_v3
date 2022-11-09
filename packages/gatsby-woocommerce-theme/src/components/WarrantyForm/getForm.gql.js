import { gql } from "@apollo/client";

export const formQuery = gql`
  query formQuery($formId: ID!) {
    gfForm(id: $formId, idType: DATABASE_ID) {
      title
      formFields {
        nodes {
          id
          type
          layoutGridColumnSpan
          layoutSpacerGridColumnSpan
          visibility
          ... on TextField {
            label
            description
            isRequired
            placeholder
          }
          ... on PhoneField {
            label
            description
            phoneFormat
            placeholder
            isRequired
          }
          ... on SectionField {
            label
            description
          }
          ... on EmailField {
            label
            description
            isRequired
            placeholder
          }
          ... on TextAreaField {
            label
            description
            isRequired
            placeholder
          }
          ... on FileUploadField {
            id
            label
            description
            isRequired
            maxFiles
          }
          ... on CheckboxField {
            id
            label
            choices {
              text
              value
              isSelected
            }
            isRequired
          }
          ... on SelectField {
            id
            label
            choices {
              text
              value
              isSelected
            }
            isRequired
          }
          ... on RadioField {
            id
            label
            choices {
              text
              value
              isSelected
            }
            isRequired
          }
          ... on ConsentField {
            id
            label
            type
            checkboxLabel
            isRequired
            description
          }
          ... on NameField {
            label
            description
            isRequired
            inputs {
              id
              key
              isHidden
              label
            }
          }
          ... on AddressField {
            id
            label
            type
            isRequired
            layoutSpacerGridColumnSpan
            layoutGridColumnSpan
            inputs {
              id
              isHidden
              label
              key
            }
          }
        }
      }
      submitButton {
        text
      }
    }
  }
`;
export const submitForm = gql`
mutation SUBMIT_FORM($input: SubmitGfFormInput!) {
    submitGfForm(
      input: $input
    ) {
      confirmation {
        type    
        message 
        url     
      }
      errors {
        id 
        message
      }
      entry {
        id
        ... on GfSubmittedEntry {
          databaseId
        }
        ... on GfDraftEntry {
          resumeToken
        }
      }
    }
  }
`