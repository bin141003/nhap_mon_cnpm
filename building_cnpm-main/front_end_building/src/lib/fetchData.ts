export const fetchData = async (
  url: string,
  setData: any,
  method: string = "GET",
  value?: any
) => {
  const token = localStorage.getItem("token");
  const base_url = "http://localhost:8080/api/";
  const response = await fetch(`${base_url}${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(value),
  });
  const data = await response.json();
  setData(data);
};
