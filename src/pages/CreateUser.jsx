import { useState } from "react";
import { createUser } from "../services/user.api";

function CreateUser() {
  const [form, setForm] = useState({
    phoneNumber: "",
    password: "",
  });

  const handleSubmit = async () => {
    await createUser(form);
    alert("User created");
  };

  return (
    <div>
      <h2>Create User</h2>

      <input
        placeholder="Phone Number"
        onChange={(e) =>
          setForm({
            ...form,
            phoneNumber: e.target.value,
          })
        }
      />

      <input
        placeholder="Password"
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
      />

      <button onClick={handleSubmit}>
        Create
      </button>
    </div>
  );
}

export default CreateUser;