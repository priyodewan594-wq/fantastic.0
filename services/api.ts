export const fetchChat = async (token: string, message: string) => {
  const res = await fetch("http://localhost:5000/api/ai/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({ message })
  });
  return res.json();
};
