import React from "react";
import { Helmet } from "react-helmet";
import ButtonAppBar from "../components/ButtonAppBar";

type LayoutProps = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
};

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  description,
  keywords,
  author,
}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <div>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
        </div>
        <title>{title}</title>
      </Helmet>

      <main>
        <ButtonAppBar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
