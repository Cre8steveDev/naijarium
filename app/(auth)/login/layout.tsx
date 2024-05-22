/**
 * Login Layout Page
 *
 */

// Auth Layout

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-white w-full absolute top-0 left-0 z-20">
      {children}
    </main>
  );
};

export default LoginLayout;
