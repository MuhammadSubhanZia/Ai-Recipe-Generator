declare module "@postlight/mercury-parser" {
  const Mercury: {
    parse: (url: string) => Promise<{ content: string }>;
  };
  export default Mercury;
}
