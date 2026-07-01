const mongoose = require('mongoose');
const Blog = require('./models/Blog');
require('dotenv').config();

// Full, original articles written in clean prose (the reader renders plain text,
// so headings are plain lines rather than markdown).
const blogs = [
  {
    slug: "building-scalable-react-applications",
    title: "Building Scalable React Applications",
    excerpt: "Learn the best practices for architecting large-scale React applications with proper state management and component composition.",
    content: `When a React app is small, almost any structure works. The trouble starts later — when there are forty screens, three teams touching the same files, and a bug that hides behind five layers of props. Scalability is really about keeping the app easy to change as it grows. Here is how I approach it.

Start with a clear component hierarchy. I split components into three kinds: pages (they own routing and data fetching), containers (they hold logic and state), and presentational components (they only receive props and render UI). Presentational components are the ones you reuse everywhere, so keep them pure and dumb.

Give every component a single responsibility. If a component fetches data, formats it, renders a form, and handles submission, it is doing four jobs. Split it. Small components are easier to test, easier to move, and far easier to reason about at 2 a.m.

Be deliberate about state. Not everything belongs in a global store. Ask where a piece of state is actually used: if it lives in one component, use useState; if a small subtree needs it, lift it up or use Context; only truly global things — the current user, the theme — deserve a store like Redux or Zustand. Server data is its own category, and a tool like React Query or SWR handles caching and refetching better than you will by hand.

Finally, define boundaries early. Group files by feature, not by type, so everything a feature needs sits together. Add an error boundary around risky sections so one broken widget cannot take down the page.

Scalability is not a library you install. It is a hundred small decisions that keep complexity from compounding. Make the easy-to-change choice each time and the big app mostly takes care of itself.`,
    category: "React",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop",
    readTime: "8 min read",
    date: new Date("2024-01-15"),
    likes: 42,
    shares: 15,
    views: 1200
  },
  {
    slug: "art-of-minimalist-ui-design",
    title: "The Art of Minimalist UI Design",
    excerpt: "Exploring how less is more in modern web design. Creating elegant interfaces that prioritize user experience.",
    content: `Minimalism is often misunderstood as "make it plain." It is not. Minimalist design is the discipline of removing everything that does not earn its place, so the things that remain can speak clearly. A minimal interface is not empty — it is focused.

The first tool is whitespace. Space around an element is not wasted; it tells the eye where to rest and what belongs together. When a layout feels cramped, the fix is usually more space, not smaller text. Give your headings room and they start to feel important on their own.

The second tool is typography. In a minimal interface, type does most of the visual work, so choose it carefully. Two families are plenty — one for headings, one for body. Establish a clear scale so the difference between a title, a subtitle, and a paragraph is obvious at a glance. Good hierarchy means a user can skim your page and still understand it.

The third tool is restraint with color. Pick two or three colors and use them with intent. One neutral for most surfaces, one accent for actions, and that is often enough. When everything is colorful, nothing stands out; a single well-placed accent draws the eye exactly where you want it.

The hard part is editing. Every button, label, and divider should justify itself. If you remove an element and nothing breaks, it was decoration. Ship the version without it.

Minimalism rewards the user with speed and calm. There is less to read, less to decode, less to get wrong. Done well, it feels less like a design choice and more like the interface simply getting out of the way.`,
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop",
    readTime: "5 min read",
    date: new Date("2024-01-08"),
    likes: 38,
    shares: 12,
    views: 980
  },
  {
    slug: "mastering-typescript-2024",
    title: "Mastering TypeScript in 2024",
    excerpt: "A comprehensive guide to TypeScript features that will level up your development workflow and catch bugs early.",
    content: `TypeScript stopped being optional a while ago. It catches whole categories of bugs before you run the code, and it turns your editor into a map of the codebase. But most teams use maybe a third of what it offers. Here is where the real leverage is.

Let inference do the work. You do not need to annotate everything. If a function returns a value TypeScript can figure out, let it. Reserve explicit types for the boundaries — function parameters, public APIs, and data coming from the network. Over-annotating adds noise without adding safety.

Model your data honestly. If a value can be a string or null, say so, and TypeScript will force you to handle the null. Discriminated unions are the underused hero here: give each variant a shared literal field like "status", and the compiler narrows the type for you inside each branch. Impossible states become impossible to write.

Learn a few utility types. Partial, Pick, Omit, and Record cover most day-to-day needs, and they keep your types in sync automatically. When a base type changes, everything derived from it updates too — no more editing five interfaces by hand.

Use type guards at the edges. Data from an API is unknown until you check it. A small validation function that narrows unknown into a real type is worth more than a dozen casts, because a cast just silences the compiler while a guard actually verifies reality.

The goal is not maximum strictness for its own sake. It is a codebase where the types describe the truth, so that when something changes, the compiler tells you every place that now needs attention. That feedback loop is what makes large refactors safe — and it is why teams that adopt TypeScript rarely go back.`,
    category: "TypeScript",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=500&fit=crop",
    readTime: "12 min read",
    date: new Date("2023-12-28"),
    likes: 56,
    shares: 23,
    views: 2100
  },
  {
    slug: "performance-optimization-techniques",
    title: "Performance Optimization Techniques",
    excerpt: "Deep dive into web performance optimization strategies that can improve your site's loading speed by 300%.",
    content: `Performance is a feature. A fast site ranks better, converts better, and simply feels more trustworthy. The good news is that most sites are slow for a handful of predictable reasons, and fixing them does not require magic — just measurement and discipline.

Start by measuring, not guessing. Open Lighthouse or WebPageTest and look at the Core Web Vitals: Largest Contentful Paint (how fast the main content shows), Interaction to Next Paint (how quickly the page responds), and Cumulative Layout Shift (how much things jump around while loading). These three numbers tell you where the pain is.

Images are almost always the biggest win. Serve them in modern formats, size them to how they are actually displayed, and lazy-load anything below the fold. A single hero image shipped at full camera resolution can outweigh your entire JavaScript bundle.

JavaScript is the second front. Ship less of it. Split your code so each route only loads what it needs, defer non-critical scripts, and audit your dependencies — that date library you imported for one function might be pulling in a hundred kilobytes. Every kilobyte of JS is parsed and executed on the user's phone, which is slower than your laptop.

Then cache aggressively. Static assets should carry long cache headers with fingerprinted filenames, so returning visitors download almost nothing. A CDN puts those assets physically closer to your users, cutting round-trip time.

Finally, prevent layout shift by reserving space for images, ads, and fonts before they load. Nothing frustrates a user more than tapping a button that jumps away at the last moment.

Optimization is iterative: measure, fix the biggest problem, measure again. Do that three or four times and a sluggish page usually turns snappy.`,
    category: "Performance",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    readTime: "10 min read",
    date: new Date("2023-12-20"),
    likes: 67,
    shares: 31,
    views: 3400
  },
  {
    slug: "future-of-web-development",
    title: "The Future of Web Development",
    excerpt: "Exploring emerging technologies and trends that will shape the future of web development in the coming years.",
    content: `Predicting the future of the web is a good way to be wrong in public, but a few directions already feel less like bets and more like currents. Here is where the ground seems to be moving.

The edge is getting closer to the user. Instead of one server in one region, code increasingly runs in dozens of locations near whoever is asking. That changes how we think about latency, data, and even where rendering happens. Pages can be personalized and dynamic while still arriving almost instantly.

AI is becoming part of the toolchain, not just the product. Autocomplete that understands your codebase, tests scaffolded from a description, and reviews that catch obvious mistakes are already normal. The developers who thrive will treat these as power tools — accelerating the boring parts while keeping their own judgment firmly in charge.

WebAssembly keeps quietly expanding what the browser can do. Workloads that once demanded native apps — video editing, simulations, heavy data work — now run at near-native speed inside a tab. That blurs the old line between "website" and "application."

The rendering pendulum has settled into balance. After years of swinging between server-rendered pages and thick client apps, the mainstream has landed on hybrids: render on the server for speed and SEO, hydrate on the client for interactivity, and stream the parts that are ready first.

Through all of it, the fundamentals hold. Semantic HTML, accessible interfaces, fast load times, and clean data flow mattered ten years ago and will matter ten years from now. Tools churn; principles compound. The best investment is not chasing every framework but getting genuinely good at the things that never go out of style.`,
    category: "Future",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop",
    readTime: "7 min read",
    date: new Date("2023-12-15"),
    likes: 45,
    shares: 18,
    views: 1500
  },
  {
    slug: "creating-accessible-web-experiences",
    title: "Creating Accessible Web Experiences",
    excerpt: "Why accessibility matters and how to implement WCAG guidelines in your projects from the ground up.",
    content: `Accessibility is not a feature you bolt on at the end. It is a way of building that assumes your users are diverse — using screen readers, keyboards, voice control, or simply a phone in bright sunlight. Build for that range from the start and you build a better product for everyone.

Begin with semantic HTML, because it does more than you think for free. A real button element is focusable, clickable, and announced correctly by assistive technology without a single line of extra code. A div pretending to be a button needs roles, tabindex, and key handlers just to reach the same baseline — and usually gets one of them wrong. Use the element that means what you intend.

Make the keyboard a first-class citizen. Try navigating your site with the Tab key alone. Can you reach every control? Is the focus ring visible? Does the order make sense? Many users never touch a mouse, and a keyboard trap — a modal you cannot escape without one — is a wall, not an inconvenience.

Mind color and contrast. Text should stand clearly against its background, and color should never be the only way you convey meaning. If your only signal that a field failed is turning it red, a colorblind user sees nothing. Add an icon or a message.

Describe the non-obvious with ARIA, but sparingly. Labels for icon-only buttons, live regions for dynamic updates, and roles where semantics fall short. The first rule of ARIA is to prefer native HTML whenever you can; ARIA patches gaps, it does not replace good structure.

Accessibility also improves SEO, keyboard efficiency, and clarity for tired or distracted users. It is the rare investment that helps the people who need it most and everyone else besides.`,
    category: "Accessibility",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=500&fit=crop",
    readTime: "6 min read",
    date: new Date("2023-12-10"),
    likes: 34,
    shares: 14,
    views: 890
  },
  {
    slug: "advanced-css-grid-layouts",
    title: "Advanced CSS Grid Layouts",
    excerpt: "Master CSS Grid with complex layouts, responsive designs, and practical examples for modern web applications.",
    content: `CSS Grid changed layout from a series of hacks into an actual design tool. Once it clicks, you stop fighting the browser and start describing the layout you want directly. Here are the ideas that take you past the basics.

Think in two dimensions. Flexbox arranges things along one axis; Grid controls rows and columns at the same time. That makes it the right tool for page-level structure — headers, sidebars, content, footers — where you care about both directions at once.

Name your areas. Grid lets you sketch a layout as a little map of named regions, then assign each child to a name. The result reads almost like a diagram, and rearranging the page for mobile becomes a matter of redrawing that map inside a media query. It is the most maintainable layout technique CSS has ever had.

Let the grid be responsive on its own. The combination of repeat, auto-fit, and minmax creates layouts that reflow without any breakpoints at all: tell the browser "as many columns as fit, each at least this wide," and cards rearrange themselves from three across to one as the screen shrinks. Fewer media queries, fewer surprises.

Understand implicit versus explicit tracks. You define some rows and columns explicitly, but when content overflows them, Grid creates implicit tracks automatically. Controlling their size with grid-auto-rows keeps dynamic content — a list that grows, a feed that loads more — looking intentional rather than accidental.

Combine Grid with Flexbox rather than choosing between them. Grid for the overall page skeleton, Flexbox for aligning the contents inside each cell. Used together they cover essentially every layout you will meet, and they do it with clean, readable CSS that survives redesigns.`,
    category: "CSS",
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=500&fit=crop",
    readTime: "9 min read",
    date: new Date("2023-12-05"),
    likes: 29,
    shares: 11,
    views: 760
  },
  {
    slug: "serverless-architecture-guide",
    title: "Serverless Architecture Guide",
    excerpt: "Complete guide to building scalable applications with serverless functions and cloud infrastructure.",
    content: `Serverless is a confusing name — there are still servers — but the idea underneath is genuinely useful: you write functions, and the platform handles running, scaling, and idling them for you. You stop thinking about machines and start thinking about code that runs on demand.

The appeal is real. You pay only for actual execution, not for a box sitting idle at 3 a.m. Traffic spikes are absorbed automatically, because the platform simply spins up more copies of your function. And there is no operating system to patch or capacity to plan. For spiky, event-driven, or early-stage workloads, that is a lot of operational burden to shed.

But there are trade-offs, and pretending otherwise leads to pain. Cold starts mean a function that has not run recently takes longer to respond the first time. Functions are stateless, so anything you want to remember has to live in a database or cache. And local development and debugging take more setup than a plain server, because the real environment lives in the cloud.

Design around those constraints. Keep functions small and single-purpose — one job each — so they start fast and stay easy to reason about. Push state into managed databases and object storage instead of local memory. Lean on the platform's event sources: a file upload, a queue message, a scheduled timer, or an HTTP request can each trigger exactly the function that handles it.

Watch the costs. Serverless is cheap at low and spiky volume and can become expensive at steady high volume, where a plain server would be cheaper. The right answer is often a mix: serverless for the bursty edges, traditional servers for the constant core.

Used with clear eyes, serverless removes a huge amount of undifferentiated work and lets a small team ship like a much larger one.`,
    category: "Backend",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop",
    readTime: "11 min read",
    date: new Date("2023-11-28"),
    likes: 52,
    shares: 24,
    views: 1850
  },
  {
    slug: "graphql-vs-rest-apis",
    title: "GraphQL vs REST APIs",
    excerpt: "Comparing GraphQL and REST to help you choose the right API architecture for your next project.",
    content: `GraphQL versus REST is one of those debates that generates more heat than light, because the honest answer is "it depends." Both are good tools; they just optimize for different problems. Knowing which problem you have makes the choice easy.

REST organizes your API around resources, each with its own URL, manipulated with standard HTTP verbs. It is simple, universally understood, and plays beautifully with the web's existing machinery — caching, status codes, and proxies all just work. For an API whose shape is stable and whose clients want roughly the same data, REST is hard to beat. The friction shows up in two familiar ways: over-fetching, where an endpoint returns more than a screen needs, and under-fetching, where a screen has to call three endpoints to assemble one view.

GraphQL flips that around. The client sends a query describing exactly the fields it wants, and the server returns precisely that — no more, no less — from a single endpoint. For rich, data-hungry front-ends, especially mobile apps on slow networks, that precision is a real advantage. It also gives you a strongly typed schema that doubles as living documentation.

The cost is complexity. Caching is harder because everything flows through one endpoint, and a careless query can ask the server to do an enormous amount of work, so you need depth limits and cost analysis. The tooling is excellent but there is more of it to learn and operate.

A useful rule of thumb: reach for REST when your data is resource-shaped and your clients are similar; reach for GraphQL when many different clients need many different slices of a complex graph. And remember it is not all-or-nothing — plenty of systems expose REST for simple public endpoints and GraphQL for their own demanding front-ends. Pick the tool that matches the shape of your problem, not the one that is trending.`,
    category: "API",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=500&fit=crop",
    readTime: "8 min read",
    date: new Date("2023-11-20"),
    likes: 41,
    shares: 16,
    views: 1120
  },
  {
    slug: "docker-for-developers",
    title: "Docker for Developers",
    excerpt: "Getting started with Docker containerization for consistent development and deployment environments.",
    content: `"It works on my machine" is the oldest joke in software, and Docker is the punchline that finally makes it stop being funny. A container packages your app together with everything it needs to run — the runtime, the libraries, the system tools — so it behaves the same on your laptop, your teammate's laptop, and the production server.

Two concepts do most of the work. An image is a frozen snapshot of your app and its environment, built from a recipe called a Dockerfile. A container is a running instance of that image. You build an image once and run it anywhere Docker exists, which is essentially everywhere.

The Dockerfile is where the craft lives. You start from a base image, copy your code in, install dependencies, and declare the command that starts the app. Two habits pay off immediately: order your steps so the rarely-changing ones come first, letting Docker cache them and rebuild fast; and use multi-stage builds so your final image contains only what runs in production, not the whole build toolchain. A lean image ships faster and has a smaller attack surface.

For local development, Docker Compose is the piece that makes it pleasant. One file describes every service your app needs — the web server, the database, the cache — and a single command brings the whole stack up, wired together, ready to go. A new developer clones the repo, runs one command, and has a working environment in minutes instead of a day of setup.

Keep a few principles in mind: one main process per container, configuration through environment variables rather than baked-in secrets, and data that must survive stored in named volumes rather than inside the container. Get those right and Docker turns environment drift from a recurring headache into a solved problem — which is exactly the kind of problem worth solving once.`,
    category: "DevOps",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=500&fit=crop",
    readTime: "10 min read",
    date: new Date("2023-11-15"),
    likes: 48,
    shares: 22,
    views: 1680
  },
  {
    slug: "state-management-2024",
    title: "State Management in 2024",
    excerpt: "Redux, Zustand, Jotai, or Context? A comprehensive comparison of state management solutions.",
    content: `State management in React used to mean one thing: Redux. Today there is a whole spectrum of options, and the healthiest mindset is that you probably need less global state than you think. Before reaching for any library, ask whether the state is really global at all.

A lot of "state" is server state — data you fetched from an API. That is not what Redux was built for, and tools like React Query or SWR handle it far better: caching, background refetching, and loading states come for free. Pulling server data out of your global store often shrinks it dramatically and removes a class of bugs around stale data.

What remains is genuine client state, and here the choices differ mostly in philosophy. Redux Toolkit is the modern, boilerplate-light version of the classic. Its predictable, centralized store and excellent devtools shine in large apps with complex, interconnected logic and big teams who benefit from strict conventions.

Zustand takes the opposite stance: a tiny, unopinionated store you can set up in a few lines, with no providers to wire up. For most apps it delivers the benefits of a global store without the ceremony, which is why it has become many developers' default.

Jotai and its atomic cousins model state as small, independent pieces you compose together. When different parts of your UI subscribe to different slivers of state, this approach avoids unnecessary re-renders and feels natural.

And do not forget Context, which ships with React. For low-frequency global values — the current theme, the logged-in user — it is perfectly adequate. Its weakness is frequent updates, which can re-render large trees, so keep hot state out of it.

The right answer is rarely one tool. Server state to a query library, simple globals to Context, and a focused store for the rest. Match the tool to the kind of state, and the architecture stays calm as the app grows.`,
    category: "React",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop",
    readTime: "7 min read",
    date: new Date("2023-11-08"),
    likes: 37,
    shares: 13,
    views: 950
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Blog.deleteMany({});
    console.log('Cleared existing blogs');

    await Blog.insertMany(blogs);
    console.log(`Successfully seeded ${blogs.length} blogs`);

    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
