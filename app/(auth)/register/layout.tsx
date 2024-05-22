/**
 * Login Layout Page
 *
 */

// Auth Layout

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-gray-50 w-full h-full flex items-center absolute top-0 left-0 z-20">
      {children}
    </main>
  );
};

export default LoginLayout;
