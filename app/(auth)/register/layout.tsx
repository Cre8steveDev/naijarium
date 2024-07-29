/**
 * Registration Page Layout Page
 *
 */

// Auth Layout

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-gray-50 dark:bg-slate-800 w-full justify-center h-screen flex items-center absolute top-0 left-0 z-20 backdrop-blur-md bg-opacity-50">
      {children}
    </main>
  );
};

export default RegisterLayout;
