interface propTypes {
  children: React.ReactNode;
}

export const center = ({ children }: propTypes) => {
  return (
    <div className="flex justify-center flex-col h-full">
      <div className="flex justify-center">{children}</div>
    </div>
  );
};
