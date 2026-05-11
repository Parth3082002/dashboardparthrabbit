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
    <div className="page">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Create user</h1>
          <p>Provision a new user account.</p>
        </div>
      </div>

      <div className="section-box">
        <div className="stack">
          <div className="two-col">
            <div className="stack">
              <label className="form-label">Phone number</label>
              <input
                className="surface-input"
                placeholder="Enter phone number"
                value={form.phoneNumber}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phoneNumber: e.target.value,
                  })
                }
              />
            </div>

            <div className="stack">
              <label className="form-label">Password</label>
              <input
                className="surface-input"
                type="password"
                placeholder="Set a password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="actions-row">
            <button className="btn" onClick={handleSubmit}>
              Create user
            </button>
            <p className="list-muted">
              Tip: you can manage wallet actions from the Wallet page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;