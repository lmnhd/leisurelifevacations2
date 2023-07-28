import Header from "../../Header";
import Footer from "../../Footer";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";
import { useState } from "react";

export default function Layout({ children }) {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Header />
      <Dimmer.Dimmable dimmed={loading} blurring>
      <main>
        <Loader active={loading} />
        
          <Outlet context={setLoading}/>
          <ScrollRestoration />
       
      </main>
      </Dimmer.Dimmable>
      <Footer />
    </>
  );
}
