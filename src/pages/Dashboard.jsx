import { useState, useEffect } from "react"

const Dashboard = (props) => {
    console.log(props);
    
    return(
    <div>
        {(!props.user)? (
            <div>
                <p>Loading....</p>
                </div>
        ):(
    props.allUsers.map((user) => (
          <p>{user.username}</p>
      ))

        )}
  </div>
)
}

export default Dashboard