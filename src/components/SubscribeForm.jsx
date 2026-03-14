import React, { useState } from "react";

function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const text = await res.text();
      setMessage(text);
      setEmail(""); // clear input
    } catch (err) {
      setMessage("Error subscribing. Try again.");
      console.error(err);
    }
  };
  async function subscribeUser() {
  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    alert("Notifications blocked");
    return;
  }

  const registration = await navigator.serviceWorker.register("/sw.js");

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: "YOUR_PUBLIC_VAPID_KEY",
  });

  await fetch("http://localhost:5000/subscribe-push", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

  return (
    <div>
      <h2>Subscribe to our Newsletter</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Subscribe</button>
      </form>
      <button onClick={subscribeUser}>
Enable Notifications
</button>
      {message && <p>{message}</p>}
    </div>
  );
}


export default SubscribeForm;