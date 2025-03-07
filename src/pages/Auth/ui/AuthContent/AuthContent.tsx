import { useStore } from 'store/useStore';

export const AuthContent = () => {
  const setName = useStore((state) => state.setName);

  const handleLogin = () => setName('Dmitry');

  return (
    <>
      Auth page
      <button onClick={handleLogin}>fake login</button>
    </>
  );
};
