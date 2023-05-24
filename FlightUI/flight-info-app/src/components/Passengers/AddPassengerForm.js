import { FormGroup, InputGroup } from '@blueprintjs/core'
import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import * as yup from 'yup'
import './passengers.scss'
import 'react-dropdown/style.css'
import Select from 'react-select'
import FlightClass from './FlightClass'
import API from '../../api'

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is mandatory field'),
  lastName: yup.string().trim().required('Last Name is mandatory field'),
  id: yup
    .number()
    .typeError('Id must be a number')
    .required('Id is mandatory field'),
  flightClass: yup.object().required('Flight Class is mandatory field'),
  ticketPrice: yup
    .number()
    .typeError('Ticket Price must be a number')
    .required('Ticket Price is mandatory field'),
  numberOfBags: yup
    .number()
    .typeError('Number Of Bags must be a number')
    .min(0, 'Number Of Bags cannot be less than 0')
    .max(2, 'Number Of Bags cannot be bigger than 2')
    .test(
      'checkClassOptions',
      'Too many bags for selected class',
      function (value) {
        const { parent, path, createError } = this
        return (
          parent.flightClass.value !== 0 ||
          value < 2 ||
          createError({
            path,
            message: `Too many bags for ${parent.flightClass.label} class`
          })
        )
      }
    )
    .required('Number Of Bags is mandatory field'),
  totalWeight: yup
    .number()
    .typeError('Total Weight must be a number')
    .min(0, 'Total Weight cannot be less than 0')
    .max(30, 'Total Weight cannot be bigger than 30')
    .test(
      'checkClassOptions',
      'Too much weight for selected class',
      function (value) {
        const { parent, path, createError } = this
        return (
          parent.flightClass.value === 2 ||
          value <= 20 ||
          createError({
            path,
            message: `Too much weight for ${parent.flightClass.label} class`
          })
        )
      }
    )
    .required('Total Weight is mandatory field'),
  flightNumber: yup.object().required('Flight Number is mandatory field')
})

