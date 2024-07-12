import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.signinData.user);

  return (
    <div className="flex flex-col space-y-1 pl-16 lg:pl-0">
      <div>
        <img src={user.pic} alt={user.name} className="w-2/3" />
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-1 [&_p]:text-gray-500 [&_p]:font-semibold [&_p]:uppercase [&_p]:tracking-wider">
          <p>Name:</p>
          <p>{user.name}</p>
        </div>

        <div className="flex items-center space-x-1 [&_p]:text-gray-500 [&_p]:font-semibold [&_p]:uppercase [&_p]:tracking-wider">
          <p>Email:</p>
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
