import { FormGroup, InputGroup } from '@blueprintjs/core'
import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import * as yup from 'yup'
import './flights.scss'
import API from '../../api'

const schema = yup.object().shape({
  flightNumber: yup
    .number()
    .typeError('Flight number must be a number')
    .required('Flight Number is mandatory field'),
  destination: yup.string().trim().required('Destination is mandatory field')
})

const AddFlightForm = ({ addFlight, getFlights }) => {
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const { flightNumber, destination } = values

    setSubmitting(true)

    try {
      await API.addFlight(values)

      await addFlight(flightNumber, destination)
    } catch (error) {
      console.log(error)
    }

    await getFlights()

    resetForm({})
    setSubmitting(false)
  }

  return (
    <Formik
      initialValues={{ flightNumber: 0, destination: '' }}
      validationSchema={schema}
      validateOnChange
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <>
          {isSubmitting && <h3>Loading...</h3>}

          <form onSubmit={handleSubmit} className="addFlightForm">
            {!isSubmitting && (
              <div>
                <FormGroup
                  label="Flight Number:"
                  labelFor="flightNumber"
                  helperText={errors && errors.flightNumber}
                >
                  <InputGroup
                    id="flightNumber"
                    name="flightNumber"
                    type="text"
                    placeholder={'flightNumber'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.flightNumber}
                  />
                </FormGroup>
                <FormGroup
                  label="Destination:"
                  labelFor="destination"
                  helperText={errors && errors.destination}
                >
                  <InputGroup
                    id="destination"
                    name="destination"
                    type="text"
                    placeholder={'destination'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.destination}
                  />
                </FormGroup>
                <button type="submit" disabled={isSubmitting}>
                  Add
                </button>
              </div>
            )}
          </form>
        </>
      )}
    </Formik>
  )
}

AddFlightForm.propTypes = {
  addFlight: PropTypes.func.isRequired,
  getFlights: PropTypes.func.isRequired
}

export default AddFlightForm
