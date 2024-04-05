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
              <Link href="/Dashboard/addItem">Add Item</Link>
            </li>
            <li>
              <Link href="/Dashboard/viewItems">View Items</Link>
            </li>
          </ul>
        </div>
        <div id="categoryMenu">
          Categories
          <br />
          <ul>
            <li>
              <Link href="/Dashboard/CategoryDashboard">Add Category</Link>
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
