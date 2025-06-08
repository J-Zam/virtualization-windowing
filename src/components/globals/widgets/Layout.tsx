import { Navbar } from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="tw-mx-auto tw-max-w-5xl">
      <Navbar />
      <section
        className=" tw-mx-auto tw-max-w-6xl tw-bg-white"
        style={{
          minHeight: "calc(100vh - (64px))",
        }}
      >
        <article className="tw-mx-auto tw-max-w-5xl">{children}</article>
      </section>
    </div>
  );
}
