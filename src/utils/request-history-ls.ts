export function setRequestHistory(
  method: string,
  url: string,
  encodedURL: string,
  uid: string | undefined,
): void {
  const requestsLS = localStorage.getItem(`reqHist-${uid}`);
  let requests = requestsLS ? JSON.parse(requestsLS) : [];
  const currentRequest = {
    method: method.toString(),
    date: new Date().toLocaleString(),
    url,
    encodedURL,
  };
  requests = [currentRequest, ...requests];
  localStorage.setItem(`reqHist-${uid}`, JSON.stringify(requests));
}
