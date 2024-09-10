import React, { useState } from 'react';

export default function EventPermissions({ onSetPermissions }) {
  const [permissions, setPermissions] = useState({
    view: 'all',
    participate: 'all',
    edit: 'organizer'
  });

  const handlePermissionsChange = (e) => {
    const { name, value } = e.target;
    setPermissions({ ...permissions, [name]: value });
    onSetPermissions(permissions);
  };

  return (
    <div>
      <select name="view" value={permissions.view} onChange={handlePermissionsChange}>
        <option value="all">Everyone</option>
        <option value="friends">Friends Only</option>
        <option value="invite">Invite Only</option>
      </select>
      {/* Similar select elements for 'participate' and 'edit' */}
    </div>
  );
}


