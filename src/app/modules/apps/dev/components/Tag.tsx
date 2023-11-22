

import React from 'react'
import {Questions} from './partials/Questions'
import {EnableSidebar} from '../../../../../_metronic/layout/core'

const Tag: React.FC = () => {
  return (
    <EnableSidebar>
      <Questions />
    </EnableSidebar>
  )
}

export {Tag}
