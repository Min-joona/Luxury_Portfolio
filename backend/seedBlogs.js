const mongoose = require('mongoose');
const Blog = require('./models/Blog');
require('dotenv').config();

const blogs = [
  {
    slug: "building-scalable-react-applications",
    title: "Building Scalable React Applications",
    excerpt: "Learn the best practices for architecting large-scale React applications with proper state management and component composition.",
    content: `In this comprehensive guide, we'll explore the key principles of building scalable React applications. From component architecture to state management, we'll cover everything you need to know to build production-ready apps that can grow with your business.

## Component Architecture

The foundation of any scalable React application lies in its component architecture. We recommend following these principles:

1. **Single Responsibility Principle**: Each component should do one thing well
2. **Composition over Inheritance**: Build complex UIs from simple, reusable pieces
3. **Props Down, Events Up**: Maintain predictable data flow

## State Management

As your application grows, managing state becomes increasingly important. Consider using:

- Context API for global state
- Redux for complex state logic
- React Query for server state

Remember: premature optimization is the root of all evil. Start simple and add complexity only when needed.`,
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
    content: `Minimalism in UI design isn't about removing everything—it's about removing the unnecessary. In this article, we explore the principles of minimalist design and how to apply them effectively.

## Core Principles

1. **Whitespace is your friend**: Give elements room to breathe
2. **Typography matters**: Choose fonts that communicate your message
3. **Color with purpose**: Use color intentionally, not decoratively

## Practical Tips

- Limit your color palette to 2-3 main colors
- Use ample whitespace around important elements
- Remove any element that doesn't serve a purpose`,
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
    content: `TypeScript has become an essential tool in modern web development. This guide covers advanced TypeScript features that will transform how you write code.

## Advanced Types

Learn about conditional types, mapped types, and template literal types. These powerful features allow you to create flexible, type-safe APIs.

## Type Inference

TypeScript's type inference is incredibly powerful. Learn when to let TypeScript do the work and when to be explicit.

## Real-world Patterns

We'll look at common patterns like branded types, type guards, and discriminated unions that solve real problems.`,
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
    content: `Web performance is crucial for user experience and SEO. In this deep dive, we'll explore techniques that can dramatically improve your site's performance.

## Core Web Vitals

Understand LCP, FID, and CLS—the three metrics that matter most for Google rankings.

## Optimization Strategies

- Code splitting and lazy loading
- Image optimization techniques
- Caching strategies
- Minimizing JavaScript bundle size

## Measuring Performance

Learn to use tools like Lighthouse, WebPageTest, and Chrome DevTools to measure and improve performance.`,
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
    content: `The web development landscape is constantly evolving. Let's explore the trends and technologies that will define the next decade.

## Emerging Technologies

- WebAssembly for high-performance applications
- Edge computing and serverless architectures
- AI-powered development tools
- WebXR for immersive experiences

## What This Means for Developers

The future is exciting, but it's also demanding. Developers will need to continuously learn and adapt to stay relevant.`,
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
    content: `Accessibility isn't optional—it's a fundamental aspect of good web development. Learn how to create inclusive experiences for all users.

## Why Accessibility Matters

- It's the right thing to do
- It improves SEO
- It benefits all users, not just those with disabilities

## Practical Implementation

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation
- Color contrast ratios`,
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
    content: `CSS Grid is one of the most powerful layout systems available in CSS. This guide covers advanced techniques for creating complex, responsive layouts.

## Grid Fundamentals

Understanding the grid container, grid items, and the various properties that control placement and sizing.

## Advanced Techniques

- Named grid areas
- Implicit vs explicit grids
- Auto-fit and auto-fill
- Minmax() function

## Real-world Examples

We'll build several complex layouts including dashboard interfaces, image galleries, and responsive card grids.`,
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
    content: `Serverless computing is revolutionizing how we build and deploy applications. Learn how to leverage serverless architecture for your projects.

## What is Serverless?

Understanding the serverless paradigm and how it differs from traditional server-based architectures.

## Benefits and Trade-offs

- Cost efficiency
- Automatic scaling
- Reduced operational overhead
- Cold start considerations

## Implementation Strategies

Best practices for building serverless applications with AWS Lambda, Vercel Functions, and Netlify Functions.`,
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
    content: `Choosing the right API architecture is crucial for your project's success. Let's compare GraphQL and REST to help you make an informed decision.

## REST Overview

The traditional approach to API design with its strengths and limitations.

## GraphQL Overview

How GraphQL solves over-fetching and under-fetching problems with its query language.

## When to Use What

- Use REST for simple, resource-based APIs
- Use GraphQL for complex data requirements
- Consider hybrid approaches for best results`,
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
    content: `Docker has become an essential tool for modern development workflows. This guide will get you up and running with containerization.

## Docker Basics

Understanding images, containers, and the Docker ecosystem.

## Development Workflow

- Creating Dockerfiles
- Docker Compose for multi-container apps
- Volume mounting for development
- Environment variables and secrets

## Deployment Considerations

Best practices for containerizing applications for production environments.`,
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
    content: `State management is a crucial decision in React development. Let's compare the popular options available in 2024.

## Redux Toolkit

The tried-and-true solution with modern improvements. Best for large, complex applications.

## Zustand

A minimal, fast, and scalable state management solution that's gaining popularity.

## Jotai & Recoil

Atomic state management for React with excellent TypeScript support.

## Context API

When and when not to use React's built-in state management.`,
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
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing blogs
    await Blog.deleteMany({});
    console.log('Cleared existing blogs');

    // Insert new blogs
    await Blog.insertMany(blogs);
    console.log(`Successfully seeded ${blogs.length} blogs`);

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
