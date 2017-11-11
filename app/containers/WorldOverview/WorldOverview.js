import React from 'react'
import PropTypes from 'prop-types'
import IPropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import muiThemeable from 'material-ui/styles/muiThemeable'
import DestinationIcon from 'material-ui/svg-icons/action/room'
import FlagIcon from 'material-ui/svg-icons/content/flag'
import GlobeIcon from 'material-ui/svg-icons/social/public'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'

import overviewGetter from 'state/shared/overviewGetter'
import withHeightWatcher from 'containers/withHeightWatcher'
import CountryNameAndFlag from 'components/CountryNameAndFlag'

/*

backgroundColor: muiTheme.palette.tertiary2Color,
color: muiTheme.palette.alternateTextColor,
color: muiTheme.palette.alternateTextColor
backgroundColor: muiTheme.palette.primary2Color,
color: muiTheme.palette.alternateTextColor,
color: muiTheme.palette.alternateTextColor

 */

const preventDefault = (ev) => { ev.preventDefault() }

const BareWorldOverview = ({ worldOverview, muiTheme }) => (
  <div>

    {/* Counters */}
    <div className='flex pa2 f6'>
      <div className='w-33 tc'>
        <div>
          <DestinationIcon style={{ color: muiTheme.palette.primary2Color }} />
        </div>
        <div className='world-overview-total-plans f3 fw5'>
          {worldOverview.get('totalPlans')}
        </div>
        <div style={{ color: muiTheme.palette.secondaryTextColor }}>
          Plans
        </div>
      </div>
      <div className='w-33 tc'>
        <div>
          <FlagIcon style={{ color: muiTheme.palette.tertiary2Color }} />
        </div>
        <div className='world-overview-total-journals f3 fw5'>
          {worldOverview.get('totalJournals')}
        </div>
        <div style={{ color: muiTheme.palette.secondaryTextColor }}>
          Journals
        </div>
      </div>
      <div className='w-33 tc'>
        <div>
          <GlobeIcon style={{ color: muiTheme.palette.accent1Color }} />
        </div>
        <div className='world-overview-total-countries f3 fw5'>
          {worldOverview.get('totalCountries')}
        </div>
        <div style={{ color: muiTheme.palette.secondaryTextColor }}>
          Countries
        </div>
      </div>
    </div>

    {/* Countries and info */}
    <List style={{ paddingBottom: 24 }}>
      <Subheader>Countries</Subheader>
      {
        worldOverview.get('countriesInfo').size > 0
          ? worldOverview.get('countriesInfo').map(country => (
            <Link
              key={country.get('id')}
              to={`/countries/${country.get('id')}`}
              className={`world-overview-country-item world-overview-country-item-${country.get('id')} world-overview-country-item-link db no-underline`}
            >
              <ListItem innerDivStyle={{ padding: '12px 8px 12px 16px' }}>
                <div className='flex items-center'>
                  <div className='flex-grow-1'>
                    <CountryNameAndFlag
                      customClassNames={{
                        flag: 'world-overview-country-item-flag w2pt5',
                        flagWrapper: 'mr2',
                        countryName: 'world-overview-country-item-name f5 fw4 pl1',
                      }}
                      countryId={country.get('id')}
                    />
                  </div>
                  <div>
                    {
                      country.get('hasPlan') &&
                      <IconButton
                        onClick={preventDefault}
                        className='world-overview-country-item-has-plan'
                        style={{ padding: 6, width: 36, height: 36 }}
                        iconStyle={{ color: muiTheme.palette.primary2Color }}
                        tooltip='Has plan!'
                        tooltipPosition='bottom-left'
                      >
                        <DestinationIcon />
                      </IconButton>
                    }
                    {
                      country.get('hasJournal') &&
                      <IconButton
                        onClick={preventDefault}
                        className='world-overview-country-item-has-journal'
                        style={{ padding: 6, width: 36, height: 36 }}
                        iconStyle={{ color: muiTheme.palette.tertiary2Color }}
                        tooltip='Has Journal!'
                        tooltipPosition='bottom-left'
                      >
                        <FlagIcon />
                      </IconButton>
                    }
                  </div>

                </div>
              </ListItem>
            </Link>
          )).toJS()
          : <div>
            <p className='world-overview-no-country-msg ph3 pv0 ma0 lh-copy f5 i'>
            You don’t have any entry on any country yet!
            </p>
          </div>
      }
    </List>

    <div className='tc pb3'>
      <Link to='/'>
        <RaisedButton primary label='Open Map' />
      </Link>
    </div>
  </div>
)

BareWorldOverview.propTypes = {
  worldOverview: IPropTypes.contains({
    totalPlans: PropTypes.number.isRequired,
    totalJournals: PropTypes.number.isRequired,
    totalCountries: PropTypes.number.isRequired,
    countriesInfo: IPropTypes.listOf(
      IPropTypes.contains({
        id: PropTypes.string.isRequired,
        hasPlan: PropTypes.bool.isRequired,
        hasJournal: PropTypes.bool.isRequired,
      })
    ),
  }).isRequired,
  muiTheme: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  worldOverview: overviewGetter(state),
})

const WorldOverview = withHeightWatcher(
  muiThemeable()(
    connect(mapStateToProps)(BareWorldOverview),
  ),
  'WorldOverview'
)

export { BareWorldOverview }
export default WorldOverview
