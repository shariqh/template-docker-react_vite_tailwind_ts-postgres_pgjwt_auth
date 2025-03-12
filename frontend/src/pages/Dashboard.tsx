export default function Dashboard() {
  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold">Welcome to the Dashboard!</h1>
      <button
        className="ml-4 bg-red-500 text-white px-4 py-2"
        onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/';
        }}
      >
        Logout
      </button>
    </div>
  );
}
