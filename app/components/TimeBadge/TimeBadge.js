import React from 'react'
import PropTypes from 'prop-types'
import differenceInDays from 'date-fns/difference_in_days'
import getYear from 'date-fns/get_year'
import getMonth from 'date-fns/get_month'
import getDate from 'date-fns/get_date'

import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import CalendarIcon from 'material-ui/svg-icons/action/today'

import Link from 'components/NonALink'

const timeBadgePadding = {
  paddingTop: '.125rem',
  paddingBottom: '.125rem',
  paddingLeft: '.125rem',
  paddingRight: '.25rem',
}

const beforePush = (ev) => {
  ev.stopPropagation()
}

const TimeBadge = ({ id, countryId, departure, homecoming }) => {
  const today = new Date()
  const todayMidnight = new Date(
    getYear(today),
    getMonth(today),
    getDate(today),
    0, 0, 0, 0
  )
  const isHomecomingPast = homecoming && (differenceInDays(homecoming, todayMidnight) < 0)
  const daysUntilDeparture = departure && differenceInDays(departure, todayMidnight)

  let text

  if (isHomecomingPast) // homcoming is yesterday or earlier
    return (
      <Link
        className='no-underline blue'
        to={`/countries/${countryId}/plans/${id}/journalize`}
        beforePush={beforePush}
      >
        <div className='dib'>
          <div
            style={{
              backgroundColor: '#ffd43b',
              ...timeBadgePadding
            }}
            className='flex items-center br1 bg-yellow white f7 ttu'
          >
            <EditIcon style={{ width: 16, height: 16 }} viewBox='0 0 24 24' />
            <div className='time-badge-text pl1'>Journalize!</div>
          </div>
        </div>
      </Link>
    )
  else if (departure && daysUntilDeparture === 0) // departure is today
    text = 'today!'
  else if (departure && daysUntilDeparture === 1) // departure is tomorrow
    text = 'in\u00a01\u00a0day'
  else if (departure && daysUntilDeparture <= 30 && daysUntilDeparture >= 2)
    text = `in\u00a0${daysUntilDeparture}\u00a0days`
  else
    return null

  return (
    <div className='dib'>
      <div
        style={{
          backgroundColor: '#4dadf7',
          ...timeBadgePadding
        }}
        className='flex items-center br1 white f7 ttu'
      >
        <CalendarIcon style={{ width: 16, height: 16 }} viewBox='0 0 24 24' />
        <div className='time-badge-text pl1'>{text}</div>
      </div>
    </div>
  )
}

TimeBadge.propTypes = {
  id: PropTypes.string.isRequired,
  countryId: PropTypes.string.isRequired,
  departure: PropTypes.instanceOf(Date),
  homecoming: PropTypes.instanceOf(Date),
}

export default TimeBadge
