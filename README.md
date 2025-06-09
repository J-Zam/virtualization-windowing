## Virtualization in large lists

Rendering long lists in a UI can be inefficient, especially when users only see a portion at a time. **Virtualization** optimizes performance by only rendering the visible items and dynamically loading others as the user scrolls.

### How It Works:
- Instead of rendering thousands of items at once, virtualization creates a **viewport** that only shows what’s necessary.
- As the user scrolls, items are swapped in and out of the DOM, reducing memory and processing overhead.
- This technique is commonly used in frameworks like React (`react-window`, `react-virtualized`) to improve responsiveness in complex UIs.

To get started install the dependencies and run the development server to see it in action:

```sh
   npm install
   npm run dev
```

![Virtualization Example](https://virtualization-windowing.vercel.app/assets/example-Qriv0Oa2.gif)
