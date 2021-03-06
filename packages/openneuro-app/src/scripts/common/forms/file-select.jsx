// dependencies -------------------------------------------------------

import React from 'react'
import PropTypes from 'prop-types'

class Upload extends React.Component {
  // life cycle events --------------------------------------------------
  render() {
    const resumeIcon = (
      <span>
        <i className="fa fa-repeat" />
        &nbsp;
      </span>
    )
    const icon = this.props.resume ? resumeIcon : null
    const text = this.props.resume ? 'Resume' : 'Select folder'

    return (
      <div className="fileupload-btn">
        <span>
          {icon}
          {text}
        </span>
        <input
          type="file"
          id="multifile-select"
          className="multifile-select-btn"
          onClick={this._click.bind(this)}
          onChange={this._onFileSelect.bind(this)}
          webkitdirectory="true"
          directory="true"
        />
      </div>
    )
  }

  // custom methods -----------------------------------------------------

  _click(e) {
    e.stopPropagation()
    e.target.value = null
    if (this.props.onClick) {
      this.props.onClick(e)
    }
  }

  _onFileSelect(e) {
    if (e.target && e.target.files.length > 0) {
      const files = e.target.files
      this.props.onChange({ files })
    }
  }

  _setRefs(refs) {
    if (this.props.setRefs) {
      this.props.setRefs(refs)
    }
  }
}

Upload.propTypes = {
  resume: PropTypes.bool,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  setRefs: PropTypes.func,
}

export default Upload
