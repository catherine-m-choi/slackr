import React from "react";
import { Link } from "react-router-dom";

function NewDmSearch(props) {

  const filteredUsers = Object.values(props.users).filter((user) => {
    // debugger
    if (props.searchQuery === '') {
      return;
    } else if (props.currentUserId === user.id) {
      return;
    }
    else {
      return user.email.includes(props.searchQuery)
    }
  })

  return (
    <div>
      <ul>
        {filteredUsers.map((user) => (
            <li key={user.id}>
              <Link to={{
                pathname: `/app/drafts`,
                recepientId: user.id
              }}>{user.email}</Link>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default NewDmSearch;