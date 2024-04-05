import Link from "next/link";
import "../scss/DashboardPage.scss";
export default function Dashboard() {
  return (
    <div id="DashboardPage">
      <div id="dashboardTitle">
        <h2>Device Management</h2>
        <p>Dashboard</p>
      </div>
      <div id="dashboardMenu">
        <div id="itemMeny">
          Items
          <br />
          <ul>
            <li>
              <Link href="/addItem">Add Item</Link>
            </li>
            <li>
              <Link href="/viewItems">View Items</Link>
            </li>
          </ul>
        </div>
        <div id="categoryMenu">
          Categories
          <br />
          <ul>
            <li>
              <Link href="/addCategory">Add Category</Link>
            </li>
            <li>
              <Link href="/viewCategory">View Category</Link>
            </li>
          </ul>
        </div>
      </div>
      <div id="signout">
        <button id="signoutButton">Signout</button>
      </div>
    </div>
  );
}
