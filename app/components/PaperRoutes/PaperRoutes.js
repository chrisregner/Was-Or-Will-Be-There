import React from 'react'
import styled from 'styled-components'
import { Route } from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition'
import * as R from 'ramda'

import PhotoSlider from 'components/PhotoSlider'
import PaperWithHeight from 'containers/PaperWithHeight'
import AddPlanForm from 'containers/AddPlanForm'
import EditPlanForm from 'containers/EditPlanForm'
import AddJournalForm from 'containers/AddJournalForm'
import EditJournalForm from 'containers/EditJournalForm'
import NotFoundSetter from 'containers/NotFoundSetter'
import SmartCountryNameAndFlag from 'containers/SmartCountryNameAndFlag'
import WorldOverview from 'containers/WorldOverview'
import withHeightWatcher from 'containers/withHeightWatcher'

const AnimatedSwitchWrpr = styled.div`
  & > div > div,
  & > div > form {
    position: absolute;
    width: 100%;
  }
`
const routeCmpts = {
  PhotoSlider,
  WorldOverview,
  AddPlanForm,
  EditPlanForm,
  AddJournalForm,
  EditJournalForm,
}

const routeCmptsWithHtWatcher = R.mapObjIndexed((Component, componentName) =>
  withHeightWatcher(Component, componentName),
routeCmpts)

const PaperRoutes = () => (
  <div
    style={{
      top: 48,
      minHeight: 'calc(100vh - 48px)',
      backgroundColor: 'rgba(0, 0, 0, 0.54)',
    }}
    className='relative z-1 pa2 h-100'
  >
    <PaperWithHeight>
      <Route path='/countries/:countryId' component={SmartCountryNameAndFlag} />

      <AnimatedSwitchWrpr className='relative'>
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
        >
          <Route exact path='/overview/test' component={routeCmptsWithHtWatcher.PhotoSlider} />
          <Route exact path='/overview' component={routeCmptsWithHtWatcher.WorldOverview} />
          <Route exact path='/countries/:countryId/plans/new' component={routeCmptsWithHtWatcher.AddPlanForm} />
          <Route exact path='/countries/:countryId/plans/:id' component={routeCmptsWithHtWatcher.EditPlanForm} />
          <Route exact path='/countries/:countryId/journals/new' component={routeCmptsWithHtWatcher.AddJournalForm} />
          <Route exact path='/countries/:countryId/journals/:id' component={routeCmptsWithHtWatcher.EditJournalForm} />
          <Route component={NotFoundSetter} />
        </AnimatedSwitch>
      </AnimatedSwitchWrpr>
    </PaperWithHeight>
  </div>
)

export default PaperRoutes
