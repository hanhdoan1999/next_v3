import React, { useState } from 'react'
import { useQuery,useMutation } from '@apollo/client'
import {formQuery,submitForm} from './getForm.gql'
export const useGetForm = (id) => {
    const [formData,setFormData] = useState()
    const [submitData,setSubmitData] = useState()
    const [loading,error] = useQuery(formQuery,{
        variables: {
            formId:id
        },
        onCompleted: (data) => {
            setFormData(data)
        },
        fetchPolicy: 'no-cache',
        onError: err => {
            console.log(err)
        }
    })
    const [handleSubmitForm,{loading:submitLoading}] = useMutation(submitForm ,{
        onCompleted: (data) => {
            setSubmitData(data)
        },
        fetchPolicy: 'no-cache',
        onError: err => {
            console.log({err})
        }
    })
  return {
    loading,
    formData,
    error,
    handleSubmitForm,
    submitLoading
  }
}