const AddPassengerForm = ({
  addPassenger,
  getPassengers,
  flightNumbers,
  selectedFlightNumber,
  selectFlightNumber,
  passengersForFlight
}) => {
  const isSeatAvailable = (orderedClass) => {
    const passengersForClassCount = passengersForFlight.filter(
      (p) => p.flightClass === orderedClass
    ).length

    switch (FlightClass[orderedClass]) {
      case 'First':
        return passengersForClassCount < 20
      case 'Business':
        return passengersForClassCount < 30
      case 'Economy':
        return passengersForClassCount < 150
      default:
        return false
    }
  }

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true)

    const passenger = {
      ...values,
      flightNumber: values.flightNumber.value,
      flightClass: values.flightClass.value
    }

    try {
      await API.addPassenger(passenger)
      await addPassenger(passenger)
    } catch (error) {
      console.log(error)
    }

    await getPassengers(passenger.flightNumber)

    resetForm({}) // comment if for faster testing
    selectFlightNumber(values.flightNumber.value)
    setSubmitting(false)
  }

  const flightNumbersSelectOptions = flightNumbers.map((f) => {
    return { value: f, label: f.toString() }
  })
  const selectedFlightNumberOption = {
    value: selectedFlightNumber,
    label: selectedFlightNumber.toString()
  }
  const flightClassSelectOptions = FlightClass.map((f, i) => {
    return { value: i, label: f }
  })

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        id: 0,
        flightNumber: selectedFlightNumberOption,
        flightClass: flightClassSelectOptions[1],
        ticketPrice: 0,
        numberOfBags: 0,
        totalWeight: 0
      }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        handleBlur,
        isSubmitting
      }) => (
        <>
          {isSubmitting && <h3>Loading...</h3>}

          <form onSubmit={handleSubmit} className="addPassengerForm">
            {!isSubmitting && (
              <div>
                <FormGroup
                  label="First Name:"
                  labelFor="firstName"
                  helperText={
                    errors.firstName && touched.firstName
                      ? errors.firstName
                      : ''
                  }
                >
                  <InputGroup
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder={'firstName'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />
                </FormGroup>
                <FormGroup
                  label="Last Name:"
                  labelFor="lastName"
                  helperText={
                    errors.lastName && touched.lastName ? errors.lastName : ''
                  }
                >
                  <InputGroup
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder={'lastName'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                  />
                </FormGroup>
                <FormGroup
                  label="Id:"
                  labelFor="id"
                  helperText={errors && errors.id ? errors.id : ''}
                >
                  <InputGroup
                    id="id"
                    name="id"
                    placeholder={'id'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.id}
                  />
                </FormGroup>
                <FormGroup
                  label="Flight Class:"
                  labelFor="flightClass"
                  helperText={
                    errors.flightClass && touched.flightClass
                      ? errors.flightClass
                      : ''
                  }
                >
                  <div className="bp3-input-group">
                    <Select
                      name="flightClass"
                      id="flightClass"
                      options={flightClassSelectOptions}
                      component="select"
                      onChange={(option) => {
                        const event = {
                          target: { name: 'flightClass', value: option }
                        }
                        handleChange(event)
                      }}
                      onBlur={() => {
                        handleBlur({ target: { name: 'flightClass' } })
                      }}
                      value={values.flightClass}
                      placeholder="Select Flight class"
                    />
                  </div>
                </FormGroup>
                <FormGroup
                  label="Ticket Price:"
                  labelFor="ticketPrice"
                  helperText={
                    errors && errors.ticketPrice ? errors.ticketPrice : ''
                  }
                >
                  <InputGroup
                    id="ticketPrice"
                    name="ticketPrice"
                    placeholder={'ticketPrice'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.ticketPrice}
                  />
                </FormGroup>
                <FormGroup
                  label="Number Of Bags:"
                  labelFor="numberOfBags"
                  helperText={
                    errors && errors.numberOfBags ? errors.numberOfBags : ''
                  }
                >
                  <InputGroup
                    id="numberOfBags"
                    name="numberOfBags"
                    placeholder={'numberOfBags'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.numberOfBags}
                  />
                </FormGroup>
                <FormGroup
                  label="Total Weight:"
                  labelFor="totalWeight"
                  helperText={
                    errors && errors.totalWeight ? errors.totalWeight : ''
                  }
                >
                  <InputGroup
                    id="totalWeight"
                    name="totalWeight"
                    placeholder={'totalWeight'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.totalWeight}
                  />
                </FormGroup>
                <FormGroup
                  label="Flight Number:"
                  labelFor="flightNumber"
                  helperText={
                    errors && errors.flightNumber && touched.flightNumber
                      ? errors.flightNumber
                      : ''
                  }
                >
                  <div className="bp3-input-group">
                    <Select
                      name="flightNumber"
                      id="flightNumber"
                      options={flightNumbersSelectOptions}
                      component="select"
                      onChange={(option) => {
                        const event = {
                          target: { name: 'flightNumber', value: option }
                        }
                        handleChange(event)
                        selectFlightNumber(option.value)
                      }}
                      onBlur={() => {
                        handleBlur({ target: { name: 'flightNumber' } })
                      }}
                      value={selectedFlightNumberOption}
                      placeholder="Select Flight number"
                    />
                  </div>
                </FormGroup>
                {!isSeatAvailable(values.flightClass.value) && (
                  <div className="bp3-form-group">
                    All seats for {values.flightClass.label} have been booked
                  </div>
                )}
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

AddPassengerForm.propTypes = {
  addPassenger: PropTypes.func.isRequired,
  getPassengers: PropTypes.func.isRequired,
  passengersForFlight: PropTypes.array,
  flightNumbers: PropTypes.array,
  selectFlightNumber: PropTypes.func.isRequired,
  selectedFlightNumber: PropTypes.number
}

export default AddPassengerForm
