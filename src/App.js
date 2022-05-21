import { useEffect, useState } from "react";
import "./index.css";
import { MembersTable } from "./MembersTable";
import { RegistrationForm } from "./RegistrationForm";

function App() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    console.log({ members });
  }, [members]);

  return (
    <>
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Okada Savings Application
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <RegistrationForm setMembers={setMembers} members={members} />
            <MembersTable members={members} />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
