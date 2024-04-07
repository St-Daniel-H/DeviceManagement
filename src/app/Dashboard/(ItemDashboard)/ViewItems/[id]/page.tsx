import { useState } from "react";

export default function ViewItemWithId({ params }: { params: any }) {
  const [itemId, setItemId] = useState(params.id);
  const getItemDetails = async () => {};
}
