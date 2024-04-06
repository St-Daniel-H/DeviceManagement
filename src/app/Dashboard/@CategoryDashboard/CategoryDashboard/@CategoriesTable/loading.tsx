export default function LoadingTable() {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
          <div>
            {" "}
            <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
          </div>
        </thead>
      </table>
    </div>
  );
}
