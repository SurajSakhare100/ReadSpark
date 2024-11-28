// src/pages/Blog.js
import React from "react";
import { Link } from "react-router-dom"; 
import Tag from "../components/Tags/Tags";
const MAX_DISPLAY = 5; 
const posts = [
  {
    slug: "how-to-write-a-great-readme",
    date: "2024-11-01",
    title: "How to Write a Great README",
    summary: "Learn the essential components of a well-structured README file to make your project stand out.",
    tags: ["README", "Documentation", "Best Practices"],
  },
  {
    slug: "optimizing-your-readme-for-github",
    date: "2024-10-21",
    title: "Optimizing Your README for GitHub",
    summary: "Tips to enhance your README file for better visibility and engagement on GitHub.",
    tags: ["GitHub", "README", "Visibility"],
  },
  {
    slug: "the-importance-of-a-readme",
    date: "2024-09-11",
    title: "The Importance of a README",
    summary: "Understand why a well-crafted README is crucial for project success and collaboration.",
    tags: ["README", "Importance", "Collaboration"],
  },
  {
    slug: "adding-visuals-to-your-readme",
    date: "2024-08-24",
    title: "Adding Visuals to Your README",
    summary: "Discover how to incorporate images and diagrams to improve the readability of your README.",
    tags: ["Visuals", "README", "Graphics"],
  },
  {
    slug: "frequently-asked-questions-in-readmes",
    date: "2024-07-03",
    title: "Frequently Asked Questions in READMEs",
    summary: "Explore common FAQs that can be added to your README for better user understanding.",
    tags: ["FAQ", "README", "User Support"],
  },
];
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
function Blog() {
  return (
    <div className="divide-y divide-gray-600 px-4 md:px-20 mt-12 w-[72rem] mx-auto">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900  sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Latest
        </h1>
        <p className="text-lg leading-7 text-gray-500 ">
          Explore our latest posts on how to create effective README files.
        </p>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {!posts.length && <li>No posts found.</li>}
        {posts.slice(0, MAX_DISPLAY).map((post) => {
          const { slug, date, title, summary, tags } = post;
          return (
            <li key={slug} className="py-12">
              <article>
                <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500  ">
                      <time dateTime={date}>{formatDate(date)}</time>
                    </dd>
                  </dl>
                  <div className="space-y-5 xl:col-span-3">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold leading-8 tracking-tight">
                          <Link
                            to={`/blog`}
                            className="text-gray-900 "
                          >
                            {title}
                          </Link>
                        </h2>
                        <div className="flex flex-wrap">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>
                      <div className="prose max-w-none text-gray-500 ">
                        {summary}
                      </div>
                    </div>
                    <div className="text-base font-medium leading-6">
                      <Link
                        to={`/blog`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label={`Read more: "${title}"`}
                      >
                        Read more &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Blog;
