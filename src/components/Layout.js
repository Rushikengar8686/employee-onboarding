import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <main className="p-4 flex-grow-1">{children}</main>
      </div>
    </div>
  );
}
