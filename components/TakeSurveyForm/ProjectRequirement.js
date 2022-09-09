import React from 'react'
import Checkbox from '../Checkbox'
const ProjectRequirement = ({
  page,
  totalPages
}) => {
  return (
    <div className="ProjectRequirement-container">
      <div className="count-number">
      {page}/{totalPages}
      </div>
      <div className="title">What your poject need?</div>
      <div className="checkbox-wrapper">
        <div className="checkbox">
          <Checkbox labelText="Custom interface and layout" />
        </div>
        <div className="checkbox">
          <Checkbox labelText="Web site design" />
        </div>
        <div className="checkbox">
          <Checkbox labelText="Seo optimization" />
        </div>
        <div className="checkbox">
          <Checkbox labelText="CMS integrations (Wordpress)" />
        </div>
        <div className="checkbox">
          <Checkbox labelText="Newsletter Campaign" />

        </div>
        <div className="checkbox">
          <Checkbox labelText="Logo Design" />
        </div>

      </div>


    </div>
  )
}

export default ProjectRequirement;