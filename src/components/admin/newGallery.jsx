import { Layout } from "./adminLayout";
import { GalleryForm } from "./galleryForm";

export const newgallery = (c) => {
  const title = `${c.t("card_header")}`;
  
  return c.html(
    <Layout title={c.t("title")} c={c} breadcrumb={c.t("breadcrumb_new_gallery")}>
      <GalleryForm c={c} title={title} />
    </Layout>
  );
};

export default newgallery;
