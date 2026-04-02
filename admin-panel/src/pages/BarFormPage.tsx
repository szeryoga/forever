import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { adminApi } from "../api/admin";
import { BarItemForm } from "../components/BarItemForm";
import { PageHeader } from "../components/PageHeader";
import type { BarPayload } from "../types/api";

const emptyItem: BarPayload = {
  title_ru: "",
  title_en: "",
  short_description_ru: "",
  short_description_en: "",
  price: "0",
  currency: "HUF",
  image_url: "",
  category: "food",
  is_published: true,
  sort_order: 0,
};

export function BarFormPage() {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [item, setItem] = useState<BarPayload>(emptyItem);
  const isNew = !itemId;

  useEffect(() => {
    if (!itemId) {
      setItem(emptyItem);
      return;
    }
    void adminApi.getBarItem(Number(itemId)).then((data) => setItem(data));
  }, [itemId]);

  return (
    <div>
      <PageHeader title={isNew ? "Create Bar Item" : `Edit Bar Item #${itemId}`} />
      <BarItemForm
        initialValue={item}
        onSubmit={async (value) => {
          if (isNew) {
            const created = await adminApi.createBarItem(value);
            navigate(`/bar/${created.id}`);
            return;
          }
          await adminApi.updateBarItem(Number(itemId), value);
        }}
        onDelete={
          isNew
            ? undefined
            : async () => {
                await adminApi.deleteBarItem(Number(itemId));
                navigate("/bar");
              }
        }
      />
    </div>
  );
}
