function sleep(ms: number) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}
export async function minDelay<T>(promise: Promise<T>, ms: number): Promise<T> {
  const [p] = await Promise.all([promise, sleep(ms)]);
  return p;
}
