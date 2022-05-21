import React from "react";

export const MembersTable = ({ members }) => {
  return (
    <table className="table-auto w-full mt-12">
      <thead>
        <tr>
          <th>Name</th>
          <th>Tier</th>
          <th>Amount</th>
          <th>Potential Earning</th>
        </tr>
      </thead>
      <tbody>
        {members.map((member) => (
          <tr key={Math.random()}>
            <td>{member?.fullName}</td>
            <td>{member?.savingsTier}</td>
            <td>{member?.contributionAmount}</td>
            <td>{member?.potentialEarning}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
