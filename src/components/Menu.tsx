import Layout from "./globals/widgets/Layout";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/menu-1.jpg"
import img2 from "../assets/menu-2.jpg"
import img3 from "../assets/menu-3.jpg"
import example from "../assets/example.png"
import example1 from "../assets/example.gif"

export default function Menu() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="tw-max-w-4xl tw-mx-auto tw-p-4 tw-space-y-6">
        <h1 className="tw-text-2xl tw-font-bold tw-mb-2 tw-text-gray-800">
          🔍 What is a virtualized list?
        </h1>

        <p className="tw-text-gray-600">
          <strong>Windowing</strong> (or virtualization) is a performance technique used to efficiently render large lists or grids. Google maps, twitter (x), facebook, and many other applications use this technique to improve performance. The idea is to only render the items that are currently visible in the viewport, rather than rendering the entire list or grid at once. This can significantly reduce the amount of DOM elements that need to be rendered, leading to improved performance and a smoother user experience.
        </p>


        <section className="lg:tw-p-1 tw-max-w-4xl tw-mx-auto">
          <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 lg:tw-grid-cols-3 tw-gap-2">
            {[
              { title: "Products grid virtualization", path: "/grid-list", img: img1 },
              { title: "Products row virtualization", path: "/row-list", img: img2 },
              { title: "Sales records virtualization", path: "/sales", img: img3 },
            ].map(({ title, path, img }) => (
              <div
                key={path}
                className="tw-cursor-pointer tw-border-4 tw-border-blue-400 tw-bg-white tw-flex tw-flex-col"
                onClick={() => navigate(path)}
              >
                <div className="tw-w-full tw-overflow-hidden">
                  <img
                    src={img}
                    alt={title}
                    className="tw-w-full tw-h-full tw-object-contain tw-transition-transform tw-duration-200 hover:tw-scale-105"
                  />
                </div>
                <div className="tw-pl-4 tw-flex-1 tw-flex tw-flex-col">
                  <hr className="tw-mb-1" />
                  <h2 className="tw-text-md tw-font-semibold tw-mb-2">{title}</h2>
                </div>
              </div>
            ))}
          </div>
        </section>

        <h1 className="tw-text-2xl tw-font-bold tw-mb-2 tw-text-gray-800">
          🧠 What makes this technique a good choice?
        </h1>

        <p className="tw-text-gray-600">
          I am a big fan of virtualization as a way to display large amounts of data to users in a seamless and organic way.
          I don&#39;t particularly support the concept of data tables on mobile devices. I find them annoying and not adaptable.
          I believe the mobile web experience should be so natural that users won&#39;t even notice the difference between a native
          app and a web-based app. Virtualizing data is an excellent solution for ensuring a smooth and intuitive user experience in our apps.</p>
        <img src={example1} alt="" className="tw-border-4 tw-border-blue-400 lg:tw-max-w-[80%] lg:tw-mx-auto" />

        <h1 className="tw-text-2xl tw-font-bold tw-mb-2 tw-text-gray-800">
          🔨 How does it work?
        </h1>

        <p className="tw-text-gray-600">
          Virtualization works by only rendering the items that are currently visible in the viewport. This is done by calculating the height of each item and only rendering the items that are within the current scroll position. As the user scrolls, new items are rendered and old items are removed from the DOM. This can be done using a library like react-window or react-virtualized, or by implementing your own virtualization logic.
        </p>

        <img src={example} alt="" className="tw-border-4 tw-border-blue-400 lg:tw-max-w-[70%] lg:tw-mx-auto" />


        <section className="tw-mt-8">
          <h2 className="tw-text-xl tw-font-semibold tw-mb-2 tw-text-gray-700">
            📚 More Info & Resources
          </h2>
          <ul className="tw-list-disc tw-pl-6 tw-space-y-1 tw-text-gray-600">
            <li>
              <a
                href="https://react-window.vercel.app/#/examples/list/fixed-size"
                target="_blank"
                rel="noopener noreferrer"
                className="tw-text-blue-500 tw-underline hover:tw-underline"
              >
                react-window documentation & examples
              </a>
            </li>
            <li>
              <a
                href="https://bvaughn.github.io/react-virtualized/"
                target="_blank"
                rel="noopener noreferrer"
                className="tw-text-blue-500 tw-underline hover:tw-underline"
              >
                react-virtualized documentation & examples
              </a>
            </li>
            <li>
              <a
                href="https://www.patterns.dev/vanilla/virtual-lists/"
                target="_blank"
                rel="noopener noreferrer"
                className="tw-text-blue-500 tw-underline hover:tw-underline"
              >
                How does list virtualization work?
              </a>
            </li>

          </ul>
        </section>

      </div>
    </Layout>
  );
}
