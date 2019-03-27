import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ShareDataset from '../mutations/share.jsx'
import RemovePermissions from '../mutations/remove-permissions.jsx'

const PermissionRow = ({ datasetId, userId, userEmail, access }) => (
  <tr>
    <td className="col-xs-4">{userEmail}</td>
    <td className="col-xs-2">{access}</td>
    <td className="col-xs-2">
      <RemovePermissions datasetId={datasetId} userId={userId} />
    </td>
  </tr>
)

PermissionRow.propTypes = {
  datasetId: PropTypes.string,
  userId: PropTypes.string,
  userEmail: PropTypes.string,
  access: PropTypes.oneOf(['ro', 'rw', 'admin']),
}

const Share = ({ datasetId, permissions }) => {
  const [userEmail, setUserEmail] = useState('')
  const [access, setAccess] = useState('ro')

  const readActive = access === 'ro' && 'active'
  const writeActive = access === 'rw' && 'active'
  const adminActive = access === 'admin' && 'active'

  return (
    <div className="dataset-form">
      <div className="col-xs-12 dataset-form-header">
        <div className="form-group">
          <label>Share Dataset</label>
        </div>
        <hr />
        <div className="col-xs-12 dataset-form-body">
          <p>Dataset shared with:</p>
          <table className="table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Access</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((perm, index) => (
                <PermissionRow
                  datasetId={datasetId}
                  userId={perm.user.id}
                  userEmail={perm.user.email}
                  access={perm.level}
                  key={index}
                />
              ))}
            </tbody>
          </table>
          <div className="row">
            <p>
              Enter a user&#39;s email address and select access level to share
            </p>
            <input
              type="email"
              value={userEmail}
              onChange={e => setUserEmail(e.target.value)}
            />
          </div>
          <div className="row btn-group">
            <button
              className={`btn btn-default btn-lg ${readActive}`}
              onClick={() => setAccess('ro')}>
              Read
            </button>
            <button
              className={`btn btn-default btn-lg ${writeActive}`}
              onClick={() => setAccess('rw')}>
              Read and Write
            </button>
            <button
              className={`btn btn-default btn-lg ${adminActive}`}
              onClick={() => setAccess('admin')}>
              Admin
            </button>
          </div>
        </div>
        <div className="col-xs-12 dataset-form-controls">
          <div className="col-xs-12 modal-actions">
            <Link to={`/datasets/${datasetId}`}>
              <button className="btn-admin-blue">Return to Dataset</button>
            </Link>
            <ShareDataset
              datasetId={datasetId}
              userEmail={userEmail}
              access={access}
              done={() => setUserEmail('')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

Share.propTypes = {
  datasetId: PropTypes.string,
  permissions: PropTypes.array,
}

export default Share