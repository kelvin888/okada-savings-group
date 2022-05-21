import React from "react";

export const MembersTable = ({ members }) => {
  return (
    <table className="table-auto w-full mt-12">
      <thead>
        <tr>
          <td className="font-bold">Name</td>
          <td className="font-bold">Tier</td>
          <td className="font-bold">Amount</td>
          <td className="font-bold">Potential Earning</td>
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
